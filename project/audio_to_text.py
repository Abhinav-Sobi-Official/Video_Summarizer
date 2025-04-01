import speech_recognition as sr

def text_extractor(loc):
    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(loc) as source:
            recognizer.adjust_for_ambient_noise(source)  # Adjust for background noise
            print("Processing audio...")
            
            audio_chunks = []
            while True:
                audio = recognizer.record(source, duration=10)  # Process in chunks
                if not audio.frame_data:  # Stop when no more data
                    break
                audio_chunks.append(audio)

            # Convert all chunks to text
            full_text = ""
            for chunk in audio_chunks:
                try:
                    text = recognizer.recognize_google(chunk)
                    full_text += text + " "
                except sr.UnknownValueError:
                    print("Could not understand part of the audio")
                except sr.RequestError:
                    print("Could not request results from Google Speech Recognition service")
            
            return full_text.strip()

    except Exception as e:
        print("Error during transcription:", e)
    return ""
