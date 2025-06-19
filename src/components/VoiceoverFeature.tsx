import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, Download, RefreshCw } from 'lucide-react';

interface VoiceoverFeatureProps {
  onBack: () => void;
}

export default function VoiceoverFeature({ onBack }: VoiceoverFeatureProps) {
  const [selectedVoice, setSelectedVoice] = useState('narrator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const voices = [
    { id: 'narrator', name: 'Professional Narrator', description: 'Clear, authoritative voice perfect for business presentations' },
    { id: 'friendly-female', name: 'Friendly Female', description: 'Warm and approachable tone that builds trust' },
    { id: 'tech-ceo', name: 'Tech CEO', description: 'Confident and innovative voice for tech startups' },
    { id: 'investor-pitch', name: 'Investor Pitch', description: 'Persuasive and compelling tone for funding rounds' }
  ];

  const handleGenerateVoiceover = async () => {
    setIsGenerating(true);
    // Simulate AI voiceover generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Simulate audio playback
    if (!isPlaying) {
      setTimeout(() => setIsPlaying(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pitch
          </button>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Voiceover Studio
          </h1>
          <p className="text-gray-600 mt-2">
            Add professional voiceover to your pitch presentation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Selection */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Choose Your Voice</h2>
            
            <div className="space-y-4">
              {voices.map((voice) => (
                <label
                  key={voice.id}
                  className={`block p-4 border rounded-2xl cursor-pointer transition-all duration-200 ${
                    selectedVoice === voice.id
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="voice"
                    value={voice.id}
                    checked={selectedVoice === voice.id}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 transition-colors ${
                      selectedVoice === voice.id
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedVoice === voice.id && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{voice.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{voice.description}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={handleGenerateVoiceover}
              disabled={isGenerating}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 inline-flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating Voiceover...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5" />
                  Generate Voiceover
                </>
              )}
            </button>
          </div>

          {/* Audio Player */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Preview & Download</h2>
            
            {!hasGenerated ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Generate a voiceover to preview audio</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {voices.find(v => v.id === selectedVoice)?.name}
                      </h3>
                      <p className="text-sm text-gray-600">Complete pitch voiceover</p>
                    </div>
                    <div className="text-sm text-gray-500">2:30</div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayback}
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl flex items-center justify-center transition-all duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-1" />
                      )}
                    </button>
                    
                    <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-1000 ${
                          isPlaying ? 'w-1/3' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all duration-200 inline-flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                  
                  <button className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 inline-flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            Built on <span className="font-semibold text-gray-600">Bolt</span>
          </p>
        </div>
      </div>
    </div>
  );
}