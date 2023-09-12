"use client";

import { useEffect, useState } from "react";
import data from "../../lib/words.json";
import { Word } from "@/src/lib/types";
import { shuffleArray } from "@/src/lib/utils";
import Image from "next/image";

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  /**
   *  Fetch and shuffle the words when the component mounts
   */
  useEffect(() => {
    const shuffledWords = shuffleArray(data);
    setWords(shuffledWords.slice(0, 10)); // Select 10 random words
    setLoading(false);
  }, []);

  /**  Function to check the user's answers and calculate the score */
  const checkAnswers = () => {
    const newScore = words.reduce((acc, word, index) => {
      // Split the user's answers by newline and trim any leading/trailing whitespace
      const userAnswerLines =
        userAnswers[index]
          ?.split("\n")
          .map((line) => line.trim().toLowerCase()) ?? [];

      // Calculate the score for the current word
      const wordScore = word.dutch.reduce((score, dutchWord) => {
        if (userAnswerLines.includes(dutchWord.toLowerCase())) {
          // Increment the score by 1 divided by the number of Dutch words
          return score + 1 / word.dutch.length;
        }
        return score;
      }, 0);

      return acc + wordScore;
    }, 0);
    setScore(newScore);
    setGameOver(true);
  };

  const isAllCorrect = (index: number, word: (typeof data)[number]) => {
    const userAnswerLines = userAnswers[index]
      ?.split("\n")
      .map((line) => line.trim().toLowerCase());

    if (userAnswerLines?.length != word.dutch.length) {
      return false;
    }

    return userAnswerLines?.every((userAnswer) =>
      word.dutch.some((dutchWord) => dutchWord.toLowerCase() === userAnswer)
    );
  };

  const colorInput = (index: number, word: (typeof data)[number]) => {
    if (!gameOver) {
      return "";
    }

    return isAllCorrect(index, word) ? "bg-green-100" : "bg-red-100";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 text-xs">
      {loading ? (
        <div className="text-center">
          <Image className="h-50 w-50" src="/spinner.svg" alt="Loading" width="50" height="50" />
        </div>
      ) : (
        <div>
          {gameOver && (
            <div className="grid grid-cols-1 gap-4 text-center mt-1 mb-1 text-xl">
              <h1>Je score: {score} op 10</h1>
            </div>
          )}
          <div className="grid grid-cols-1 ">
            {words.map((word, index) => (
              <div key={index} className="">
                {gameOver && !isAllCorrect(index, word) && (
                  <div className="grid grid-cols-2 gap-4 text-red-500">
                    <div></div>
                    <div>
                      {word.dutch.map((dutchWord, dutchIndex) => (
                        <div
                          key={dutchIndex}
                          className={`text-${colorInput(index, word)}`}
                        >
                          {dutchWord}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-1 mb-4">
                  <div className="flex items-center justify-end">
                    <label className="block text-sm font-medium leading-6 text-white-900 pr-1">
                      {word.latin}
                    </label>
                  </div>
                  <textarea
                    value={userAnswers[index] || ""}
                    rows={2}
                    onChange={(e) => {
                      const newAnswers = [...userAnswers];
                      newAnswers[index] = e.target.value;
                      setUserAnswers(newAnswers);
                    }}
                    className={`min-w-[150px] w-full rounded-md border-0 py-1.5 pl-1.5 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${colorInput(
                      index,
                      word
                    )}`}
                  ></textarea>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div></div>
              <div>
                <button
                  onClick={checkAnswers}
                  disabled={gameOver}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Verifica
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
