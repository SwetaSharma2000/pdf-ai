from fastapi import FastAPI, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from transformers import pipeline
import tempfile
import os

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Globals
vector_store = None
# qa_pipeline = pipeline("text-generation", model="EleutherAI/gpt-neo-125M", device=-1)
qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2")


  

# 🔍 Step 1: Process + Chunk + Embed
def process_pdf(file_bytes):
    global vector_store

    # Save temp file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
        temp_file.write(file_bytes)
        temp_file_path = temp_file.name

    try:
        # Load PDF
        loader = PyMuPDFLoader(temp_file_path)
        documents = loader.load()
        full_text = "\n".join([doc.page_content for doc in documents])

        # Chunking
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50 )
        chunks = text_splitter.split_text(full_text)

        # Embedding
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        vector_store = FAISS.from_texts(chunks, embeddings)

        return "PDF processed successfully"
    finally:
        os.remove(temp_file_path)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    result = process_pdf(content)
    return {"message": result}

@app.post("/ask/")
async def ask_question(request: Request):
    global vector_store

    if vector_store is None:
        return {"answer": "No PDF uploaded yet."}

    data = await request.json()
    question = data.get("question")
    if not question:
        return {"answer": "Please provide a question."}

    # Retrieve similar chunks
    docs = vector_store.similarity_search(question, k=3)
    context = "\n".join([doc.page_content for doc in docs])

    # Use QA pipeline directly
    result = qa_pipeline(question=question, context=context)
    answer = result["answer"]

    return {"answer": answer}
