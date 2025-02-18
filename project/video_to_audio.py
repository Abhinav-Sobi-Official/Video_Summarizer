from moviepy.editor import VideoFileClip

def audio_generator(loc):
    # Load video
    video_path = loc
    video = VideoFileClip(video_path)
    # Extract and save the audio as a WAV file
    audio_path = "audio.wav"
    video.audio.write_audiofile(audio_path)
    print(f"Audio extracted and saved as: {audio_path}")
    return "audio.wav"
