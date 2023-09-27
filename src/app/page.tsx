"use client";

import { getSeries, getWords } from "../lib/words";
import PlayIcon from "../components/shared/PlayIcon";
import { ChangeEvent, useEffect, useState } from "react";
import { Words } from "../lib/types";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>("all");
  const [selectedGameSerie, setSelectedGameSerie] =
    useState<string>("Alle reeksen");
  const [words, setWords] = useState<Words>([]);

  useEffect(() => {
    setWords(getWords(selectedOption));
  }, [selectedOption]);

  const handleOptionClick = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const option = event.target.options[selectedIndex];
    const displayText = option.text;
    setSelectedOption(event.target.value);
    setSelectedGameSerie(displayText);
  };

  const series = getSeries();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <div className="block w-full">
        <select
          onChange={handleOptionClick}
          className="block text-sm w-11/12 mx-auto max-w-[400px] mt-5 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
        >
          <option defaultValue="all" value="all">
            Alle reeksen
          </option>
          {series.map((serie) => (
            <option key={serie} value={serie}>
              Reeks {serie.replace("serie", "")}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 w-1/2 mx-auto max-w-[250px] bg-black rounded-lg shadow-lg mt-5 text-white items-center text-center">
          <div className="pt-1">Test</div>
          <div>
            <a href={`play/${selectedOption}`} className="p-0">
              <PlayIcon />
            </a>
          </div>
        </div>

        <div className="block w-11/12 mx-auto max-w-[600px] shadow-lg mt-5">
          <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Latijn
                </th>
                <th scope="col" className="px-6 py-3">
                  Middelste kolom
                </th>
                <th scope="col" className="px-6 py-3">
                  Nederlands
                </th>
              </tr>
            </thead>
            <tbody>
              {words.map((word, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="p-2 font-medium text-gray-900 dark:text-white"
                  >
                    {word.latin}
                  </th>
                  <td className="p-2">{word.middle}</td>
                  <td className="p-2">
                    {word.dutch.map((dutch) => (
                      <span key={dutch} className="block">
                        {dutch}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
