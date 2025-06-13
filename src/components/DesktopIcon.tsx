import React from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => {
  return (
    <div className="desktop-icon" onClick={onClick} tabIndex={0}>
      <div className="desktop-icon-image">{icon}</div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
}; 