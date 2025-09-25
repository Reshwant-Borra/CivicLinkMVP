// ASSIGNMENT: Developer 3 - SMS Feature
// Work on: features/sms/SMSPage.tsx and pages/sms.tsx
// Focus: SMS simulation, chat interface, message handling

import * as React from 'react';
import { useState } from 'react';

const SMSPage = () => {
  const [messages, setMessages] = useState<{ from: string; text: string; }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    const userMessage = { from: 'user', text: input };
    // Simulate an automated response for now (placeholder logic)
    const botMessage = { from: 'bot', text: 'This is an automated reply (placeholder).' };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');  // clear input field
  };

  return (
    <div>
      <h1>SMS Simulator</h1>
      <p>Send a message and receive an automated response.</p>
      <div 
        className="chat-window" 
        style={{ border: '1px solid #ccc', padding: '1em', minHeight: '150px' }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <p key={idx}>
              <strong>{msg.from === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
            </p>
          ))
        )}
      </div>
      <div className="controls">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          className="border p-1"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SMSPage;
