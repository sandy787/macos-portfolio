import React from 'react';
import './MenuBar.css';
import { IoWifiSharp, IoBatteryCharging } from 'react-icons/io5';

interface MenuBarProps {
  activeApp?: string;
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export const MenuBar: React.FC<MenuBarProps> = ({ activeApp }) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = formatDate(now);

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">
        <span className="apple-logo"></span>
        <span className="menu-app-name">{activeApp || 'Finder'}</span>
        <span className="menu-item">File</span>
        <span className="menu-item">Edit</span>
        <span className="menu-item">View</span>
        <span className="menu-item">Go</span>
        <span className="menu-item">Window</span>
        <span className="menu-item">Help</span>
      </div>
      <div className="menu-bar-right">
        <span className="menu-status-icon" title="WiFi">{(IoWifiSharp as any)({ size: 18 })}</span>
        <span className="menu-status-icon" title="Battery">{(IoBatteryCharging as any)({ size: 18 })}</span>
        <span className="menu-date">{dateString}</span>
        <span className="menu-time">{timeString}</span>
      </div>
    </div>
  );
}; 