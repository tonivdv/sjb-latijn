"use client";

import { useEffect, useState } from "react";

type Word = {
  latin: string;
  dutch: string;
};

const data: Word[] = [
  { latin: "pater", dutch: "de vader" },
  { latin: "canis", dutch: "de hond" },
  { latin: "amicus", dutch: "de vriend" },
  { latin: "dominus", dutch: "de meester" },
  { latin: "equus", dutch: "het paard" },
  { latin: "filius", dutch: "de zoon" },
  { latin: "servus", dutch: "de slaaf" },
  { latin: "aqua", dutch: "het water" },
  { latin: "familie", dutch: "het gezin" },
  { latin: "via", dutch: "de weg" },
  { latin: "monumentum", dutch: "het monument" },
  { latin: "templum", dutch: "de tempel" },
  { latin: "vinum", dutch: "de wijn" },
  { latin: "pater", dutch: "de vader" },
  { latin: "senex", dutch: "de oude man" },
  { latin: "vingo", dutch: "de maagd" },
  { latin: "vox", dutch: "de stem" },
  { latin: "flumen", dutch: "de rivier" },
  { latin: "sidus", dutch: "de ster" },
];

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Function to shuffle the array randomly
  const shuffleArray = (array: Word[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  // Fetch and shuffle the words when the component mounts
  useEffect(() => {
    const shuffledWords = shuffleArray(data);
    setWords(shuffledWords.slice(0, 10)); // Select 10 random words
  }, []);

  // Function to check the user's answers and calculate the score
  const checkAnswers = () => {
    const newScore = words.reduce((acc, word, index) => {
      if (userAnswers[index]?.toLowerCase() === word.dutch.toLowerCase()) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(newScore);
    setGameOver(true);
  };

  const colorInput = (index: number, word: (typeof data)[number]) => {
    if (!gameOver) {
      return "";
    }

    return userAnswers[index]?.toLowerCase() !== word.dutch.toLowerCase()
      ? "bg-red-100" // Mark incorrect answers as red
      : "bg-green-100"; // Mark correct answers as green
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div>
        <h1 className="text-center text-2xl">
          Oefen je latijnse woorden
        </h1>
        {gameOver && (
            <div className="grid text-center mt-5 mb-5">
              <h2>Game Over!</h2>
              <p>Je score: {score} op 10</p>
            </div>
          )}
        <div className="grid grid-cols-1 pl-10 pr-10 pt-5 pb-5">
          {words.map((word, index) => (
            <div key={index} className="">
              {gameOver &&
                userAnswers[index]?.toLowerCase() !==
                  word.dutch.toLowerCase() && (
                  <div className="grid grid-cols-2 gap-4 text-red-500">
                    <div></div>
                    <div>{word.dutch}</div>
                  </div>
                )}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex justify-end">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    {word.latin}
                  </label>
                </div>
                <input
                  type="text"
                  value={userAnswers[index] || ""}
                  onChange={(e) => {
                    const newAnswers = [...userAnswers];
                    newAnswers[index] = e.target.value;
                    setUserAnswers(newAnswers);
                  }}
                  className={`w-full rounded-md border-0 py-1.5 pl-1.5 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${colorInput(
                    index,
                    word
                  )}`}
                ></input>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div></div>
            <div>
              <button
                onClick={checkAnswers}
                disabled={gameOver} // Disable the button when the game is over
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Check Answers
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
