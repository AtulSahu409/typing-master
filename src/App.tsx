import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingTestPage from './pages/TypingTestPage';
import ResultPage from './pages/ResultPage';
import HomePage from './pages/HomePage';
function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={<TypingTestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
