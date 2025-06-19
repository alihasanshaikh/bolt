import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import PitchBuilder from './components/PitchBuilder';
import GeneratedPitch from './components/GeneratedPitch';
import VoiceoverFeature from './components/VoiceoverFeature';
import { Screen, PitchData } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [pitchData, setPitchData] = useState<PitchData>({
    ideaName: '',
    description: '',
    problem: '',
    solution: '',
    targetAudience: '',
    revenueModel: 'Subscriptions'
  });

  const handleStartPitch = () => {
    setCurrentScreen('builder');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleGeneratePitch = (data: PitchData) => {
    setPitchData(data);
    setCurrentScreen('generated');
  };

  const handleBackToBuilder = () => {
    setCurrentScreen('builder');
  };

  const handleVoiceover = () => {
    setCurrentScreen('voiceover');
  };

  const handleBackToPitch = () => {
    setCurrentScreen('generated');
  };

  switch (currentScreen) {
    case 'home':
      return <HomeScreen onStartPitch={handleStartPitch} />;
    
    case 'builder':
      return (
        <PitchBuilder
          onBack={handleBackToHome}
          onGenerate={handleGeneratePitch}
        />
      );
    
    case 'generated':
      return (
        <GeneratedPitch
          onBack={handleBackToBuilder}
          onVoiceover={handleVoiceover}
          pitchData={pitchData}
        />
      );
    
    case 'voiceover':
      return (
        <VoiceoverFeature
          onBack={handleBackToPitch}
        />
      );
    
    default:
      return <HomeScreen onStartPitch={handleStartPitch} />;
  }
}

export default App;