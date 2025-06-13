import React, { useRef, useState, useEffect } from 'react';
import './AppWindow.css';

interface AppWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 180;
const MENU_BAR_HEIGHT = 10; // Height in px, consistent with MenuBar.css
const DOCK_APPROX_HEIGHT = 70; // Approximate height of the dock for bottom clamping
const WINDOW_VERTICAL_SAFE_MARGIN = 10; // General buffer for top/bottom window positioning

export const AppWindow: React.FC<AppWindowProps> = ({ title, onClose, children, initialPosition, initialSize, ...rest }) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: initialPosition?.x ?? 120,
    y: initialPosition?.y ?? 80,
  });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: initialSize?.width ?? 540,
    height: initialSize?.height ?? 360,
  });
  const [resizing, setResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Drag logic
  const onMouseDownTitle = (e: React.MouseEvent) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    if (dragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const minY = MENU_BAR_HEIGHT;
        const maxY = window.innerHeight - size.height - DOCK_APPROX_HEIGHT - WINDOW_VERTICAL_SAFE_MARGIN;
        const minX = 0;
        const maxX = window.innerWidth - size.width;
        setPosition({
          x: Math.max(minX, Math.min(e.clientX - offset.x, maxX)),
          y: Math.max(minY, Math.min(e.clientY - offset.y, maxY)),
        });
      };
      const handleMouseUp = () => setDragging(false);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, offset, size]);

  // Clamp initial position on mount
  useEffect(() => {
    setPosition((prev) => {
      const minY = MENU_BAR_HEIGHT;
      const maxY = window.innerHeight - size.height - DOCK_APPROX_HEIGHT - WINDOW_VERTICAL_SAFE_MARGIN;
      const minX = 0;
      const maxX = window.innerWidth - size.width;
      return {
        x: Math.max(minX, Math.min(prev.x, maxX)),
        y: Math.max(minY, Math.min(prev.y, maxY)),
      };
    });
  }, [size]); // size dependency needed for accurate clamping

  // Resize logic
  const onMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  useEffect(() => {
    if (resizing) {
      const handleMouseMove = (e: MouseEvent) => {
        const maxHeight = window.innerHeight - position.y - DOCK_APPROX_HEIGHT - WINDOW_VERTICAL_SAFE_MARGIN; // Max height depends on current Y position
        const newWidth = Math.max(MIN_WIDTH, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, resizeStart.height + (e.clientY - resizeStart.y)));
        setSize({ width: newWidth, height: newHeight });
      };
      const handleMouseUp = () => setResizing(false);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizing, resizeStart, position]); // position dependency added

  return (
    <div
      className="app-window"
      ref={windowRef}
      style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
      onMouseDown={rest.onMouseDown}
      {...rest}
    >
      <div className="app-window-titlebar" onMouseDown={onMouseDownTitle}>
        <div className="app-window-buttons">
          <button className="close" onClick={onClose} aria-label="Close" />
        </div>
        <span className="app-window-title">{title}</span>
      </div>
      <div className="app-window-content">{children}</div>
      <div
        className="app-window-resize-handle"
        onMouseDown={onMouseDownResize}
      />
    </div>
  );
}; 