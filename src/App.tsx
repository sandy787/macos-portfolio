import React, { useState } from 'react';
import './App.css';
import { MenuBar } from './components/MenuBar';
import { Dock } from './components/Dock';
import { DesktopIcons } from './components/DesktopIcons';
import { AppWindow } from './components/AppWindow';
import { WeatherWidget } from './components/WeatherWidget';
import { FaEnvelope, FaLinkedin, FaGithub, FaGlobe, FaCode, FaBrain, FaServer, FaDatabase, FaTools, FaPython, FaSwift, FaJava, FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaFire, FaPuzzlePiece, FaCubes } from 'react-icons/fa';

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
    <div style={{ padding: '20px', lineHeight: '1.7', color: '#222', fontSize: '15px' }}>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'flex-start', marginBottom: '20px' }}>
        <img src="/PrajwalPhoto.png" alt="Prajwal Sanap" style={{ width: '160px', height: '160px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        <div>
          <h2 style={{ margin: '0 0 10px 0', color: '#000', fontSize: '24px', fontWeight: 'bold' }}>Hi, I'm Prajwal! 👋</h2>
          <p style={{ margin: 0 }}>
            I'm a <strong style={{ color: '#007bff' }}>passionate and curious tech enthusiast</strong> with a deep interest in <strong style={{ color: '#007bff' }}>software development</strong>, especially in the <strong style={{ color: '#007bff' }}>Web and AI space</strong>. I thrive at the intersection of creativity and logic, where I love turning ideas into <strong style={{ color: '#007bff' }}>impactful applications</strong>. Over the years, I've explored diverse areas including <strong style={{ color: '#007bff' }}>iOS development, computer vision, and full-stack web projects</strong>, constantly pushing myself to learn and grow.
          </p>
        </div>
      </div>
      <p style={{ margin: '15px 0' }}>
        Whether it's leading tech communities like <strong style={{ color: '#007bff' }}>GDSC as Lead</strong>, solving <strong style={{ color: '#007bff' }}>algorithmic problems</strong> (even when they're frustrating!), or building tools that make life easier for others, I believe in <strong style={{ color: '#007bff' }}>consistent effort, honesty, and learning through doing</strong>. Currently, I'm on a journey to sharpen my <strong style={{ color: '#007bff' }}>DSA skills</strong> and document the process transparently through my YouTube series <strong style={{ color: '#007bff' }}>Zero to Hero</strong>.
      </p>
      <p style={{ margin: '15px 0 0 0' }}>
        Outside of code, I enjoy simplifying complex topics, guiding peers, and creating content that educates and inspires. I'm always open to <strong style={{ color: '#007bff' }}>collaboration, feedback, and new challenges!</strong>
      </p>
    </div>
  ),
  'Skills': (
    <div style={{ padding: '25px', lineHeight: '1.6', color: '#333', fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <h2 style={{ margin: '0 0 10px 0', color: '#000', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>My Technical Skills</h2>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '15px' }}>A comprehensive look at my expertise across various domains.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
        
        {/* Languages */}
        <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#007bff', fontSize: '18px', borderBottom: '1px solid #007bff', paddingBottom: '5px' }}>Languages</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaPython style={{ color: '#306998', marginRight: '6px', fontSize: '14px' }} />Python
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaSwift style={{ color: '#F05138', marginRight: '6px', fontSize: '14px' }} />Swift
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaCode style={{ color: '#607D8B', marginRight: '6px', fontSize: '14px' }} />C/C++
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaDatabase style={{ color: '#4479A1', marginRight: '6px', fontSize: '14px' }} />SQL
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaJava style={{ color: '#007396', marginRight: '6px', fontSize: '14px' }} />Java
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaHtml5 style={{ color: '#E34C26', marginRight: '6px', fontSize: '14px' }} />HTML
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaCss3Alt style={{ color: '#1572B6', marginRight: '6px', fontSize: '14px' }} />CSS
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaJs style={{ color: '#F7DF1E', marginRight: '6px', fontSize: '14px' }} />JavaScript
            </li>
          </ul>
        </div>

        {/* Data Science & AI */}
        <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#007bff', fontSize: '18px', borderBottom: '1px solid #007bff', paddingBottom: '5px' }}>Data Science & AI</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaBrain style={{ color: '#673AB7', marginRight: '6px', fontSize: '14px' }} />Machine Learning (ML)
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaBrain style={{ color: '#673AB7', marginRight: '6px', fontSize: '14px' }} />Deep Learning (DL)
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaBrain style={{ color: '#673AB7', marginRight: '6px', fontSize: '14px' }} />Natural Language Processing (NLP)
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaBrain style={{ color: '#673AB7', marginRight: '6px', fontSize: '14px' }} />Data Analysis
            </li>
          </ul>
        </div>

        {/* Frameworks & Technologies */}
        <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#007bff', fontSize: '18px', borderBottom: '1px solid #007bff', paddingBottom: '5px' }}>Frameworks & Technologies</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaServer style={{ color: '#212121', marginRight: '6px', fontSize: '14px' }} />Flask
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaReact style={{ color: '#61DAFB', marginRight: '6px', fontSize: '14px' }} />React
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaGlobe style={{ color: '#009688', marginRight: '6px', fontSize: '14px' }} />REST API
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaCubes style={{ color: '#4CAF50', marginRight: '6px', fontSize: '14px' }} />Component-Based Design
            </li>
          </ul>
        </div>

        {/* Databases */}
        <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#007bff', fontSize: '18px', borderBottom: '1px solid #007bff', paddingBottom: '5px' }}>Databases</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaFire style={{ color: '#FFCA28', marginRight: '6px', fontSize: '14px' }} />Firebase
            </li>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaDatabase style={{ color: '#F29111', marginRight: '6px', fontSize: '14px' }} />MySQL
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaDatabase style={{ color: '#47A248', marginRight: '6px', fontSize: '14px' }} />MongoDB
            </li>
          </ul>
        </div>

        {/* Other Proficiencies */}
        <div style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
          <h3 style={{ margin: '0 0 12px 0', color: '#007bff', fontSize: '18px', borderBottom: '1px solid #007bff', paddingBottom: '5px' }}>Other Proficiencies</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaPuzzlePiece style={{ color: '#FF9800', marginRight: '6px', fontSize: '14px' }} />Data Structures & Algorithms
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <FaGitAlt style={{ color: '#F1502F', marginRight: '6px', fontSize: '14px' }} />Git & GitHub
            </li>
          </ul>
        </div>

      </div>
    </div>
  ),
  'Contact': (
    <div style={{ padding: '30px', lineHeight: '2', color: '#222', fontSize: '16px' }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#000', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Get in Touch!</h2>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>I'm always excited to connect with new people and discuss potential collaborations.</p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <li style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {/* @ts-ignore */}
          <FaEnvelope style={{ marginRight: '15px', color: '#d44638', fontSize: '24px' }} />
          <strong>Email:</strong> <a href="mailto:prajwalsanap123@gmail.com" style={{ color: '#007bff', textDecoration: 'none', marginLeft: '10px' }} onMouseOver={e => e.currentTarget.style.textDecoration='underline'} onMouseOut={e => e.currentTarget.style.textDecoration='none'}>prajwalsanap123@gmail.com</a>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {/* @ts-ignore */}
          <FaLinkedin style={{ marginRight: '15px', color: '#0077B5', fontSize: '24px' }} />
          <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/prajwalsanap/" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none', marginLeft: '10px' }} onMouseOver={e => e.currentTarget.style.textDecoration='underline'} onMouseOut={e => e.currentTarget.style.textDecoration='none'}>linkedin.com/in/prajwalsanap</a>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {/* @ts-ignore */}
          <FaGithub style={{ marginRight: '15px', color: '#333', fontSize: '24px' }} />
          <strong>GitHub:</strong> <a href="https://github.com/sandy787" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none', marginLeft: '10px' }} onMouseOver={e => e.currentTarget.style.textDecoration='underline'} onMouseOut={e => e.currentTarget.style.textDecoration='none'}>github.com/sandy787</a>
        </li>
        <li style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          {/* @ts-ignore */}
          <FaGlobe style={{ marginRight: '15px', color: '#1a73e8', fontSize: '24px' }} />
          <strong>Portfolio:</strong> <a href="https://prajwalsanap.me" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'none', marginLeft: '10px' }} onMouseOver={e => e.currentTarget.style.textDecoration='underline'} onMouseOut={e => e.currentTarget.style.textDecoration='none'}>prajwalsanap.me</a>
        </li>
      </ul>
    </div>
  ),
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
              y: app === 'Resume' ? 10 : (
                app === 'Skills' ? 10 : BASE_Y + i * OFFSET
              ),
            }}
            initialSize={
              app === 'Resume'
                ? { width: 800, height: Math.min(900, window.innerHeight - (40 + 70 + 20)) }
                : app === 'About Me'
                ? { width: 800, height: 500 }
                : app === 'Contact'
                ? { width: 550, height: 520 }
                : app === 'Terminal'
                ? { width: 550, height: 520 }
                : app === 'Skills'
                ? { width: 800, height: 700 }
                : undefined
            }
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
