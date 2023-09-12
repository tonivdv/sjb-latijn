import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href="/play">
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
          <div className="shrink-0">
            <Image className="h-12 w-12" src="/latin.svg" alt="ChitChat Logo" width="12" height="12" />
          </div>
          <div>
            <div className="text-xl font-medium text-black">
              Test je woordjes
            </div>
          </div>
        </div>
      </a>
    </main>
  );
}
