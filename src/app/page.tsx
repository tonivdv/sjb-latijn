import Image from "next/image";
import { getSeries } from "../lib/words";
import PlayIcon from "../components/shared/PlayIcon";
import ListIcon from "../components/shared/ListIcon";

export default function Home() {
  const series = getSeries();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <div className="grid grid-cols-1 gap-4 w-2/4 items-center justify-between">
        <div className="bg-gray-200 rounded-xl shadow-lg">
          <h1 className="text-white text-sm font-bold text-center p-2 bg-black rounded-t-xl">
            Alle Woorden
          </h1>
          <div className="grid grid-cols-2 text-center items-center p-2">
            <a href={`play/all`} className="p-1">
              <PlayIcon />
            </a>

            <a href={`list/all`} className="p-1">
              <ListIcon />
            </a>
          </div>
          <div className="grid grid-cols-2 text-center pb-2">
            <span className="text-black text-xs italic">Speel</span>
            <span className="text-black text-xs italic">Lijst</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {series.map((serie) => (
            <div key={serie} className="bg-gray-200 rounded-xl shadow-lg">
              <h1 className="text-white text-sm font-bold text-center p-2 bg-black rounded-t-xl">
                {serie}
              </h1>
              <div className="grid grid-cols-2 text-center items-center p-2">
                <a href={`play/${serie}`} className="p-1">
                  <PlayIcon />
                </a>

                <a href={`list/${serie}`} className="p-1">
                  <ListIcon />
                </a>
              </div>
              <div className="grid grid-cols-2 text-center pb-2">
                <span className="text-black text-xs italic">Speel</span>
                <span className="text-black text-xs italic">Lijst</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
