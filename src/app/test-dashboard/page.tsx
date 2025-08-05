// src/app/test-dashboard/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Define the structure for messages
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function TestDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // State for the test dashboard
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [projectSuggestion, setProjectSuggestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Ready.');

  // Redirect if user is not logged in after loading
  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // --- API Functions for Testing ---

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !user) return;
    
    setIsLoading(true);
    setStatus('Sending message to /chat endpoint...');
    
    const userMessage: Message = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, userMessage]); // Show user message immediately
    
    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}`},
        body: JSON.stringify({ 
            messages: [userMessage],
            conversation_id: conversationId // Will be null for the first message
        }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Chat request failed');

      setStatus('Success! AI replied.');
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.reply }]);
      
      // If this was a new chat, save the new ID
      if (!conversationId) {
        setConversationId(data.conversation_id);
      }
      setChatInput('');

    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setStatus(`Error: ${message}`);
      setChatHistory(prev => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestProject = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setProjectSuggestion(null);
    setStatus('Requesting holistic project from /suggest-holistic-project...');

    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/suggest-holistic-project`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${idToken}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Project suggestion failed');
      
      setStatus('Success! Project suggestion received.');
      setProjectSuggestion(data);

    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setStatus(`Error: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewTestChat = () => {
    setConversationId(null);
    setChatHistory([]);
    setChatInput('');
    setStatus('Ready for new test chat.');
  };

  // Render a loading state while checking auth
  if (loading || !user) {
    return <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen font-mono">
      <h1 className="text-3xl font-bold mb-2">Backend Test Dashboard</h1>
      <p className="text-gray-400 mb-6">User: {user.email}</p>

      {/* --- Status Bar --- */}
      <div className="mb-8 p-3 bg-gray-800 border border-gray-700 rounded-lg">
        <strong>Status:</strong> <span className={`font-semibold ${status.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{status}</span>
      </div>

      {/* --- Test Area 1: Conversation & Memory Ingestion --- */}
      <div className="mb-8 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Test 1: Chat & Memory Ingestion</h2>
        <p className="text-gray-400 mb-4">Have a conversation here. Each successful turn will enqueue a job for the background worker to create and store a vector embedding.</p>
        <div className="mb-4"><strong>Current Test Conversation ID:</strong> {conversationId || 'None (will be created on first message)'}</div>

        <div className="h-64 overflow-y-auto bg-black p-4 rounded-md mb-4 border border-gray-600">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
              <strong className="font-bold">{msg.role === 'user' ? 'You' : 'AI'}: </strong>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleChatSubmit} className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type a message to create memories..."
            className="flex-grow p-2 bg-gray-700 rounded"
            disabled={isLoading}
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded" disabled={isLoading}>Send</button>
          <button type="button" onClick={handleNewTestChat} className="px-4 py-2 bg-gray-600 rounded">New Chat</button>
        </form>
      </div>
      
      {/* --- Test Area 2: Holistic Project Suggestion --- */}
      <div className="border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Test 2: Holistic Project Suggestion</h2>
        <p className="text-gray-400 mb-4">Click the button below. This will call the `/suggest-holistic-project` endpoint, which analyzes ALL memories stored in Pinecone for your user ID.</p>
        <button 
          onClick={handleSuggestProject} 
          className="w-full px-4 py-3 bg-purple-600 rounded mb-4 font-bold text-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Suggest My Personalized Project'}
        </button>

        {projectSuggestion && (
          <div className="bg-black p-4 rounded-md border border-gray-600">
            <h3 className="text-xl font-bold mb-2 text-purple-400">{projectSuggestion.project_title}</h3>
            <p className="mb-4">{projectSuggestion.project_description}</p>
            <h4 className="font-bold mb-1">Key Features:</h4>
            <ul className="list-disc list-inside mb-4">
              {projectSuggestion.key_features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
            </ul>
            <h4 className="font-bold mb-1">Skills Reinforced:</h4>
            <div className="flex flex-wrap gap-2">
              {projectSuggestion.skills_reinforced?.map((s: string, i: number) => (
                <span key={i} className="bg-gray-700 px-2 py-1 rounded-full text-sm">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}