import React from 'react';
import { Presentation, Sparkles, ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onStartPitch: () => void;
}

export default function HomeScreen({ onStartPitch }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Presentation className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            PitchPal
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium mb-2">
            AI Startup Pitch Builder
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Turn your ideas into polished startup pitch decks with AI. Create professional presentations that captivate investors and tell your story.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">Smart content generation for every slide</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Presentation className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Professional</h3>
              <p className="text-sm text-gray-600">Investor-ready pitch decks</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Fast</h3>
              <p className="text-sm text-gray-600">From idea to pitch in minutes</p>
            </div>
          </div>

          <button
            onClick={onStartPitch}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg inline-flex items-center gap-2"
          >
            Start Your Pitch
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            Built on <span className="font-semibold text-gray-600">Bolt</span>
          </p>
        </div>
      </div>
    </div>
  );
}