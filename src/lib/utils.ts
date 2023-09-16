import { Word } from "./types";

const shuffleArray = (array: Word[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const roundScore = (rawScore: number): string => {
  const roundScore = Math.round((rawScore + Number.EPSILON) * 10) / 10;

  return roundScore === Math.floor(roundScore)
    ? roundScore.toFixed()
    : roundScore.toFixed(1);
};

export { shuffleArray, roundScore };
