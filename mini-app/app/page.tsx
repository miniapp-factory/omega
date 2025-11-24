import { description, title } from "@/lib/metadata";
import BeatButtons from "@/components/beat-buttons";
import { generateMetadata } from "@/lib/farcaster-embed";

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <span className="text-2xl">{title}</span>
      <span className="text-muted-foreground">{description}</span>
      <div className="bg-gray-900 text-green-400 p-4 rounded mb-4 w-full h-[50vh] overflow-auto">
        <p className="font-mono">Terminal output will appear here.</p>
      </div>
      <BeatButtons />
    </main>
  );
}
