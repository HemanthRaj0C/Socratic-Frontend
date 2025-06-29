'use client';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function NewChatPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !user) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const idToken = await user.getIdToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}`},
                body: JSON.stringify({ messages: [userMessage], conversation_id: null }),
            });
            if (!response.ok) throw new Error((await response.json()).detail || 'Failed to fetch');
            const data = await response.json();
            
            // This was a new chat, so the backend created an ID. Redirect to that new chat page.
            router.push(`/chat/${data.conversation_id}`);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <header className="p-4 border-b border-gray-700 text-center shadow-md flex-shrink-0">
                <h1 className="text-xl font-bold">🎓 New Socratic Session</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="max-w-3xl w-full mx-auto space-y-6">
                    {messages.length === 0 && !isLoading && (
                         <div className="flex h-full items-center justify-center text-center">
                            <p className="text-2xl text-gray-500">How can I help you learn today?</p>
                         </div>
                    )}
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-4 rounded-lg max-w-xl prose prose-invert prose-p:my-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && <div className="flex gap-3 justify-start"><div className="p-4 rounded-lg bg-gray-700 animate-pulse">Thinking...</div></div>}
                    <div ref={chatEndRef} />
                </div>
            </main>
            <footer className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700 flex-shrink-0">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Start a new conversation..." className="flex-grow p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isLoading}/>
                    <button type="submit" className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-500" disabled={isLoading}>Send</button>
                </form>
            </footer>
        </div>
    );
}