import _wordCollections from "../lib/words.json";
import { Words } from "./types";

type WordCollection = Record<string, Words>;

const wordCollections = _wordCollections as WordCollection;

const getWords = (collection: string = "all"): Words => {
  if (collection === "all") {
    return Object.values(wordCollections).flat();
  }

  if (!(collection in wordCollections)) {
    return [];
  }

  return wordCollections[collection];
};

const getSeries = (): string[] => {
  return Object.keys(wordCollections);
};

export { getWords, getSeries };
