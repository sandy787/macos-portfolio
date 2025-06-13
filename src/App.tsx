import React, { useState } from 'react';
import './App.css';
import { MenuBar } from './components/MenuBar';
import { Dock } from './components/Dock';
import { DesktopIcons } from './components/DesktopIcons';
import { AppWindow } from './components/AppWindow';
import { WeatherWidget } from './components/WeatherWidget';

const fakeFS: { [key: string]: string[] } = {
  '/': ['home', 'projects', 'about.txt'],
  '/home': ['resume.pdf', 'skills.txt', 'contact.txt'],
  '/projects': ['project1.txt', 'project2.txt'],
};
const fakeUser = 'prajwal';
const fakeHome = '/home';

const TerminalWindow: React.FC = () => {
  const [lines, setLines] = useState<React.ReactNode[]>([
    <span style={{ color: '#6f6' }}>Type 'help' for commands.</span>,
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState(fakeHome);
  const logo = '💻';

  const print = (text: React.ReactNode) => setLines((prev) => [...prev, text]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const base = args[0].toLowerCase();
    switch (base) {
      case 'hello':
        print(<span style={{ color: '#6f6' }}>Hello, user! 👋</span>);
        break;
      case 'date':
        print(<span style={{ color: '#6f6' }}>{new Date().toString()}</span>);
        break;
      case 'joke':
        print(<span style={{ color: '#6f6' }}>Why do programmers prefer dark mode? Because light attracts bugs!</span>);
        break;
      case 'whoami':
        print(<span style={{ color: '#6f6' }}>{fakeUser}</span>);
        break;
      case 'pwd':
        print(<span style={{ color: '#6f6' }}>{cwd}</span>);
        break;
      case 'ls': {
        const dir = fakeFS[cwd] || [];
        print(
          <span>
            {dir.map((item: string, i: number) =>
              item.includes('.') ? (
                <span key={i} style={{ color: '#6f6', marginRight: 8 }}>{item}</span>
              ) : (
                <span key={i} style={{ color: '#39f', marginRight: 8 }}>{item}/</span>
              )
            )}
          </span>
        );
        break;
      }
      case 'cd': {
        const target = args[1] || '';
        if (target === '' || target === '~') {
          setCwd(fakeHome);
        } else if (target === '..') {
          if (cwd !== '/') {
            setCwd(cwd.substring(0, cwd.lastIndexOf('/')) || '/');
          }
        } else {
          let newPath = target.startsWith('/') ? target : (cwd === '/' ? '/' : cwd + '/') + target;
          newPath = newPath.replace(/\\/g, '/');
          if (fakeFS[newPath]) {
            setCwd(newPath);
          } else {
            print(<span style={{ color: '#f66' }}>cd: no such file or directory: {target}</span>);
          }
        }
        break;
      }
      case 'echo':
        print(<span style={{ color: '#6f6' }}>{args.slice(1).join(' ')}</span>);
        break;
      case 'clear':
        setLines([]);
        return;
      case 'help':
        print(<span style={{ color: '#6f6' }}>Available commands: hello, date, joke, whoami, pwd, ls, cd, echo, clear, help</span>);
        break;
      default:
        print(<span style={{ color: '#f66' }}>Unknown command: {base}</span>);
    }
  };

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setLines((prev) => [
        ...prev,
        <span>
          <span style={{ color: '#ff6', fontWeight: 600 }}>{fakeUser}@macos</span>
          <span style={{ color: '#6cf' }}>{cwd} $</span> {input}
        </span>,
      ]);
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div style={{ background: '#111', color: '#6f6', height: '100%', width: '100%', fontFamily: 'monospace', padding: 0, display: 'flex', flexDirection: 'column', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ fontWeight: 'bold', padding: '12px 18px 0 18px', color: '#fff', fontSize: 20, letterSpacing: 1 }}>{logo} Terminal</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 18px 0 18px', background: '#111' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ lineHeight: 1.6 }}>{line}</div>
        ))}
      </div>
      <form onSubmit={handleInput} style={{ display: 'flex', alignItems: 'center', padding: '8px 18px', background: '#111', borderTop: '1px solid #222' }}>
        <span style={{ color: '#ff6', marginRight: 4, fontWeight: 600 }}>{fakeUser}@macos</span>
        <span style={{ color: '#6cf', marginRight: 4 }}>{cwd} $</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, background: 'black', color: '#6f6', border: 'none', outline: 'none', fontFamily: 'monospace', fontSize: 16 }}
          autoFocus
        />
      </form>
    </div>
  );
};

const APP_CONTENT: Record<string, React.ReactNode> = {
  'Projects': <div>Project list goes here.</div>,
  'About Me': (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      <img src="/PrajwalPhoto.png" alt="Prajwal Sanap" style={{ width: '150px', height: '150px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
      <div>
        <p style={{ margin: 0 }}>
          Hi, I'm Prajwal — a passionate and curious tech enthusiast with a deep interest in software development, especially in the Web and AI space. I thrive at the intersection of creativity and logic, where I love turning ideas into impactful applications. Over the years, I've explored diverse areas including iOS development, computer vision, and full-stack web projects, constantly pushing myself to learn and grow.
        </p>
        <p style={{ margin: '10px 0 0 0' }}>
          Whether it's leading tech communities like GDSC as Lead, solving algorithmic problems (even when they're frustrating!), or building tools that make life easier for others, I believe in consistent effort, honesty, and learning through doing. Currently, I'm on a journey to sharpen my DSA skills and document the process transparently through my YouTube series Zero to Hero.
        </p>
        <p style={{ margin: '10px 0 0 0' }}>
          Outside of code, I enjoy simplifying complex topics, guiding peers, and creating content that educates and inspires. I'm always open to collaboration, feedback, and new challenges!
        </p>
      </div>
    </div>
  ),
  'Skills': <div>Skills content goes here.</div>,
  'Contact': <div>Contact info goes here.</div>,
  'Resume': null,
  'Terminal': <TerminalWindow />,
};

const BASE_X = 120;
const BASE_Y = 80;
const OFFSET = 32;

function App() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [focusedApp, setFocusedApp] = useState<string | null>(null);

  const openApp = (app: string) => {
    setOpenWindows((prev) => {
      if (prev.includes(app)) {
        return [...prev.filter((a) => a !== app), app];
      }
      return [...prev, app];
    });
    setFocusedApp(app);
  };

  const closeApp = (app: string) => {
    setOpenWindows((prev) => prev.filter((a) => a !== app));
    setFocusedApp((prev) => (prev === app ? null : prev));
  };

  const focusApp = (app: string) => {
    setOpenWindows((prev) => {
      if (!prev.includes(app)) return prev;
      return [...prev.filter((a) => a !== app), app];
    });
    setFocusedApp(app);
  };

  return (
    <div className="macos-desktop">
      <MenuBar activeApp={focusedApp || undefined} />
      <WeatherWidget />
      <div className="desktop-background">
        <DesktopIcons onOpenApp={openApp} />
        {openWindows.map((app, i) => (
          <AppWindow
            key={app}
            title={app}
            onClose={() => closeApp(app)}
            onMouseDown={() => focusApp(app)}
            initialPosition={{
              x: BASE_X + i * OFFSET,
              y: app === 'Resume' ? 10 : BASE_Y + i * OFFSET,
            }}
            initialSize={app === 'Resume' ? { width: 800, height: Math.min(900, window.innerHeight - (40 + 70 + 20)) } : undefined}
          >
            {app === 'Resume' ? (
              <iframe
                src="/PrajwalSanapResume.pdf#toolbar=0"
                title="Resume PDF"
                style={{ width: '100%', height: '100%', border: 'none', minHeight: 400 }}
              />
            ) : (APP_CONTENT[app] || <div>App content</div>)}
          </AppWindow>
        ))}
      </div>
      <Dock onOpenApp={openApp} />
    </div>
  );
}

export default App;
