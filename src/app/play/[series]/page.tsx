"use client";

import { useEffect, useState } from "react";
import data from "../../../lib/words.json";
import { Word, Words } from "@/src/lib/types";
import { shuffleArray } from "@/src/lib/utils";
import Image from "next/image";
import { getWords } from "@/src/lib/words";

export default function Home({ params }: { params: { series: string } }) {
  const [words, setWords] = useState<Word[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(10);
  const [loading, setLoading] = useState(true);

  /**
   *  Fetch and shuffle the words when the component mounts
   */
  useEffect(() => {
    const selectedWords = getWords(params.series);
    setMaxScore(Math.min(10, selectedWords.length));
    const shuffledWords = shuffleArray(selectedWords);
    setWords(shuffledWords.slice(0, maxScore)); // Select max 10 random words
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

  const isAllCorrect = (index: number, word: Words[number]) => {
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

  const colorInput = (index: number, word: Words[number]) => {
    if (!gameOver) {
      return "";
    }

    return isAllCorrect(index, word) ? "bg-green-100" : "bg-red-100";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 text-xs">
      {loading ? (
        <div className="text-center">
          <Image
            className="h-50 w-50"
            src="/spinner.svg"
            alt="Loading"
            width="50"
            height="50"
          />
        </div>
      ) : (
        <div>
          {gameOver && (
            <div className="grid grid-cols-1 gap-4 text-center mt-1 mb-2 text-xl italic underline">
              <h1>Je score: {score} op {maxScore}</h1>
            </div>
          )}
          <div className="grid grid-cols-1">
            {words.map((word, index) => (
              <div key={index} className="">
                <div className="grid grid-cols-1 gap-1 mb-4">
                  <label className="block text-sm font-medium leading-6 text-white-900 pr-1">
                    {index + 1}) {word.latin}
                  </label>

                  {gameOver && !isAllCorrect(index, word) && (
                    <div className="text-red-500 italic">
                      {word.dutch.map((dutchWord, dutchIndex) => (
                        <div
                          key={dutchIndex}
                          className={`text-${colorInput(index, word)}`}
                        >
                          {dutchWord}
                        </div>
                      ))}
                    </div>
                  )}

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
