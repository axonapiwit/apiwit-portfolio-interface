"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PROJECTS } from "@/data/projects";

const COMMAND_NAMES = [
  "help", "about", "skills", "secret", "whoami", "resume",
  "ls projects", "date", "neofetch", "theme", "matrix",
  "sudo hire me", "hello", "clear", "exit",
];

const NEOFETCH = `
  ██████╗ ██████╗ ██╗██╗    ██╗██╗████████╗
  ██╔══██╗██╔══██╗██║██║    ██║██║╚══██╔══╝
  ███████║██████╔╝██║██║ █╗ ██║██║   ██║
  ██╔══██║██╔═══╝ ██║██║███╗██║██║   ██║
  ██║  ██║██║     ██║╚███╔███╔╝██║   ██║
  ╚═╝  ╚═╝╚═╝     ╚═╝ ╚══╝╚══╝ ╚═╝   ╚═╝
  ─────────────────────────────────
  OS:      APIWIT.EXE v2.0
  Role:    Frontend Developer @ Maxion Tech
  Edu:     Software Engineering, U. of Phayao
  Stack:   React, Next.js, TypeScript, NestJS
  Style:   TailwindCSS, SCSS, MUI
  Tools:   Git, Docker, Trello, Airtable
  Theme:   Cyberpunk Dark Red
  Uptime:  ${new Date().getFullYear() - 2021}+ years coding`;

const WHOAMI = `{
  "name": "Apiwit Thammachai (Aont)",
  "role": "Frontend Developer",
  "company": "Maxion Tech",
  "education": "Software Engineering — University of Phayao (2019-2022)",
  "location": "Thailand",
  "skills": ["React", "Next.js", "TypeScript", "TailwindCSS", "NestJS", "Firebase"],
  "achievements": ["🥇 1st Place — Hackathon By 20Scoop CNX 2021", "🥈 2nd Place — Hanns Hackathon 2021"],
  "fun_fact": "This terminal is an easter egg 🥚"
}`;

function getProjectList() {
  return PROJECTS.map(
    (p) => `  ${p.featured ? "★" : "○"} ${p.id.padEnd(22)} [${p.tags.join(", ")}]`,
  ).join("\n");
}

function resolveCommand(trimmed: string): string | null {
  if (trimmed === "help")
    return `Available commands:\n\n  help          Show this message\n  about         About APIWIT.EXE\n  skills        Skill levels\n  whoami        Developer profile (JSON)\n  resume        Download resume\n  ls projects   List all projects\n  date          Current date & time\n  neofetch      System info\n  theme <color> Change accent (red/green/blue/purple)\n  secret        ???\n  matrix        Follow the white rabbit\n  hello         Say hi\n  clear         Clear terminal\n  exit          Close terminal`;
  if (trimmed === "about")
    return "APIWIT.EXE v2.0 — Frontend Developer @ Maxion Tech\nSoftware Engineering grad from University of Phayao.\nBased in Bangkok, Thailand. Seeking new challenges to level up.";
  if (trimmed === "skills")
    return "▓▓▓▓▓▓▓▓▓░ React        90%\n▓▓▓▓▓▓▓▓░░ TypeScript   80%\n▓▓▓▓▓▓▓▓▓░ Next.js      90%\n▓▓▓▓▓▓▓▓░░ TailwindCSS  80%\n▓▓▓▓▓▓▓░░░ NestJS       70%\n▓▓▓▓▓▓░░░░ Firebase     60%";
  if (trimmed === "secret")
    return "🎮 Konami code detected... just kidding.\nBut hey, you found the terminal! +100 nerd points.";
  if (trimmed === "sudo hire me")
    return "ACCESS GRANTED. Sending resume to your inbox... ✓";
  if (trimmed === "matrix")
    return "Wake up, Neo... The Matrix has you.\nFollow the white rabbit. 🐇";
  if (trimmed === "hello")
    return "Hello, World! Welcome to APIWIT.EXE terminal.";
  if (trimmed === "whoami") return WHOAMI;
  if (trimmed === "neofetch") return NEOFETCH;
  if (trimmed === "date") return `> ${new Date().toLocaleString()}`;
  if (trimmed === "ls projects") return `PROJECTS/\n${"─".repeat(40)}\n${getProjectList()}`;
  if (trimmed === "resume") return "__RESUME__";
  if (trimmed.startsWith("theme")) return "__THEME__";
  return null;
}

const THEMES: Record<string, string> = {
  red: "#ff2d2d",
  green: "#39ff14",
  blue: "#00d4ff",
  purple: "#bf5af2",
};

export default function EasterEggTerminal() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const keysRef = useRef("");
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // `` shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      keysRef.current += e.key;
      if (keysRef.current.length > 10)
        keysRef.current = keysRef.current.slice(-10);
      if (keysRef.current.endsWith("``")) {
        setOpen((prev) => !prev);
        keysRef.current = "";
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // auto-hint after 30s idle
  useEffect(() => {
    const reset = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      setShowHint(false);
      idleTimer.current = setTimeout(() => setShowHint(true), 30000);
    };
    reset();
    const events = ["mousemove", "scroll", "keydown", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);
    if (trimmed === "clear") { setHistory([]); return; }
    if (trimmed === "exit") { setOpen(false); return; }

    const result = resolveCommand(trimmed);
    if (result === "__RESUME__") {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "";
      a.click();
      setHistory((prev) => [...prev, { cmd, output: "Downloading resume.pdf... ✓" }]);
      return;
    }
    if (result === "__THEME__") {
      const color = trimmed.split(" ")[1];
      if (color && THEMES[color]) {
        document.documentElement.style.setProperty("--accent", THEMES[color]);
        document.documentElement.style.setProperty(
          "--accent-glow",
          THEMES[color] + "26",
        );
        setHistory((prev) => [
          ...prev,
          { cmd, output: `Theme changed to ${color}. Refresh to reset.` },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { cmd, output: `Usage: theme <${Object.keys(THEMES).join("|")}>` },
        ]);
      }
      return;
    }
    const output =
      result ?? `Command not found: ${trimmed}. Type "help" for available commands.`;
    setHistory((prev) => [...prev, { cmd, output }]);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (!val) return;
      const match = COMMAND_NAMES.find((c) => c.startsWith(val));
      if (match) setInput(match);
      return;
    }
    // Command history ↑↓
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const next = historyIdx + 1;
      if (next >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  return (
    <>
      {/* >_ hint button — bottom-left */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setShowHint(false); }}
          className="fixed bottom-6 left-6 z-100 flex h-10 w-10 items-center justify-center border border-border-line bg-bg-primary/80 font-mono text-sm text-text-dim backdrop-blur-sm transition-all hover:border-border-accent hover:text-accent hover:shadow-[0_0_12px_var(--accent-glow)]"
          aria-label="Open terminal"
          title={'Press `` to toggle terminal'}
          data-cursor="link"
        >
          <span className="animate-pulse">&gt;_</span>
        </button>
      )}

      {/* idle auto-hint */}
      {showHint && !open && (
        <div className="fixed bottom-18 left-6 z-99 animate-[fadeIn_0.4s_ease] font-mono text-xs text-text-dim/60">
          type <span className="text-accent/60">``</span> to hack...
        </div>
      )}

      {/* terminal panel */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 z-200 mx-auto w-full max-w-2xl p-4">
          <div className="overflow-hidden border border-border-accent bg-bg-primary/95 shadow-[0_0_30px_var(--accent-glow)] backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-border-line px-4 py-2">
              <span className="font-mono text-xs text-accent">
                APIWIT.EXE — Terminal
              </span>
              <button
                onClick={() => setOpen(false)}
                className="font-mono text-xs text-text-dim transition-colors hover:text-accent"
              >
                [X]
              </button>
            </div>

            <div ref={scrollRef} className="cyber-scrollbar h-64 overflow-y-auto p-4">
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
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent font-mono text-xs text-text-primary caret-accent outline-none"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
