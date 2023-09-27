"use client";

import { useEffect, useState } from "react";
import { Word, Words } from "@/src/lib/types";
import { roundScore, shuffleArray } from "@/src/lib/utils";
import Image from "next/image";
import { getWords } from "@/src/lib/words";

export default function Home({ params }: { params: { series: string } }) {
  const [words, setWords] = useState<Word[]>([]);
  const [translationAnswers, setTranslationAnswers] = useState<string[]>([]);
  const [pluralAnswers, setPluralAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(10);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  /**
   *  Fetch and shuffle the words when the component mounts
   */
  useEffect(() => {
    const selectedWords = getWords(params.series);
    setMaxScore(Math.min(10, selectedWords.length));
    const shuffledWords = shuffleArray(selectedWords);
    setWords(shuffledWords.slice(0, maxScore)); // Select max 10 random words
    setLoading(false);
  }, [maxScore, params]);

  /**  Function to check the user's answers and calculate the score */
  const checkAnswers = () => {
    const newScore = words.reduce((acc, word, index) => {
      // Split the user's answers by newline and trim any leading/trailing whitespace
      const translationAnswerLines =
        translationAnswers[index]
          ?.split("\n")
          .map((line) => line.trim().toLowerCase()) ?? [];

      const scorePerRightAnswer = 1 / (word.dutch.length + 1);

      // Calculate the score for the current word
      let wordScore = word.dutch.reduce((score, dutchWord) => {
        if (translationAnswerLines.includes(dutchWord.toLowerCase())) {
          // Increment the score by 1 divided by the number of Dutch words
          return score + scorePerRightAnswer;
        }
        return score;
      }, 0);

      // Check the plural answer
      if (
        pluralAnswers[index]?.toLowerCase().trim() ===
        word.middle?.toLowerCase().trim()
      ) {
        wordScore += scorePerRightAnswer; // Add 1 point for correct plural answer
      }

      return acc + wordScore;
    }, 0);

    setScore(newScore);
    setGameOver(true);
  };

  const allTranslationsCorrect = (index: number, word: Words[number]) => {
    const userAnswerLines = translationAnswers[index]
      ?.split("\n")
      .map((line) => line.trim().toLowerCase());

    if (userAnswerLines?.length !== word.dutch.length) {
      return false;
    }

    return userAnswerLines.every((userAnswer) =>
      word.dutch.some((dutchWord) => dutchWord.toLowerCase() === userAnswer)
    );
  };

  const colorTranslationInput = (index: number, word: Words[number]) => {
    if (!gameOver) {
      return "";
    }

    return allTranslationsCorrect(index, word) ? "bg-green-100" : "bg-red-100";
  };

  const colorPluralInput = (index: number, word: Words[number]) => {
    if (!gameOver) {
      return "";
    }

    return word.middle !== pluralAnswers[index] ? "bg-red-100" : "bg-green-100";
  };

  return (
    <main className="flex min-h-screen flex-col w-screen items-center justify-between p-3 text-xs">
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
        <div className="w-11/12 mx-auto max-w-[800px]">
          {/* {words.map((word, index) => (
            <div
              key={index}
              className={`${index + 1 === currentQuestion ? "" : "hidden"}`}
            >
              <div className="flex flex-col items-start w-full">
                <h4 className="mt-10 text-lg text-white/60">
                  Woord 1 op {maxScore}
                </h4>
                <div className="mt-1 text-xl text-white">
                  {word.latin}
                </div>
              </div>
              <button className="w-[49%] py-3 bg-indigo-600 rounded-lg">
                Vorige
              </button>
              <button className="w-[49%] py-3 bg-indigo-600 rounded-lg">
                Volgende
              </button>
            </div>
          ))} */}

          {gameOver && (
            <div className="grid grid-cols-1 gap-4 text-center mt-1 mb-2 text-xl italic underline">
              <h1>
                Je score: {roundScore(score)} op {maxScore}
              </h1>
            </div>
          )}
          <div className="grid grid-cols-1">
            {words.map((word, index) => (
              <div key={index} className="">
                <div className="grid grid-cols-1 gap-1 mb-4">
                  <h1 className="text-sm underline underline-offset-4 font-bold">
                    {index + 1}. {word.latin}
                  </h1>
                  <label className="block text-xs font-normal leading-6 text-white-900 pr-1">
                    Nederlands?
                  </label>

                  {gameOver && !allTranslationsCorrect(index, word) && (
                    <div className="text-red-500 italic">
                      {word.dutch.map((dutchWord, dutchIndex) => (
                        <div
                          key={dutchIndex}
                          className={`text-${colorTranslationInput(
                            index,
                            word
                          )}`}
                        >
                          {dutchWord}
                        </div>
                      ))}
                    </div>
                  )}

                  <textarea
                    value={translationAnswers[index] || ""}
                    rows={2}
                    onChange={(e) => {
                      const newAnswers = [...translationAnswers];
                      newAnswers[index] = e.target.value;
                      setTranslationAnswers(newAnswers);
                    }}
                    className={`min-w-[150px] w-full rounded-md border-0 py-1.5 pl-1.5 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${colorTranslationInput(
                      index,
                      word
                    )}`}
                  ></textarea>

                  <div className="mt-2">
                    <label className="block text-xs font-medium leading-6 text-white-900">
                      Middelste kolom?
                    </label>
                    {gameOver && word.middle !== pluralAnswers[index] && (
                      <div className="text-red-500 italic">
                        <div
                          className={`text-${colorPluralInput(index, word)}`}
                        >
                          {word.middle ?? "Geen meervoud voor die woord"}
                        </div>
                      </div>
                    )}
                    <input
                      type="text"
                      className={`min-w-[150px] w-full rounded-md border-0 py-1.5 pl-1.5 pr-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${colorPluralInput(
                        index,
                        word
                      )}`}
                      value={pluralAnswers[index] || ""}
                      onChange={(e) => {
                        const newAnswers = [...pluralAnswers];
                        newAnswers[index] = e.target.value;
                        setPluralAnswers(newAnswers);
                      }}
                      readOnly={gameOver}
                    />
                  </div>
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
