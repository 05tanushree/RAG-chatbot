import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv(override=True)
token = os.getenv('HUGGINGFACEHUB_API_TOKEN')
models_to_test = [
    "HuggingFaceH4/zephyr-7b-beta",
    "mistralai/Mistral-7B-Instruct-v0.3",
    "meta-llama/Meta-Llama-3-8B-Instruct",
    "Qwen/Qwen2.5-7B-Instruct",
    "mistralai/Mixtral-8x7B-Instruct-v0.1"
]

for model in models_to_test:
    client = InferenceClient(model=model, token=token)
    try:
        res = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": "Hi"}],
            max_tokens=10
        )
        print(f"[SUCCESS] {model}")
    except Exception as e:
        print(f"[FAILED] {model}: {e}")
