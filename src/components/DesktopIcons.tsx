import React from 'react';
import { DesktopIcon } from './DesktopIcon';
import './DesktopIcons.css';
import { IoTerminal } from 'react-icons/io5';

interface DesktopIconsProps {
  onOpenApp: (app: string) => void;
}

const icons = [
  { label: 'Projects and Experience', icon: '📁' },
  { label: 'About Me', icon: '👤' },
  { label: 'Skills', icon: '🛠️' },
  { label: 'Contact', icon: '✉️' },
  { label: 'Resume', icon: '📄' },
  { label: 'Terminal', icon: (IoTerminal as any)({ size: 40 }) },
];

export const DesktopIcons: React.FC<DesktopIconsProps> = ({ onOpenApp }) => {
  return (
    <div className="desktop-icons">
      {icons.map(({ label, icon }) => (
        <DesktopIcon
          key={label}
          icon={icon}
          label={label}
          onClick={() => onOpenApp(label)}
        />
      ))}
    </div>
  );
}; 