import os
from dotenv import load_dotenv

load_dotenv(override=True)

from app.core.llm_query import get_llm_response

try:
    print("Testing LLM Response...")
    res = get_llm_response("Hello, what is your name?")
    print("Response:", res)
except Exception as e:
    import traceback
    with open("error_details.txt", "w") as f:
        traceback.print_exc(file=f)
