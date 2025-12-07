import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DeepThinker from './components/tools/DeepThinker';
import FinanceTracker from './components/tools/FinanceTracker';
import NotePad from './components/tools/NotePad';
import MarkdownEditor from './components/tools/MarkdownEditor';
import UnitConverter from './components/tools/UnitConverter';
import AgeCalculator from './components/tools/AgeCalculator';
import EmiCalculator from './components/tools/EmiCalculator';
import SipCalculator from './components/tools/SipCalculator';
import QrGenerator from './components/tools/QrGenerator';
import PasswordGenerator from './components/tools/PasswordGenerator';
import WordCounter from './components/tools/WordCounter';
import CharacterCounter from './components/tools/CharacterCounter';
import Base64Converter from './components/tools/Base64Converter';
import ColorPicker from './components/tools/ColorPicker';
import TextToSpeech from './components/tools/TextToSpeech';
import SpeechToText from './components/tools/SpeechToText';
import JsonFormatter from './components/tools/JsonFormatter';
import BMICalculator from './components/tools/BMICalculator';
import TimerStopwatch from './components/tools/TimerStopwatch';
import Settings from './components/Settings';
import Login from './components/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing session
  useEffect(() => {
    const user = localStorage.getItem('multiChoiceUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    localStorage.setItem('multiChoiceUser', JSON.stringify({ username, loggedInAt: Date.now() }));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('multiChoiceUser');
    setIsAuthenticated(false);
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="tool/deep-thinker" element={<DeepThinker />} />
          <Route path="tool/finance" element={<FinanceTracker />} />
          <Route path="tool/notepad" element={<NotePad />} />
          <Route path="tool/markdown-editor" element={<MarkdownEditor />} />
          <Route path="tool/converter" element={<UnitConverter />} />
          <Route path="tool/age-calculator" element={<AgeCalculator />} />
          <Route path="tool/emi-calculator" element={<EmiCalculator />} />
          <Route path="tool/sip-calculator" element={<SipCalculator />} />
          <Route path="tool/qr-generator" element={<QrGenerator />} />
          <Route path="tool/password-generator" element={<PasswordGenerator />} />
          <Route path="tool/word-counter" element={<WordCounter />} />
          <Route path="tool/character-counter" element={<CharacterCounter />} />
          <Route path="tool/base64" element={<Base64Converter />} />
          <Route path="tool/color-picker" element={<ColorPicker />} />
          <Route path="tool/tts" element={<TextToSpeech />} />
          <Route path="tool/stt" element={<SpeechToText />} />
          <Route path="tool/json-formatter" element={<JsonFormatter />} />
          <Route path="tool/bmi-calculator" element={<BMICalculator />} />
          <Route path="tool/timer" element={<TimerStopwatch />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;