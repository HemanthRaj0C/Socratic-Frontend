'use client';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Aurora from '@/components/Aurora/Aurora';
import DotGrid from '@/components/DotGrid/DotGrid';

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
                <header className="relative flex-shrink-0 my-7">
                    <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center -space-x-5">
                            <button
                                onClick={() => router.push('/')}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                                title="Back to home"
                            >
                            </button>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    🎓 New Socratic Session
                                </h1>
                                <p className="text-sm text-gray-400">Start your learning journey</p>
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
                <main 
                    className="flex-grow overflow-y-auto" 
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
                    <div className="max-w-4xl mx-auto p-2 space-y-6">
                        {messages.length === 0 && !isLoading ? (
                            <div className="text-center">
                                <div className="text-7xl mb-6">🤔</div>
                                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    What would you like to explore today?
                                </h2>
                                <p className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
                                    Ask me any question and I'll guide you through the Socratic method of learning - 
                                    helping you discover answers through thoughtful questioning and exploration.
                                </p>
                                
                                {/* Learning Categories */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                                    <div className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                                         onClick={() => setInput("What is the nature of knowledge?")}>
                                        <div className="text-3xl mb-3">🧠</div>
                                        <h3 className="font-semibold mb-2 text-blue-400">Philosophy</h3>
                                        <p className="text-sm text-gray-400">Explore deep questions about existence, knowledge, and meaning</p>
                                    </div>
                                    
                                    <div className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                                         onClick={() => setInput("How does quantum mechanics work?")}>
                                        <div className="text-3xl mb-3">🔬</div>
                                        <h3 className="font-semibold mb-2 text-purple-400">Science</h3>
                                        <p className="text-sm text-gray-400">Understand natural phenomena through inquiry and discovery</p>
                                    </div>
                                    
                                    <div className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300 cursor-pointer"
                                         onClick={() => setInput("What is the impact of AI on society?")}>
                                        <div className="text-3xl mb-3">💻</div>
                                        <h3 className="font-semibold mb-2 text-pink-400">Technology</h3>
                                        <p className="text-sm text-gray-400">Learn about innovation, algorithms, and digital transformation</p>
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
                        {isLoading && (
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
                <footer className="relative p-6 backdrop-blur-sm bg-black/20 border-t border-white/10 flex-shrink-0">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="flex gap-3">
                            <div className="flex-grow relative">
                                <input 
                                    type="text" 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)} 
                                    placeholder="Start your learning journey... What would you like to explore?" 
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
                                    <span>{isLoading ? '⏳' : '🚀'}</span>
                                    <span>{isLoading ? 'Starting' : 'Begin'}</span>
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