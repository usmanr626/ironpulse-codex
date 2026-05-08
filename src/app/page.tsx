import { BuiltWithCodex } from "@/components/BuiltWithCodex";
import { EngineAssembly } from "@/components/EngineAssembly";
import { FinalCTA } from "@/components/FinalCTA";
import { HeroSection } from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-graphite-950 text-zinc-50">
      <HeroSection />
      <EngineAssembly />
      <BuiltWithCodex />
      <FinalCTA />
    </main>
  );
}
