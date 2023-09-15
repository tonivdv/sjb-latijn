import Image from "next/image";
import { getSeries } from "../lib/words";

export default function Home() {
  const series = getSeries();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1">
      <div className="grid grid-cols-1 gap-4">
        <a href={`play/all`}>
          <div className="m-3 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div className="shrink-0">
              <Image
                className="h-12 w-12"
                src="/latin.svg"
                alt="ChitChat Logo"
                width="12"
                height="12"
              />
            </div>
            <div>
              <div className="text-xs font-medium text-black">
                Alle woorden
              </div>
            </div>
          </div>
        </a>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {series.map((serie) => (
              <a key={serie} href={`play/${serie}`}>
                <div className="mb-3 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
                  <div className="shrink-0">
                    <Image
                      className="h-12 w-12"
                      src="/latin.svg"
                      alt="ChitChat Logo"
                      width="12"
                      height="12"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-black">
                      {serie}
                    </div>
                  </div>
                </div>
              </a>
          ))}
        </div>
      </div>
    </main>
  );
}
