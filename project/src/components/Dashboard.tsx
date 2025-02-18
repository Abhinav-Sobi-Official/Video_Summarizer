import React, { useState } from 'react';
import { Youtube, Upload, Volume2, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoPath, setVideoPath] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoPath(URL.createObjectURL(file)); // Creates a temporary URL for preview
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
        const response = await fetch("http://localhost:8000/summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ video_url: url }),
        });

        const data = await response.json();
        setSummary(data.summary);
    } catch (error) {
        console.error("Error:", error);
        setSummary("Failed to fetch summary.");
    }

    setIsProcessing(false);
};


  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Summarizer</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">YouTube URL</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter YouTube URL"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    <Youtube className="h-5 w-5" />
                    Process
                  </button>
                </div>
              </form>
            </div>
            
            <div>
      <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">Drag and drop your video here or</p>
        <label className="mt-2 text-indigo-600 hover:text-indigo-500 cursor-pointer">
          browse files
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleFileChange} 
            className="hidden"
          />
        </label>
      </div>

      {videoPath && (
        <div className="mt-4">
          <p className="text-gray-600">Selected Video:</p>
          <video src={videoPath} controls className="mt-2 w-full max-w-md rounded-lg shadow" />
        </div>
      )}
    </div>
          </div>
        </div>

        {isProcessing && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-2">Processing video...</span>
            </div>
          </div>
        )}

        {summary && (
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Text Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio Summary
              </h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                <audio controls className="w-full">
                  <source src="#" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
