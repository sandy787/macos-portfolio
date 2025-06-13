import React from 'react';
import './Dock.css';
import { IoTerminal } from 'react-icons/io5';

interface DockProps {
  onOpenApp: (app: string) => void;
}

const dockIcons = [
  { label: 'Projects', icon: '📁' },
  { label: 'About Me', icon: '👤' },
  { label: 'Skills', icon: '🛠️' },
  { label: 'Contact', icon: '✉️' },
  { label: 'Resume', icon: '📄' },
  { label: 'Terminal', icon: (IoTerminal as any)({ size: 32 }) },
];

export const Dock: React.FC<DockProps> = ({ onOpenApp }) => {
  return (
    <div className="dock">
      {dockIcons.map(({ label, icon }) => (
        <span
          key={label}
          className="dock-icon"
          title={label}
          style={{ fontSize: 32 }}
          onClick={() => onOpenApp(label)}
        >
          {icon}
        </span>
      ))}
    </div>
  );
}; 