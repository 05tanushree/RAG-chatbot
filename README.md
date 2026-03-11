# RAG-chatbot
# SearchBot API

This is RAG based SearchBot API using HuggingFace Model and HuggingFace Embedded model. It is using ChromaDB as a Vector DB. UI uploads files that is used as a context for generating the response.

# SearchBot UI Repo

https://github.com/05tanushree/RAG-chatbot.git

# Python version

3.11.0

# Run command

python run.py

# .ENV

APP_PORT=8000

UPLOAD_FOLDER=data/uploads

VECTOR_DIR=data/vector_store

LOG_DIR=logs

MAX_CONTENT_LENGTH_MB=2

HUGGINGFACEHUB_API_TOKEN=Your_HuggingFace_API_Token

LLM_MODEL=mistralai/Mixtral-8x7B-Instruct-v0.1

EMBEDDING_MODEL=BAAI/bge-small-en-v1.5

# My Next.js Project

This is a Next.js project created to demonstrate a simple application structure.

## Project Structure

```
my-nextjs-project
├── src
│   ├── pages
│   │   └── index.tsx          # Main entry point of the application
│   ├── components
│   │   └── ExampleComponent.tsx # A reusable component
│   └── styles
│       └── globals.css        # Global CSS styles
├── public
│   └── favicon.ico            # Favicon for the application
├── package.json                # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```
   cd my-nextjs-project
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000` to see the application in action.

## Components

- **ExampleComponent**: A functional component located in `src/components/ExampleComponent.tsx` that can be used throughout the application.

## Styles

Global styles can be found in `src/styles/globals.css`. You can customize these styles to fit your design needs.

---------------------------------------------

* Why you chose specific chunk size 

The 2MB limit (specifically mentioned in the context of file chunking and processing) is primarily a practical constraint related to model performance and memory management.

* Why chosen vector DB 

Vector databases allow for semantic search, meaning the AI can understand that "apartment cost" and "monthly rent" are related even if the words aren't identical


# ArchitectureThe system follows a decoupled Client-Server architecture designed for scalability and role-based access control.Frontend: React.js UI with dedicated views for Admin (Management) and Customers (Queries).Backend: Flask REST API orchestrating document processing and LLM communication.Vector Store: Chroma DB for high-performance semantic search.AI Engine: Hugging Face Inference API for both text embeddings and response generation.🚀 

# Setup Instructions 

# Architecture
The system follows a decoupled Client-Server architecture designed for scalability and role-based access control.

Frontend: React.js UI with dedicated views for Admin (Management) and Customers (Queries).

Backend: Flask REST API orchestrating document processing and LLM communication.

Vector Store: Chroma DB for high-performance semantic search.

AI Engine: Hugging Face Inference API for both text embeddings and response generation.

# Setup Instructions
Prerequisites

Python 3.10+

Node.js & npm

Hugging Face API Token (Free tier)

Backend Setup

Clone the repository and navigate to the backend folder.

Create a virtual environment: python -m venv venv.

Activate it: source venv/bin/activate (Mac/Linux) or venv\Scripts\activate (Windows).

Install dependencies: pip install -r requirements.txt.

Set your environment variable: HF_API_TOKEN = Your Token.

Run the server: python run.py.

Frontend Setup

Navigate to the frontend folder.

Install packages: npm install.

Start the development server: npm start.

# RAG Flow Explanation
The system implements a classic 4-stage RAG pipeline.

1. Ingestion: The Admin uploads a document. The system extracts text and performs Fixed-Size Chunking (500-character segments).

2. Embedding: Each chunk is converted into a high-dimensional vector via the Hugging Face embedding model.

3. Retrieval: When a user queries, the query is embedded and a Cosine Similarity search is performed in Chroma DB to find relevant chunks.

4. Generation: The retrieved chunks are injected into a prompt for the LLM, which generates a deterministic, fact-based answer.

# Trade-offs
Model Hosting (Hugging Face API): Provides zero local hardware costs and easy setup, but results in network latency and potential rate limits.

Chunking Strategy (Fixed-size): Very simple to implement, but risks cutting off context in the middle of sentences or ideas.

Vector Database (Chroma DB Local): Offers extreme speed for small to medium datasets but lacks the advanced features of cloud solutions like Pinecone.

LLM Temperature (Low - 0.1): Ensures high factual accuracy and minimizes "hallucinations," though the responses can feel less conversational.

# Latency Analysis
Document Ingestion (3–10s): The bottleneck here is sequential API calls to generate embeddings for every individual chunk.

Vector Retrieval (< 100ms): Extremely fast due to Chroma DB's optimized indexing.

LLM Generation (1–3s): Dependent on the external inference queue and the complexity of the prompt context.

Total Query Latency (~2–4s): The primary delay is the Round Trip Time (RTT) to external AI APIs.

# Example queries + outputs 

1. Agentic Workflow Management
Instead of manually writing every line of the Flask backend or React frontend, you likely used Antigravity's Manager View (Mission Control). You provided high-level goals (e.g., "Build a RAG system using Chroma DB and Hugging Face"), and Antigravity:

Planned the Architecture: It generated a "Task Checklist" and implementation plan before writing code.

Executed Tasks: It automatically created files, handled terminal commands (like pip install), and initialized the vector database.

2. Automated Verification & Testing
One of Antigravity's standout features is its Browser Agent. In the context of your chatbot:

The agent likely launched a Chrome browser instance to test the React UI.

It verified that the "Upload" button worked by actually interacting with the DOM, ensuring that files were successfully being sent to the backend and stored in Chroma DB.

It might have provided you with Artifacts (like browser recordings or screenshots) to prove the functional requirements were met.

3. Multi-Model Orchestration
You likely utilized different models for different tasks within the same environment:

Gemini 3 Pro for complex architectural decisions and logic in the RAG pipeline.

Gemini 3 Flash for high-velocity subtasks like writing boilerplate CSS or HTML components for the UI.

4. "Human-in-the-Loop" Collaboration
Rather than a "black box" generation, you used Antigravity to review Code Diffs and Artifacts. You could leave comments directly on the agent's plan or code snippets (similar to Google Docs), and the agent adjusted its work based on your feedback in real-time.


# Example queries + outputs 

* All the output screenshots have been saved in the screenshots folder.
