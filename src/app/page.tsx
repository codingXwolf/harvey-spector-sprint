import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <h1 className={`${dmSans.className} text-yellow-400 text-6xl font-bold tracking-widest uppercase`}>
        Harvey Specter
      </h1>
    </main>
  );
}
