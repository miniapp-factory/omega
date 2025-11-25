import { description, title } from "@/lib/metadata";
import BeatButtons from "@/components/beat-buttons";
import { generateMetadata } from "@/lib/farcaster-embed";

export { generateMetadata };

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return (
    <main className="flex flex-col gap-3 px-4 grow h-full">
      <span className="text-2xl">{title}</span>
      <span className="text-muted-foreground">{description}</span>
      <BeatButtons />
    </main>
  );
}
