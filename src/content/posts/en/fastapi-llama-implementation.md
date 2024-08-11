---
publishDate: 2024-08-12T00:00:00Z
title: Using Llama in FastAPI
excerpt: In this article, I will explain how to use Llama in FastAPI. We will create a simple API with FastAPI using Llama2 model.
image: /images/blog/programming/fast-llama.webp
author: Abdulhamit Celik
category: Programming
tags: []
---

## What is Llama?

Llama (acronym for Large Language Model Meta AI, and formerly stylized as LLaMA) is a family of autoregressive large language models (LLMs) released by Meta AI starting in February 2023. The latest version is Llama 3.1, released in July 2024.

## Using Llama in FastAPI

Using FastAPI to create a llama service that can be use anywhere to talk with model.

We will install dependencies first:

```bash
pip install fastapi uvicorn llama-cpp-python
```

Then we will write a helper method to pull the model from huggingface repository:

```python
from llama_cpp import Llama


def init_model():
    print("Loading model...")
    llm = Llama.from_pretrained(
        repo_id="Qwen/Qwen2-0.5B-Instruct-GGUF", filename="*q8_0.gguf", verbose=False
    )
    print("Model loaded.")
    return llm
```

With this helper method, we can load the model and use it in our FastAPI app on startup, so we will create a `@asynccontextmanager` to load the model before the app starts:

```python
# other imports
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.llm = init_model()
    yield

app = FastAPI(lifespan=lifespan)
```

So when we create the app, the model will be loaded and we can use it in our routes

To use the model in our routes, we should use the `app.state.llm` object as a dependency:

```python
def get_llm():
    return app.state.llm

@app.post("/question")
def get_answer(llm: Llama = Depends(get_llm)):
    pass
```

as we can see, we are using our llama model in our route as a dependency.

now we should get the question from request body, so lets update our route:

```python
from pydantic import BaseModel

class Question(BaseModel):
    q: str

@app.post("/question")
def get_answer(data: Question, llm: Llama = Depends(get_llm)):
    pass
```

and now we can ask this question to our llama model:

```python
@app.post("/question")
def get_answer(data: Question, llm: Llama = Depends(get_llm)):
        answer = llm(
        f"Q: {data.q} A:",  # Prompt
        max_tokens=32,  # Generate up to 32 tokens, set to None to generate up to the end of the context window
        stop=[
            "Q:",
            "\n",
        ],  # Stop generating just before the model would generate a new question
    )
    return {"answer":answer["choices"][0]["text"]}
```

You can now run the app with:

```bash
uvicorn main:app --reload
```

and test it with:

```bash
curl -X 'POST' \
  'http://localhost:8000/question' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "q": "What is capital of France?"
}'
```

You should get the answer from the model.

That's it! You have created a simple FastAPI app that uses Llama model to answer questions. If you have any questions, feel free to ask.

Example Codes: https://github.com/hmtcelik/fast-llama

Happy coding! 🦙
