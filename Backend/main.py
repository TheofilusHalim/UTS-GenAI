from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ai_engine import generate_adaptive_question
from database import supabase
from adaptive_logic import calculate_next_level

app = FastAPI(title="AdaptiQuiz API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AdaptiQuiz Backend is running!"}


@app.get("/api/quiz/generate")
def get_question(topic: str, level: int):
    question_json = generate_adaptive_question(topic, level)
    return {"data": question_json}


@app.get("/api/quiz/questions")
def get_quiz_questions(topic_id: int, level: int):
    """
    Mengambil daftar soal dari bank soal Supabase berdasarkan topik dan level.
    """
    response = supabase.table("questions") \
        .select("*") \
        .eq("topic_id", topic_id) \
        .eq("level", level) \
        .execute()
    
    return {"data": response.data}


@app.post("/api/quiz/submit")
def submit_answer(user_id: str, question_id: int, user_answer: str, current_level: int):
    # 1. Ambil soal dari database untuk cek kunci jawaban
    question_data = supabase.table("questions").select("correct_answer").eq("id", question_id).execute()
    if not question_data.data:
        return {"error": "Soal tidak ditemukan"}
    
    correct_answer = question_data.data[0]["correct_answer"]
    is_correct = (user_answer.strip().lower() == correct_answer.strip().lower())

    # 2. Simpan riwayat jawaban ke tabel user_attempts di Supabase
    supabase.table("user_attempts").insert({
        "user_id": user_id,
        "question_id": question_id,
        "is_correct": is_correct
    }).execute()

    # 3. Ambil riwayat beberapa jawaban terakhir user untuk evaluasi adaptive engine
    history_response = supabase.table("user_attempts") \
        .select("is_correct") \
        .eq("user_id", user_id) \
        .order("created_at", desc=True) \
        .limit(3) \
        .execute()
    
    recent_answers = [row["is_correct"] for row in history_response.data]

    # 4. Hitung level berikutnya
    next_level = calculate_next_level(current_level, recent_answers)

    return {
        "is_correct": is_correct,
        "correct_answer": correct_answer,
        "next_level": next_level
    }