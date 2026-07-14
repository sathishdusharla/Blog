import React, { useState, useEffect, useRef } from 'react';
import { X, Minimize2, Maximize2, Terminal as TermIcon } from 'lucide-react';
import './Terminal.css';
import { projects } from '../data/projects';
import { articles } from '../data/articles';

interface TerminalProps {
  onClose: () => void;
  onNavigate: (section: string) => void;
}

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose, onNavigate }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHacking, setIsHacking] = useState(false);
  const [hackOutput, setHackOutput] = useState<string[]>([]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandsList = ['help', 'about', 'projects', 'posts', 'neofetch', 'contact', 'clear', 'gui', 'hack', 'skills'];
  
  const getSuggestion = () => {
    if (!input) return '';
    const match = commandsList.find(
      (cmd) => cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase()
    );
    return match ? match.slice(input.length) : '';
  };
  
  const suggestion = getSuggestion();

  // Focus terminal input automatically on mount
  useEffect(() => {
    focusInput();
    printWelcomeMessage();
  }, []);

  // Scroll to bottom of terminal when history updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isHacking, hackOutput]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const printWelcomeMessage = () => {
    setHistory([
      {
        command: 'system-init',
        output: (
          <div className="terminal-welcome">
            <p className="neon-text-green">SD_DEVLOG [Version 1.0.0]</p>
            <p className="neon-text-cyan">Console initialized successfully. Ready for instructions.</p>
            <p>Type <span className="neon-text-yellow">"help"</span> to view a list of available commands.</p>
            <p>Type <span className="neon-text-purple">"gui"</span> to exit terminal and return to graphical interface.</p>
            <p className="welcome-divider">--------------------------------------------------</p>
          </div>
        )
      }
    ]);
  };

  // Matrix-like hacking animation
  const runHackCommand = () => {
    setIsHacking(true);
    setHackOutput([]);
    
    const hackSteps = [
      'Establishing connection to secure node...',
      'Bypassing host firewall [PORT 8080]... SUCCESS',
      'Injecting SQL payload into mainframe...',
      'Cracking SSH keys [SHA-256]... 20%... 55%... 90%... DONE',
      'Retrieving database tables...',
      'DECRYPTING ACCESS TOKEN: d3v10g_2026_g3m1n1_53cr3t',
      'ACCESS GRANTED.',
      'Initializing core diagnostic subroutines...',
      'Downloading secret schematics (projects, blogs, skills)...',
      'System bypassed. SD_DEVLOG is now under your control. 😎'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < hackSteps.length) {
        setHackOutput((prev) => [...prev, `[system@devlog:~]$ ${hackSteps[currentStep]}`]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsHacking(false);
          setHistory((prev) => [
            ...prev,
            {
              command: 'hack',
              output: (
                <div className="terminal-hack-success">
                  <pre className="hack-ascii-art">
{`
 _   _          _  __      _____  
| | | |   /\\   | |/ /     |  __ \\ 
| |_| |  /  \\  | ' /      | |  | |
|  _  | / /\\ \\ |  <       | |  | |
| | | |/ ____ \\| . \\      | |__| |
|_| |_/_/    \\_\\_|\\_\\     |_____/ 
`}
                  </pre>
                  <p className="neon-text-green">Root access established. System diagnostics complete.</p>
                </div>
              )
            }
          ]);
        }, 800);
      }
    }, 450);
  };

  const handleCommand = (cmdStr: string) => {
    const trimmedCmd = cmdStr.trim().toLowerCase();
    const args = trimmedCmd.split(' ');
    const commandName = args[0];

    if (!commandName) return;

    let output: React.ReactNode = null;

    switch (commandName) {
      case 'help':
        output = (
          <div className="cmd-output-help">
            <p className="output-header">Available Commands:</p>
            <table className="terminal-table">
              <tbody>
                <tr>
                  <td className="neon-text-cyan">about</td>
                  <td>Display technical profile and biography</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">projects</td>
                  <td>List open source portfolio projects</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">posts</td>
                  <td>List published blog articles</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">skills</td>
                  <td>List developer technical stack and capabilities</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">neofetch</td>
                  <td>Display devlog system specs and retro ASCII branding</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">contact</td>
                  <td>Display social media and contact details</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">theme</td>
                  <td>Toggle between light and dark mode colors</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">clear</td>
                  <td>Clear the terminal output screen</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">gui</td>
                  <td>Exit developer terminal and return to normal website views</td>
                </tr>
                <tr>
                  <td className="neon-text-cyan">hack</td>
                  <td>Bypass security firewall (Easter Egg!)</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="cmd-output-about">
            <p className="neon-text-purple">FILE: developer_profile.json</p>
            <p><strong>Name:</strong> Sathish Dusharla</p>
            <p><strong>Role:</strong> Senior Software Engineer & Creative Graphic Designer</p>
            <p><strong>Philosophy:</strong> "Building highly optimized system architectures and wrapping them in visually breathtaking interfaces. Beauty is in the shaders, strength is in the compiler."</p>
            <p>Sathish specializes in high-performance web graphics (WebGL, WebGPU, Rust compiling to WebAssembly), system programming (Rust OS kernels), and advanced React client applications. He has 4+ years of creating custom components and interactive interfaces that bridge creative arts and engineering.</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="cmd-output-projects">
            <p className="output-header">Active Repositories & Projects:</p>
            {projects.map((proj) => (
              <div key={proj.id} className="terminal-project-item">
                <p>
                  <span className="neon-text-cyan">🚀 {proj.title}</span> — <span className="project-category">[{proj.category}]</span>
                </p>
                <p className="project-desc">{proj.description}</p>
                <p className="project-meta">
                  Tech: {proj.tech.join(', ')} | Stars: ★{proj.stats.stars || 0}
                </p>
              </div>
            ))}
            <p className="cli-hint">Type "gui" and head to the Projects page to launch live interactive demos!</p>
          </div>
        );
        break;

      case 'posts':
        output = (
          <div className="cmd-output-posts">
            <p className="output-header">Published Articles:</p>
            {articles.map((art) => (
              <div key={art.id} className="terminal-post-item" onClick={() => { onNavigate(`article-${art.id}`); onClose(); }}>
                <p>
                  <span className="neon-text-yellow">📖 {art.title}</span> — <span className="post-date">({art.date})</span>
                </p>
                <p className="post-excerpt">{art.excerpt}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="cmd-output-skills">
            <p className="output-header">Developer Capabilities Grid:</p>
            <table className="terminal-table">
              <tbody>
                <tr>
                  <td className="neon-text-green">Languages</td>
                  <td>TypeScript/JavaScript, Rust, GLSL/WGSL (Shaders), HTML/CSS, C++, Python, Shell</td>
                </tr>
                <tr>
                  <td className="neon-text-green">Frameworks</td>
                  <td>React (Next.js, Vite), Node.js, WebGL/Three.js, Web Audio API, TensorFlow.js</td>
                </tr>
                <tr>
                  <td className="neon-text-green">Systems / DevOps</td>
                  <td>Linux Kernel programming, Docker, AWS, Git, Web Workers, CI/CD, Makefile</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
        break;

      case 'neofetch':
        const sysTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        output = (
          <div className="cmd-output-neofetch">
            <pre className="neofetch-ascii">
{`
  ____ ___    ___  ____ _  _ _    ____ ____ 
  [__  |  \\   |  \\ |___ |  | |    |  | | __ 
  ___] |__/   |__/ |___  \\/  |___ |__| |__] 
`}
            </pre>
            <div className="neofetch-info">
              <p className="neon-text-purple">sathish@sd-devlog</p>
              <p>------------------</p>
              <p><span className="info-label">OS:</span> macOS Sequoia 15.0</p>
              <p><span className="info-label">Shell:</span> zsh 5.9 (SD_DEVLOG Custom Terminal)</p>
              <p><span className="info-label">Visual Engine:</span> WebGL 2.0 / WebGPU Enabled</p>
              <p><span className="info-label">Resolution:</span> {window.innerWidth}x{window.innerHeight} viewport</p>
              <p><span className="info-label">Theme Mode:</span> {sysTheme.toUpperCase()}</p>
              <p><span className="info-label">CPU:</span> Apple M3 Max (16 Cores)</p>
              <p><span className="info-label">Graphics Palette:</span> Red, Deep Black, Pure White</p>
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="cmd-output-contact">
            <p className="output-header">Connection Channels:</p>
            <p><strong>GitHub:</strong> <a href="https://github.com" target="_blank" rel="noreferrer" className="neon-text-cyan">github.com/sathishdusharla</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="neon-text-cyan">linkedin.com/in/sathishdusharla</a></p>
            <p><strong>Email:</strong> <span className="neon-text-yellow">sathish@sddevlog.com</span></p>
            <p><strong>HQ:</strong> Hyderabad, India 🇮🇳</p>
          </div>
        );
        break;

      case 'theme':
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', targetTheme);
        output = <p>Theme changed to <span className="neon-text-cyan">{targetTheme.toUpperCase()}</span> successfully.</p>;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'gui':
        onClose();
        return;

      case 'hack':
        runHackCommand();
        setInput('');
        return;

      default:
        output = (
          <p className="neon-text-red">
            Command not found: "{commandName}". Type "help" to see available instructions.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmdStr, output }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = commandsList.find(
        (cmd) => cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase()
      );
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div
      className={`terminal-container glass-card ${isFullscreen ? 'fullscreen' : ''}`}
      onClick={focusInput}
    >
      <div className="terminal-titlebar">
        <div className="titlebar-left">
          <TermIcon size={16} className="titlebar-icon" />
          <span className="titlebar-title">sd-devlog-console -- zsh</span>
        </div>
        <div className="titlebar-controls">
          <button
            className="control-btn maximize"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(!isFullscreen);
            }}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            className="control-btn close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close terminal"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="terminal-screen">
        {!isHacking &&
          history.map((item, idx) => (
            <div key={idx} className="terminal-history-item">
              {item.command !== 'system-init' && (
                <div className="terminal-prompt-line">
                  <span className="prompt-symbol">λ guest@devlog:~$</span>
                  <span className="prompt-input-text">{item.command}</span>
                </div>
              )}
              <div className="terminal-output-line">{item.output}</div>
            </div>
          ))}

        {isHacking && (
          <div className="terminal-hacking-screen">
            {hackOutput.map((line, idx) => (
              <p key={idx} className="neon-text-green hacking-line">
                {line}
              </p>
            ))}
            <span className="cursor blink-fast">_</span>
          </div>
        )}

        {!isHacking && (
          <div className="terminal-input-row">
            <span className="prompt-symbol">λ guest@devlog:~$</span>
            <div className="terminal-input-container" style={{ position: 'relative', display: 'inline-flex', flex: 1 }}>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                aria-label="Terminal command input"
                style={{ caretColor: 'transparent', width: '100%', background: 'transparent', border: 'none', outline: 'none' }}
              />
              {suggestion && (
                <div className="terminal-ghost-text" style={{ pointerEvents: 'none', opacity: 0.35, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', position: 'absolute', left: '0', top: '0', zIndex: 1, padding: '0', display: 'flex', whiteSpace: 'pre', lineHeight: '1.5' }}>
                  <span style={{ color: 'transparent' }}>{input}</span>
                  <span style={{ color: 'var(--color-text-main)' }}>{suggestion}</span>
                </div>
              )}
            </div>
            <span className="cursor">_</span>
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
export default Terminal;
