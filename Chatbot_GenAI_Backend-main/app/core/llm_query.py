import os
import requests
import logging
from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re
import chromadb
from chromadb.config import Settings
from app.core.chroma_store import query_similar_documents, add_documents_to_vector_store

from huggingface_hub import InferenceClient

logger = logging.getLogger(__name__)

# Fetch these dynamic at runtime instead of statically when module imports
# HUGGINGFACE_API_TOKEN = os.getenv('HUGGINGFACEHUB_API_TOKEN')
# LLM_MODEL = os.getenv('LLM_MODEL') #    mistralai/Mixtral-8x7B-Instruct-v0.1

client = chromadb.Client(Settings(persist_directory="./chroma_store"))
collection = client.get_or_create_collection("documents")

def build_client() -> InferenceClient:
    token = os.getenv('HUGGINGFACEHUB_API_TOKEN')
    model = os.getenv('LLM_MODEL')
    if not model or "mistralai" in model:
        model = 'meta-llama/Meta-Llama-3-8B-Instruct'
    
    if not token:
        logger.error("HUGGINGFACEHUB_API_TOKEN is not defined in environment!")
        
    return InferenceClient(
        model=model,
        token=token,
        timeout=300
    )

def extract_qa(response_text):
    try:
        question_match = re.search(r"(?i)question:\s*(.+)", response_text)
        answer_match = re.search(r"(?i)answer:\s*(.+)", response_text)

        question = question_match.group(1).strip() if question_match else ""
        answer = answer_match.group(1).strip() if answer_match else ""

        return question, answer
    except Exception as e:
        logger.error(f"Error extracting question and answer: {e}")
        raise ValueError("Failed to extract question and answer from the response.")

def get_llm_response(prompt: str):
    try:
        # headers = {
        #     "Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}",
        #     "Content-Type": "application/json",
        # }
        # data = {
        #     "inputs": prompt,
        #     "parameters": {
        #         "temperature": 0.1,
        #         "max_new_tokens": 200
        #     }
        # }

        # response = requests.post(
        #     f"https://api-inference.huggingface.co/models/{LLM_MODEL}",
        #     headers=headers,
        #     json=data,
        #     verify=False
        # )
        # response.raise_for_status()
        # output = response.json()
    
        # if isinstance(output, list) and "generated_text" in output[0]:
        #     return extract_qa(output[0]["generated_text"])
        # else:
        #     raise ValueError(f"Unexpected response: {output}")


        client = build_client()
        SYSTEM_PROMPT = """You are a Personal assistant specialized in providing well formated answer from the context being provided."""
        messages = [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Provide well formated answer from the given context.\n\n{prompt}"}
        ]
        
        # ensure LLM_MODEL is read from env properly
        llm_model_name = os.getenv('LLM_MODEL')
        if not llm_model_name or "mistralai" in llm_model_name:
            llm_model_name = 'meta-llama/Meta-Llama-3-8B-Instruct'
        
        result = client.chat.completions.create(
            model=llm_model_name,
            messages=messages,
            temperature=0.1,
            max_tokens=200
        )
        text = result.choices[0].message.content
        if isinstance(text, list):
            text = "".join(part.get("text", "") if isinstance(part, dict) else str(part) for part in text)
        return text

    except Exception as e:
        logger.error(f"Error getting LLM response: {e}")
        raise ValueError("Failed to get response from the LLM model.")

def answer_query(query: str) -> str:
    try:
        similar_docs = query_similar_documents(query)

        if len(similar_docs) == 0:
            return "No relevant documents found for your query."
        
        context = "\n".join(similar_docs)
        prompt = f"Context:\n{context}\n\nAnswer concisely based only on the given context.\n\nQuestion: {query}\nAnswer:"
        return get_llm_response(prompt)
    except Exception as e:
        logger.exception("Error answering query")
        return "Sorry, could not process your query."
