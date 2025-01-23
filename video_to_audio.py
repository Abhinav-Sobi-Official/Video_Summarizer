from moviepy.editor import VideoFileClip

# Load video
video_path = "reel.mp4"
video = VideoFileClip(video_path)

# Extract and save the audio as a WAV file
audio_path = "audio.wav"
video.audio.write_audiofile(audio_path)
print(f"Audio extracted and saved as: {audio_path}")
