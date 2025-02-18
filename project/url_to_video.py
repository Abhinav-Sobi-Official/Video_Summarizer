"""
download("https://www.youtube.com/watch?v=EFX_xdQat2s")    
"""
import yt_dlp

def download(link):
    # Options to download as MP4
    ydl_opts = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4',  # Ensures MP4 format
        'outtmpl': 'video.mp4',  # Saves as video.mp4 in 'downloads' folder
        'merge_output_format': 'mp4',  # Ensures final format is MP4
    }
    # Download the video
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([link])
    return "video.mp4"    

#download("https://www.youtube.com/watch?v=wZAjVQWbMlE")