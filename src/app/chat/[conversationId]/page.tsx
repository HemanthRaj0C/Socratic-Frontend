'use client';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useParams } from 'next/navigation';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function ConversationPage() {
    const { user } = useAuth();
    const params = useParams();
    const conversationId = params.conversationId as string;
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user && conversationId) {
            const fetchMessages = async () => {
                setIsLoading(true);
                const idToken = await user.getIdToken();
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/${conversationId}`, {
                    headers: { 'Authorization': `Bearer ${idToken}` },
                });
                if (response.ok) setMessages(await response.json().then(data => data.messages || []));
                else setMessages([{role: 'assistant', content: 'Failed to load this conversation.'}]);
                setIsLoading(false);
            };
            fetchMessages();
        }
    }, [user, conversationId]);

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
                body: JSON.stringify({ messages: [userMessage], conversation_id: conversationId }),
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
        <div className="flex flex-col h-full">
            <header className="p-4 border-b border-gray-700 text-center shadow-md flex-shrink-0">
                <h1 className="text-xl font-bold">🎓 Socratic Session</h1>
            </header>
            <main className="flex-grow p-4 overflow-y-auto">
                <div className="max-w-3xl w-full mx-auto space-y-6">
                    {isLoading && messages.length === 0 ? (
                        <div className="flex h-full items-center justify-center"><p className="text-gray-400 animate-pulse">Loading conversation...</p></div>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-4 rounded-lg max-w-xl prose prose-invert prose-p:my-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && messages.length > 0 && <div className="flex gap-3 justify-start"><div className="p-4 rounded-lg bg-gray-700 animate-pulse">Thinking...</div></div>}
                    <div ref={chatEndRef} />
                </div>
            </main>
            <footer className="p-4 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700 flex-shrink-0">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Continue the conversation..." className="flex-grow p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isLoading}/>
                    <button type="submit" className="px-6 py-3 bg-green-600 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-500" disabled={isLoading}>Send</button>
                </form>
            </footer>
        </div>
    );
}