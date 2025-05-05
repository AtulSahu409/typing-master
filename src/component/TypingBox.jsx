import { useState, useEffect, useRef } from "react";

export default function TypingBox() {
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [input, setInput] = useState("");
  const [time, setTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Start test on first keystroke
  useEffect(() => {
    if (input.length === 1 && !isRunning) {
      setIsRunning(true);
      const timer = setInterval(() => setTime((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [input]);

  // Focus input automatically
  useEffect(() => inputRef.current?.focus(), []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="mb-4 flex justify-between">
        <span className="font-mono text-2xl">{time}s</span>
        <span className="font-mono text-2xl">WPM: 0</span>
      </div>

      <div className="p-4 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg min-h-24">
        {text.split("").map((char, i) => (
          <span 
            key={i}
            className={`
              ${input[i] === char ? "text-green-500" : ""}
              ${input[i] && input[i] !== char ? "text-red-500 underline" : ""}
            `}
          >
            {char}
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800"
        placeholder="Start typing..."
      />
    </div>
  );
}