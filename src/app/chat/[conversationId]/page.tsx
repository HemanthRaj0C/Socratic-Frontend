'use client';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import Aurora from '@/components/Aurora/Aurora';
import DotGrid from '@/components/DotGrid/DotGrid';

interface Message { role: 'user' | 'assistant'; content: string; }

export default function ConversationPage() {
    const { user } = useAuth();
    const params = useParams();
    const router = useRouter();
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
        <div className="w-full h-full relative text-white">
            {/* Aurora Background */}
            <div className="absolute inset-0 z-0">
                <Aurora 
                    colorStops={["#1e3a8a", "#7c3aed", "#0891b2"]}
                    amplitude={0.8}
                    blend={0.3}
                />
            </div>
            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Enhanced Header */}
                <header className="relative p-3 border-b border-white/10 backdrop-blur-sm bg-black/20 flex-shrink-0">
                    <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-4 relative right-10">
                            <button
                                onClick={() => router.push('/chat')}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                                title="Back to conversations"
                            >
                                <span className="text-xl">←</span>
                            </button>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    🎓 Socratic Learning Session
                                </h1>
                                <p className="text-sm text-gray-400">AI-powered personalized tutoring</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-300">{user?.displayName || user?.email}</div>
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold">
                                {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Enhanced Chat Area */}
                <main className="flex-grow overflow-y-auto"
                style={{
                        scrollbarWidth: 'none', 
                        msOverflowStyle: 'none'
                    }}
                >
                    <style jsx>{`
                        main::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    <div className="max-w-4xl mx-auto p-6 space-y-6">
                        {isLoading && messages.length === 0 ? (
                            <div className="flex h-96 items-center justify-center">
                                <div className="text-center">
                                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-gray-400 animate-pulse">Loading conversation...</p>
                                </div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🤖</div>
                                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Ready to Learn?
                                </h2>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    Start your Socratic learning journey. Ask any question and I'll guide you through discovery!
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                                        <div className="text-xl mb-2">💡</div>
                                        <h3 className="font-semibold mb-1">Ask Questions</h3>
                                        <p className="text-sm text-gray-400">I'll help you discover answers through guided inquiry</p>
                                    </div>
                                    <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                                        <div className="text-xl mb-2">🧠</div>
                                        <h3 className="font-semibold mb-1">Think Critically</h3>
                                        <p className="text-sm text-gray-400">Develop deeper understanding through questioning</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                            🤖
                                        </div>
                                    )}
                                    <div className={`p-4 rounded-2xl max-w-2xl backdrop-blur-sm border ${
                                        msg.role === 'user' 
                                            ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 border-blue-500/30 text-white' 
                                            : 'bg-white/10 border-white/20 text-gray-100'
                                    }`}>
                                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                            {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                        {isLoading && messages.length > 0 && (
                            <div className="flex gap-4 justify-start">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                    🤖
                                </div>
                                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                </main>

                {/* Enhanced Input Area */}
                <footer className="relative p-4 backdrop-blur-sm bg-black/20 border-t border-white/10 flex-shrink-0">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <div className="flex-grow relative">
                                <input 
                                    type="text" 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)} 
                                    placeholder="Ask me anything... I'll guide you to the answer" 
                                    className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-gray-400 transition-all duration-200" 
                                    disabled={isLoading}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                    {input.length > 0 && (
                                        <span className="bg-blue-500/20 px-2 py-1 rounded text-xs">
                                            Press Enter ↵
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="group relative px-6 py-4 bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-600 hover:to-gray-600 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-slate-600 overflow-hidden"
                                disabled={isLoading || !input.trim()}
                            >
                                <div className="relative z-10 flex items-center space-x-2">
                                    <span>{isLoading ? '⏳' : '💫'}</span>
                                    <span>{isLoading ? 'Thinking' : 'Send'}</span>
                                </div>
                                {/* Shine Effect */}
                                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            </button>
                        </form>
                    </div>
                </footer>
            </div>
        </div>
    );
}