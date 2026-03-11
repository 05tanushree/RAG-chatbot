import os
import logging
from typing import List
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

# Use the same embedding model defined in environment, but default to BAAI/bge-small-en-v1.5 if not found
# as that's what the user mentioned they're using, and it's a good default.
EMBEDDING_MODEL_NAME = os.getenv("EMBEDDING_MODEL", "BAAI/bge-small-en-v1.5")    

# Initialize the model once when the module loads
try:
    logger.info(f"Loading embedding model: {EMBEDDING_MODEL_NAME}...")
    # Initialize sentence-transformers model. This downloads the model on first run if not cached.
    model = SentenceTransformer(EMBEDDING_MODEL_NAME)
    logger.info("Embedding model loaded successfully.")
except Exception as e:
    logger.error(f"Failed to load embedding model {EMBEDDING_MODEL_NAME}: {e}")
    model = None


def get_embedding(text: str) -> List[float]:
    """
    Function to get embedding for a given text using local sentence-transformers model.
    """
    if model is None:
        raise ValueError("Embedding model was not loaded properly.")
    
    try:
        # Generate the embedding. Output is a numpy array, convert to list of floats for consistency with previous API
        embedding = model.encode(text).tolist()
        return embedding
    except Exception as e:
        logger.error(f"Error getting embedding: {e}")
        raise ValueError("Failed to get embedding from the model.")