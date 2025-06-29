// src/app/page.tsx
'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Define the structure for a message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function HomePage() {
  const { user, login, logout } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Effect to start a new chat when the user logs in
  useEffect(() => {
    if (user) {
      setMessages([{ role: 'assistant', content: "Hello! I'm your Socratic Tutor. What would you like to explore?" }]);
    }
  }, [user]);


  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
      const idToken = await user.getIdToken();
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`${apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        // In this version, we send the entire chat history
        // Your backend logic expects just the new message, let's adjust it
        // NO, your backend appends the new message to the history it retrieves,
        // so we only need to send the new message.
        body: JSON.stringify({ messages: [userMessage] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.reply };
      setMessages(prev => [...prev, userMessage, assistantMessage]); // Correct way to update state based on previous state

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: 'assistant', content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : String(error)}` };
      setMessages(prev => [...prev, userMessage, errorMessage]); // Also correct
    } finally {
      setIsLoading(false);
    }
  };


  // A cleaner way to handle state updates for the final message list
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !user) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const idToken = await user.getIdToken();
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`${apiBaseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}`},
        body: JSON.stringify({ messages: [userMessage] }),
      });
      
      if (!response.ok) throw new Error((await response.json()).detail || 'Failed to fetch');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700 shadow-md">
        <h1 className="text-xl font-bold">🎓 Socratic AI Tutor</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300 hidden sm:block">{user.displayName || user.email}</span>
            <button onClick={logout} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors">Logout</button>
          </div>
        ) : (
          <button onClick={login} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors">Login with Google</button>
        )}
      </header>

      <main className="flex-grow flex flex-col p-4 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto space-y-6 flex-grow">
          {!user ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-2xl text-gray-500">Please log in to start your learning session.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-4 rounded-lg max-w-xl prose prose-invert prose-p:my-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="p-4 rounded-lg bg-gray-700 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="p-4 bg-gray-800/50 backdrop-blur-sm border-t border-gray-700">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={user ? "Ask a question..." : "Please log in to chat"}
            className="flex-grow p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={!user || isLoading}
          />
          <button type="submit" className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors" disabled={!user || isLoading}>
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}