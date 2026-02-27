"use client";

import { useState, useCallback } from "react";
import BootScreen from "@/components/BootScreen";
import BreakpointTransition from "@/components/BreakpointTransition";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import CyberpunkCursor from "@/components/CyberpunkCursor";
import EasterEggTerminal from "@/components/EasterEggTerminal";
import SoundToggle from "@/components/SoundToggle";

export default function HomeClient() {
  const [booted, setBooted] = useState(false);
  const onBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      {!booted && <BootScreen onComplete={onBootComplete} />}

      {booted && (
        <>
          <BreakpointTransition />
          <Navbar visible />
          <NoiseOverlay />
          <CyberpunkCursor />
          <EasterEggTerminal />
          <SoundToggle />

          <main className="animate-[fadeIn_0.6s_ease_forwards]">
            <HeroSection active />
            <AboutSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
          </main>
        </>
      )}
    </>
  );
}
