---
publishDate: 2024-08-12T00:00:00Z
title: FastAPI ile Llama Modeli Kullanımı
excerpt: Bu makalede, FastAPI'de Llama modelini nasıl kullanacağımızı açıklayacağım. Llama2 modelini kullanarak basit bir API oluşturacağız.
image: /images/blog/programming/fast-llama.webp
author: Abdulhamit Celik
category: Programming
tags: []
---

## Llama Nedir?

Llama (Large Language Model Meta AI'nin kısaltması ve önceki şekliyle LLaMA olarak stilize edilmiştir), Meta AI tarafından Şubat 2023'te başlayarak yayınlanan oto-regresif büyük dil modelleri (LLM) ailesidir. En son sürümü Temmuz 2024'te yayınlanan Llama 3.1'dir.

## FastAPI'de Llama Kullanımı

FastAPI kullanarak her yerde kullanılabilen bir llama servisi oluşturacağız.

Öncelikle bağımlılıkları yükleyeceğiz:

```bash
pip install fastapi uvicorn llama-cpp-python
```

Daha sonra modeli huggingface reposundan çekmek için bir yardımcı yöntem yazacağız:

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

Bu yardımcı yöntemle modeli yükleyebilir ve başlangıçta FastAPI uygulamamızda kullanabiliriz, bu yüzden uygulama başlamadan önce modeli yüklemek için bir `@asynccontextmanager` oluşturacağız:

```python
# other imports
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.llm = init_model()
    yield

app = FastAPI(lifespan=lifespan)
```

Bu şekilde uygulamayı oluşturduğumuzda model yüklenecek ve router'larımızda kullanabileceğiz. Bir dependency oluşturarak modeli router'larımızda kullanabiliriz:

```python
def get_llm():
    return app.state.llm

@app.post("/question")
def get_answer(llm: Llama = Depends(get_llm)):
    pass
```

Görüldüğü gibi, llama modelimizi bir dependency olarak router'ımızda kullanıyoruz.

Şimdi bu modeli kullanarak bir soru sormak için bir endpoint oluşturalım:

```python
from pydantic import BaseModel

class Question(BaseModel):
    q: str

@app.post("/question")
def get_answer(data: Question, llm: Llama = Depends(get_llm)):
    pass
```

ve istekte body içerisinden gelicek olan data değişkenini kullanarak soruyu llama modeline soracağız.

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

Artık uygulamayı çalıştırabilirsiniz:

```bash
uvicorn main:app --reload
```

ve test edelim:

```bash
curl -X 'POST' \
  'http://localhost:8000/question' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "q": "What is capital of France?"
}'
```

Hepsi bu kadar! Llama modelini kullanarak soruları yanıtlayan basit bir FastAPI uygulaması oluşturdunuz. Herhangi bir sorunuz varsa, sormaktan çekinmeyin.

Örnek Kod: https://github.com/hmtcelik/fast-llama

Mutlu kodlamalar! 🦙
