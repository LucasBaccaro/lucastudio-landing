import os
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import openai
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import json

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")
openai._custom_headers = {"OpenAI-Beta": "assistants=v2"}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes restringir a ["http://localhost:5173"] si usas Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ASSISTANT_ID = "asst_ixPxx6FazgViOpW7UqpsTQo4"

# Lista global para guardar los thread_id creados en esta instancia
THREADS_FILE = "threads.json"

def load_threads():
    try:
        with open(THREADS_FILE, "r", encoding="utf-8") as f:
            return set(json.load(f))
    except Exception:
        return set()

def save_threads(threads):
    with open(THREADS_FILE, "w", encoding="utf-8") as f:
        json.dump(list(threads), f)

THREAD_IDS = load_threads()

class MessageRequest(BaseModel):
    message: str
    thread_id: str = None  # Opcional, para mantener contexto

@app.post("/ask")
async def ask_openai(req: MessageRequest):
    # 1. Crear thread si no existe
    if req.thread_id is None:
        thread = openai.beta.threads.create()
        thread_id = thread.id
        THREAD_IDS.add(thread_id)
        save_threads(THREAD_IDS)
    else:
        thread_id = req.thread_id
        if thread_id not in THREAD_IDS:
            THREAD_IDS.add(thread_id)
            save_threads(THREAD_IDS)

    # 2. Añadir mensaje del usuario
    openai.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=req.message
    )

    # 3. Lanzar el run
    run = openai.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=ASSISTANT_ID
    )

    # 4. Esperar a que termine el run (polling simple)
    import time
    while True:
        run_status = openai.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run.id)
        if run_status.status in ["completed", "failed", "cancelled"]:
            break
        time.sleep(1)

    # 5. Obtener la respuesta
    messages = openai.beta.threads.messages.list(thread_id)
    # Log de todos los mensajes del thread para depuración
    print("--- Mensajes en el thread ---")
    for m in messages.data:
        print(f"[{m.role}] {m.content[0].text.value if m.content and hasattr(m.content[0], 'text') else m.content}")
    print("-----------------------------")
    # Buscar el mensaje del asistente que tenga el run_id del run recién creado
    assistant_message = next((m for m in messages.data if m.role == "assistant" and getattr(m, 'run_id', None) == run.id), None)
    # Fallback: si no se encuentra, usar el último mensaje del asistente
    if assistant_message is None:
        assistant_message = next((m for m in reversed(messages.data) if m.role == "assistant"), None)

    # Preparar historial para el frontend
    history = [
        {
            "role": m.role,
            "text": m.content[0].text.value if m.content and hasattr(m.content[0], 'text') else m.content,
            "timestamp": m.created_at if hasattr(m, 'created_at') else None
        }
        for m in messages.data
    ]

    return JSONResponse({
        "thread_id": thread_id,
        "assistant_message": assistant_message.content[0].text.value if assistant_message else None,
        "history": history
    })

# Endpoint para listar todos los thread_id
@app.get("/admin/threads")
def list_threads():
    """Devuelve la lista de todos los thread_id guardados."""
    threads = load_threads()
    return {"threads": list(threads)}

@app.get("/admin/threads/{thread_id}/messages")
def get_thread_messages(thread_id: str):
    threads = load_threads()
    if thread_id not in threads:
        raise HTTPException(status_code=404, detail="Thread no encontrado en threads.json")
    try:
        messages = openai.beta.threads.messages.list(thread_id)
        history = [
            {
                "role": m.role,
                "text": m.content[0].text.value if m.content and hasattr(m.content[0], 'text') else m.content,
                "timestamp": m.created_at if hasattr(m, 'created_at') else None
            }
            for m in messages.data
        ]
        return {"thread_id": thread_id, "history": history}
    except Exception as e:
        if "404" in str(e) or "not found" in str(e).lower():
            raise HTTPException(status_code=404, detail="Thread no encontrado en OpenAI")
        raise HTTPException(status_code=500, detail=str(e))