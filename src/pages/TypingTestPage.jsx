import React, { useState, useEffect } from 'react';
import '../style.css'; // 👈 Make sure CSS is imported
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const TypingTestPage = () => {
    const [text, setText] = useState('');
    const [userInput, setUserInput] = useState('');
    
    const [isStarted, setIsStarted] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [mistakes, setMistakes] = useState({}); // 👈 Mistake dictionary
    // const errorSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
    const [params] = useSearchParams();
    const timeParam = parseInt(params.get('time')) || 1
    const difficulty = params.get('difficulty');
    const totalTime = timeParam * 60; 
    const [timeLeft, setTimeLeft] = useState(totalTime)
    
    useEffect(() => {
        axios.get('https://server-6-2dbf.onrender.com/api/text')   
            .then((res) => {
                setText(res.data.text)
            }) 
            .catch((err) => {
                console.error('Error fetching text:', err);
            });
    },[])

    useEffect(() => {
        let timer = null;
        if (isStarted && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        } else if (timeLeft === 0) {
            calculateResults();
            setIsStarted(false);
        }
        return () => clearTimeout(timer);
    }, [isStarted, timeLeft]);

    const handleChange = (e) => {
        const value = e.target.value;

        // Check if last typed letter is wrong
        const index = value.length - 1;
        if (index >= 0 && text[index] !== value[index]) {
            // errorSound.play(); // 👈 Play beep if mismatch
        }

        // Check for word completed
        if (value.endsWith(' ')) {
            checkWord(value.trim());
        }

        setUserInput(value);
    };


    const checkWord = (inputTillNow) => {
        const inputWords = inputTillNow.trim().split(' ');
        const actualWords = text.trim().split(' ');

        const lastTypedWord = inputWords[inputWords.length - 1];
        const correctWord = actualWords[inputWords.length - 1];

        if (lastTypedWord !== correctWord) {
            setMistakes(prev => {
                const prevEntry = prev[lastTypedWord] || { correctWord, frequency: 0 };
                return {
                    ...prev,
                    [lastTypedWord]: {
                        correctWord,
                        frequency: prevEntry.frequency + 1
                    }
                };
            });
        }
    };

    const startTest = () => {
        setIsStarted(true);
        setUserInput('');
        setTimeLeft(totalTime);
        setWpm(0);
        setAccuracy(100);
        setMistakes({});
    };

    const calculateResults = () => {
        const wordsTyped = userInput.trim().split(' ').length;
        setWpm(wordsTyped);
        let correctChars = 0;
        const minLength = Math.min(text.length, userInput.length);
        for (let i = 0; i < minLength; i++) {
            if (text[i] === userInput[i]) {
                correctChars++;
            }
        }
        setAccuracy(((correctChars / text.length) * 100).toFixed(2));
    };

    const renderColoredText = () => {
        const textArray = text.split('');

        return textArray.map((char, index) => {
            let colorClass = '';

            if (index < userInput.length) {
                colorClass = userInput[index] === char ? 'correct' : 'incorrect';
            }

            return (
                <span key={index} className={colorClass}>
                    {char}
                </span>
            );
        });
    };

    const renderMistakeTable = () => {
        const mistakeEntries = Object.entries(mistakes);

        if (mistakeEntries.length === 0) {
            return <p>No mistakes yet! 🎯</p>;
        }

        return (
            <table className="mistake-table">
                <thead>
                    <tr>
                        <th>Incorrect Word</th>
                        <th>Correct Word</th> {/* 👈 New Header */}
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {mistakeEntries.map(([word, info], index) => (
                        <tr key={index}>
                            <td>{word}</td>
                            <td>{info.correctWord}</td> {/* 👈 New Cell */}
                            <td>{info.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };



    return (
        <div className="page-container">
            <div className="left-pane">
                <h2>Mistakes</h2>
                {renderMistakeTable()}
            </div>

            <div className="right-pane">
                <div className="progress-bar-container">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${(userInput.length / text.length) * 100}%` }}
                    ></div>
                </div>
                <h1 className="title">🚀 Typing Master</h1>
                <div className="stats">
                    <span>⏳ Time Left: {timeLeft}s</span>
                    <span> | 🏃‍♂️ WPM: {wpm}</span>
                    <span> | 🎯 Accuracy: {accuracy}%</span>
                </div>

                <div className="text-box">
                    {renderColoredText()}
                </div>

                <textarea
                    value={userInput}
                    onChange={handleChange}
                    disabled={!isStarted || timeLeft === 0}
                    className="text-area"
                    placeholder="Start typing here..."
                />

                <div>
                    <button onClick={startTest} disabled={isStarted} className="button">
                        {isStarted ? 'Typing...' : 'Start Test'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypingTestPage;
