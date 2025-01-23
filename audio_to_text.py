import speech_recognition as sr

# Initialize recognizer
recognizer = sr.Recognizer()
audio_path="audio.wav"
# Transcribe audio to text
try:
    with sr.AudioFile(audio_path) as source:
        print("Processing audio...")
        audio = recognizer.record(source)  # Read the entire audio file
        text = recognizer.recognize_google(audio)  # Use Google Web Speech API
        print("Transcription:\n", text)
except Exception as e:
    print("Error during transcription:", e)

    