import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Mic, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { PitchData, GeneratedContent } from '../types';

interface GeneratedPitchProps {
  onBack: () => void;
  onVoiceover: () => void;
  pitchData: PitchData;
}

export default function GeneratedPitch({ onBack, onVoiceover, pitchData }: GeneratedPitchProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [regeneratingSlide, setRegeneratingSlide] = useState<number | null>(null);

  // Generate initial content based on form data
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({
    title: pitchData.ideaName,
    tagline: `Revolutionizing ${pitchData.targetAudience} through innovative solutions`,
    problem: pitchData.problem || 'Traditional approaches are inefficient and costly, leaving customers frustrated and businesses struggling to compete in today\'s fast-paced market.',
    solution: pitchData.solution || 'Our cutting-edge platform leverages advanced technology to streamline processes, reduce costs, and deliver exceptional user experiences.',
    market: `Our primary focus is ${pitchData.targetAudience}, a rapidly growing market segment with significant untapped potential and increasing demand for innovative solutions.`,
    revenue: `We generate revenue through our ${pitchData.revenueModel.toLowerCase()} model, providing sustainable and scalable income streams while delivering exceptional value to our customers.`
  });

  const slides = [
    {
      title: 'Title Slide',
      content: (
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {generatedContent.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {generatedContent.tagline}
          </p>
        </div>
      ),
      field: 'tagline' as keyof GeneratedContent
    },
    {
      title: 'Problem',
      content: (
        <div className="py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Problem</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {generatedContent.problem}
          </p>
        </div>
      ),
      field: 'problem' as keyof GeneratedContent
    },
    {
      title: 'Solution',
      content: (
        <div className="py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Solution</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {generatedContent.solution}
          </p>
        </div>
      ),
      field: 'solution' as keyof GeneratedContent
    },
    {
      title: 'Market & Audience',
      content: (
        <div className="py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Target Market</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {generatedContent.market}
          </p>
        </div>
      ),
      field: 'market' as keyof GeneratedContent
    },
    {
      title: 'Revenue Model',
      content: (
        <div className="py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Revenue Model</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {generatedContent.revenue}
          </p>
        </div>
      ),
      field: 'revenue' as keyof GeneratedContent
    }
  ];

  const handleRegenerate = async (slideIndex: number) => {
    setRegeneratingSlide(slideIndex);
    
    // Simulate AI regeneration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const slide = slides[slideIndex];
    const field = slide.field;
    
    // Generate new content based on slide type
    let newContent = '';
    switch (field) {
      case 'tagline':
        newContent = `Transforming ${pitchData.targetAudience} with next-generation technology`;
        break;
      case 'problem':
        newContent = 'Current market solutions are outdated and fail to meet the evolving needs of modern consumers, creating significant gaps in efficiency and satisfaction.';
        break;
      case 'solution':
        newContent = 'Our innovative platform combines AI-driven insights with user-centric design to deliver unprecedented value and seamless experiences.';
        break;
      case 'market':
        newContent = `The ${pitchData.targetAudience} market represents a $10B+ opportunity with 20% annual growth, driven by increasing digital transformation and changing consumer preferences.`;
        break;
      case 'revenue':
        newContent = `Our ${pitchData.revenueModel.toLowerCase()}-based revenue model ensures predictable growth with multiple monetization streams and strong unit economics.`;
        break;
    }
    
    setGeneratedContent(prev => ({
      ...prev,
      [field]: newContent
    }));
    
    setRegeneratingSlide(null);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Builder
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Slide Navigation */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="text-white font-medium">
                  {currentSlide + 1} / {slides.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-sm">
                  {slides[currentSlide].title}
                </span>
                <button
                  onClick={() => handleRegenerate(currentSlide)}
                  disabled={regeneratingSlide === currentSlide}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 text-white ${regeneratingSlide === currentSlide ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Content */}
          <div className="p-8 md:p-12 min-h-[400px] flex items-center">
            <div className="w-full">
              {slides[currentSlide].content}
            </div>
          </div>

          {/* Slide Dots */}
          <div className="flex justify-center pb-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full mx-1 transition-all duration-200 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={onVoiceover}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 rounded-2xl hover:bg-white transition-all duration-200 shadow-lg"
          >
            <Mic className="w-4 h-4" />
            Add AI Voiceover
          </button>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/20 text-gray-700 rounded-2xl hover:bg-white transition-all duration-200 shadow-lg">
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg">
            <Share2 className="w-4 h-4" />
            Share Pitch
          </button>
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