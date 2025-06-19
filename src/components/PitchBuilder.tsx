import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, Target, DollarSign } from 'lucide-react';
import { PitchData } from '../types';

interface PitchBuilderProps {
  onBack: () => void;
  onGenerate: (data: PitchData) => void;
}

export default function PitchBuilder({ onBack, onGenerate }: PitchBuilderProps) {
  const [formData, setFormData] = useState<PitchData>({
    ideaName: '',
    description: '',
    problem: '',
    solution: '',
    targetAudience: '',
    revenueModel: 'Subscriptions'
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    {
      title: 'Idea Name',
      icon: Lightbulb,
      field: 'ideaName' as keyof PitchData,
      placeholder: 'Enter your startup idea name...',
      type: 'input'
    },
    {
      title: 'Short Description',
      icon: Lightbulb,
      field: 'description' as keyof PitchData,
      placeholder: 'Describe your startup in a few sentences...',
      type: 'textarea'
    },
    {
      title: 'Problem Statement',
      icon: Target,
      field: 'problem' as keyof PitchData,
      placeholder: 'What problem does your startup solve?',
      type: 'textarea'
    },
    {
      title: 'Solution',
      icon: Lightbulb,
      field: 'solution' as keyof PitchData,
      placeholder: 'How does your startup solve this problem?',
      type: 'textarea'
    },
    {
      title: 'Target Audience',
      icon: Target,
      field: 'targetAudience' as keyof PitchData,
      placeholder: 'Who is your target customer?',
      type: 'input'
    },
    {
      title: 'Revenue Model',
      icon: DollarSign,
      field: 'revenueModel' as keyof PitchData,
      placeholder: '',
      type: 'select',
      options: ['Ads', 'Subscriptions', 'Marketplace', 'Other']
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      [currentStepData.field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    onGenerate(formData);
  };

  const isCurrentStepValid = () => {
    const value = formData[currentStepData.field];
    return value && value.trim().length > 0;
  };

  const isFormComplete = () => {
    return Object.values(formData).every(value => value && value.trim().length > 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-white/20">
            <div className="flex">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-xl mx-1 transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl mb-4">
              <Icon className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentStepData.title}
            </h2>
          </div>

          <div className="space-y-6">
            {currentStepData.type === 'input' && (
              <input
                type="text"
                value={formData[currentStepData.field]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg"
              />
            )}

            {currentStepData.type === 'textarea' && (
              <textarea
                value={formData[currentStepData.field]}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={currentStepData.placeholder}
                rows={6}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg resize-none"
              />
            )}

            {currentStepData.type === 'select' && (
              <select
                value={formData[currentStepData.field]}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-lg bg-white"
              >
                {currentStepData.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleGenerate}
                disabled={!isFormComplete() || isGenerating}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 inline-flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Pitch Deck
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 inline-flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}