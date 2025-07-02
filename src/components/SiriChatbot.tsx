import React, { useState, useRef } from 'react';
import './SiriChatbot.css';

interface Message {
  sender: 'user' | 'siri';
  text: string;
}

const geminiAPI = async (message: string): Promise<string> => {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return data.reply || 'Sorry, I could not get a response.';
  } catch (err) {
    return 'Sorry, there was an error connecting to Siri.';
  }
};

const SiriChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { sender: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    const siriReply = await geminiAPI(input);
    setMessages((msgs) => [...msgs, { sender: 'siri', text: siriReply }]);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) {
    return (
      <button className="siri-launch-btn" onClick={() => setIsOpen(true)} title="Ask Siri">
        <span role="img" aria-label="Siri">🟣</span>
      </button>
    );
  }

  return (
    <div
      className="siri-chatbot-window"
      style={{ left: position.x, top: position.y }}
    >
      <div className="siri-header" onMouseDown={handleMouseDown}>
        <span role="img" aria-label="Siri">🟣</span> Siri
        <button className="siri-close-btn" onClick={() => setIsOpen(false)}>×</button>
      </div>
      <div className="siri-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`siri-msg siri-msg-${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="siri-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SiriChatbot; 