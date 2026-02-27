"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const COMMANDS: Record<string, string> = {
  help: "Available commands: help, about, skills, secret, clear, exit",
  about: "APIWIT.EXE v2.0 — Frontend Developer & Creative Coder\nBased in Thailand. Loves React, animations, and dark themes.",
  skills: "▓▓▓▓▓▓▓▓▓░ React 90%\n▓▓▓▓▓▓▓▓░░ TypeScript 80%\n▓▓▓▓▓▓▓▓▓░ Next.js 90%\n▓▓▓▓▓▓▓░░░ GSAP 70%\n▓▓▓▓▓▓▓▓░░ Tailwind 80%",
  secret: "🎮 Konami code detected... just kidding.\nBut hey, you found the terminal! +100 nerd points.",
  "sudo hire me": "ACCESS GRANTED. Sending resume to your inbox... ✓",
  matrix: "Wake up, Neo... The Matrix has you.\nFollow the white rabbit. 🐇",
  hello: "Hello, World! Welcome to APIWIT.EXE terminal.",
};

export default function EasterEggTerminal() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef("");

  const triggerSequence = "``";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      keysRef.current += e.key;
      if (keysRef.current.length > 10) keysRef.current = keysRef.current.slice(-10);
      if (keysRef.current.endsWith(triggerSequence)) {
        setOpen((prev) => !prev);
        keysRef.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setHistory([]);
      return;
    }
    if (trimmed === "exit") {
      setOpen(false);
      return;
    }
    const output = COMMANDS[trimmed] ?? `Command not found: ${trimmed}. Type "help" for available commands.`;
    setHistory((prev) => [...prev, { cmd, output }]);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] mx-auto w-full max-w-2xl p-4">
      <div className="overflow-hidden border border-border-accent bg-bg-primary/95 shadow-[0_0_30px_var(--accent-glow)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-border-line px-4 py-2">
          <span className="font-mono text-xs text-accent">APIWIT.EXE — Terminal</span>
          <button
            onClick={() => setOpen(false)}
            className="font-mono text-xs text-text-dim transition-colors hover:text-accent"
          >
            [X]
          </button>
        </div>

        <div ref={scrollRef} className="h-64 overflow-y-auto p-4">
          <div className="font-mono text-xs text-text-dim">
            Welcome to APIWIT.EXE terminal. Type &quot;help&quot; for commands.
          </div>
          {history.map((item, i) => (
            <div key={i} className="mt-3">
              <div className="font-mono text-xs">
                <span className="text-accent">&gt; </span>
                <span className="text-text-primary">{item.cmd}</span>
              </div>
              <pre className="mt-1 whitespace-pre-wrap font-mono text-xs leading-relaxed text-text-secondary">
                {item.output}
              </pre>
            </div>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            runCommand(input);
            setInput("");
          }}
          className="flex items-center border-t border-border-line px-4 py-3"
        >
          <span className="font-mono text-xs text-accent">&gt;&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent font-mono text-xs text-text-primary caret-accent outline-none"
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
