from gtts import gTTS

def output_audio(text):
    # Convert text to speech
    tts = gTTS(text=text, lang='en')
    # Save the output audio file
    tts.save("output.mp3")

