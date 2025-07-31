import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import SpaceEffects from "@/components/effects/SpaceEffects";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-full w-full relative">
      {/* Космические эффекты */}
      <SpaceEffects />
      
      {/* Основной контент */}
      <div className="flex flex-col gap-20 relative z-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
      </div>
    </main>
  );
}
