import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import '../style.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');

  const handleStart = () => {
    navigate(`/test?time=${time}&difficulty=${difficulty}`);
  };

  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <h1 className="app-title">💻 Typing Master</h1>
        <p className="tagline">Improve your speed. Master the keys. Track your progress.</p>

        <button className="start-button" onClick={() => setShowModal(true)}>
          Start Typing Test
        </button>

        <div className="footer-note">🔥 Challenge yourself every day. Reach 100 WPM!</div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Test Settings</h2>
            <label>Time (in minutes):</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="1"
              max="10"
            />

            <label>Difficulty:</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleStart}>Start Test</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
