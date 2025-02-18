from fastapi import FastAPI
from pydantic import BaseModel
import time
from fastapi.middleware.cors import CORSMiddleware
import os

from url_to_video import download
from video_to_audio import audio_generator
from audio_to_text import text_extractor

#uvicorn main:app --reload
#https://www.youtube.com/watch?v=GJlFGQTc0io

app = FastAPI()

# Allow all origins, methods, and headers (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific frontend URLs in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoRequest(BaseModel):
    video_url: str

@app.post("/summarize")
def summarize_video(request: VideoRequest):
    if os.path.exists("video.mp4"):
        os.remove("video.mp4")
    url=str(request)
    final_url=url[11:len(url)-1]
    print("reached here!!!\n",str(final_url))
    location=download(str(final_url))
    audio_file=audio_generator(location)
    text=text_extractor(audio_file)
    print(text)
    return {"summary": text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
