'use client';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Aurora from '@/components/Aurora/Aurora';
import DotGrid from '@/components/DotGrid/DotGrid';
import { 
  Zap, 
  Turtle, 
  Bot, 
  X, 
  GraduationCap, 
  XCircle,
  HelpCircle,
  Brain,
  Rocket,
  Send,
  Microscope,
  Laptop
} from 'lucide-react';

interface Message { role: 'user' | 'assistant'; content: string; }
interface ServiceHealth { 
    status: 'online' | 'slow' | 'offline'; 
    service: string; 
    chat_enabled: boolean;
    details?: {
        colab: string;
        huggingface: string;
    };
}

export default function NewChatPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serviceHealth, setServiceHealth] = useState<ServiceHealth | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Check service health on component mount
    useEffect(() => {
        const checkHealth = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/health`);
                if (response.ok) {
                    const health = await response.json();
                    setServiceHealth(health);
                }
            } catch (error) {
                console.error('Health check failed:', error);
                setServiceHealth({ status: 'offline', service: 'none', chat_enabled: false });
            }
        };
        checkHealth();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !user || !serviceHealth?.chat_enabled) return;

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
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to fetch');
            }
            
            const data = await response.json();
            
            // Add the assistant's reply temporarily before redirecting
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: data.reply 
            }]);
            
            // Redirect to the new conversation page
            setTimeout(() => {
                router.push(`/chat/${data.conversation_id}`);
            }, 1000);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Service status indicator component
    const ServiceStatusIndicator = () => {
        if (!serviceHealth) return null;
        
        const statusConfig = {
            online: { 
                color: 'text-green-400', 
                bg: 'bg-green-500/20', 
                text: 'Fast AI (GPU)', 
                icon: <Zap className="w-4 h-4" />
            },
            slow: { 
                color: 'text-yellow-400', 
                bg: 'bg-yellow-500/20', 
                text: 'Slow AI (CPU)', 
                icon: <Turtle className="w-4 h-4" />
            },
            offline: { 
                color: 'text-red-400', 
                bg: 'bg-red-500/20', 
                text: 'AI Offline', 
                icon: <X className="w-4 h-4" />
            }
        };
        
        const config = statusConfig[serviceHealth.status];
        
        return (
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${config.bg} border border-white/10`}>
                {config.icon}
                <span className={`text-xs font-medium ${config.color}`}>{config.text}</span>
            </div>
        );
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
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-2">
                                    <GraduationCap className="w-5 h-5 text-blue-400" />
                                    <span>New Socratic Session</span>
                                </h1>
                                <p className="text-sm text-gray-400">Start your learning journey</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <ServiceStatusIndicator />
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
                    
                    {/* Service Offline Banner */}
                    {serviceHealth?.status === 'offline' && (
                        <div className="mx-4 mb-4 p-4 bg-red-900/50 border border-red-500/30 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center space-x-3">
                                <XCircle className="w-6 h-6 text-red-400" />
                                <div>
                                    <h3 className="font-semibold text-red-200">AI Services Temporarily Unavailable</h3>
                                    <p className="text-sm text-red-300">
                                        All AI model services are currently offline. Please check back in a few minutes.
                                        <br />We're working to restore service as quickly as possible.
                                    </p>
                                    {serviceHealth.details && (
                                        <p className="text-xs text-red-400 mt-2">
                                            Status: Colab ({serviceHealth.details.colab}), HuggingFace ({serviceHealth.details.huggingface})
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Slow Service Warning */}
                    {serviceHealth?.status === 'slow' && (
                        <div className="mx-4 mb-4 p-4 bg-yellow-900/50 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center space-x-3">
                                <Turtle className="w-6 h-6 text-yellow-400" />
                                <div>
                                    <h3 className="font-semibold text-yellow-200">Running on Backup CPU</h3>
                                    <p className="text-sm text-yellow-300">
                                        AI responses may be slower than usual. We're using CPU-based processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto p-2 space-y-6">
                        {messages.length === 0 && !isLoading ? (
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <HelpCircle className="w-20 h-20 text-blue-400" />
                                </div>
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
                                        <div className="flex justify-center mb-3">
                                            <Brain className="w-8 h-8 text-blue-400" />
                                        </div>
                                        <h3 className="font-semibold mb-2 text-blue-400">Philosophy</h3>
                                        <p className="text-sm text-gray-400">Explore deep questions about existence, knowledge, and meaning</p>
                                    </div>
                                    
                                    <div className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                                         onClick={() => setInput("How does quantum mechanics work?")}>
                                        <div className="flex justify-center mb-3">
                                            <Microscope className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <h3 className="font-semibold mb-2 text-purple-400">Science</h3>
                                        <p className="text-sm text-gray-400">Understand natural phenomena through inquiry and discovery</p>
                                    </div>
                                    
                                    <div className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300 cursor-pointer"
                                         onClick={() => setInput("What is the impact of AI on society?")}>
                                        <div className="flex justify-center mb-3">
                                            <Laptop className="w-8 h-8 text-pink-400" />
                                        </div>
                                        <h3 className="font-semibold mb-2 text-pink-400">Technology</h3>
                                        <p className="text-sm text-gray-400">Learn about innovation, algorithms, and digital transformation</p>
                                    </div>
                                </div>    
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-5 h-5 text-white" />
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
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-5 h-5 text-white" />
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
                                    placeholder={
                                        !serviceHealth?.chat_enabled 
                                            ? "AI services are currently offline. Please try again later..." 
                                            : serviceHealth?.status === 'slow'
                                            ? "AI is running on slow CPU - responses may take longer..."
                                            : "Start your learning journey... What would you like to explore?"
                                    }
                                    className={`w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl border transition-all duration-200 text-white placeholder-gray-400 ${
                                        !serviceHealth?.chat_enabled 
                                            ? 'border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50' 
                                            : 'border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                    disabled={isLoading || !serviceHealth?.chat_enabled}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                                    {!serviceHealth?.chat_enabled ? (
                                        <span className="bg-red-500/20 px-2 py-1 rounded text-xs text-red-300 flex items-center space-x-1">
                                            <X className="w-3 h-3" />
                                            <span>Service Offline</span>
                                        </span>
                                    ) : input.length > 0 && (
                                        <span className="bg-blue-500/20 px-2 py-1 rounded text-xs">
                                            Press Enter ↵
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className={`group relative px-6 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border overflow-hidden ${
                                    !serviceHealth?.chat_enabled
                                        ? 'bg-gradient-to-r from-red-700 to-red-800 border-red-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-600 hover:to-gray-600 border-slate-600'
                                }`}
                                disabled={isLoading || !input.trim() || !serviceHealth?.chat_enabled}
                            >
                                <div className="relative z-10 flex items-center space-x-2">
                                    {!serviceHealth?.chat_enabled ? (
                                        <X className="w-5 h-5" />
                                    ) : isLoading ? (
                                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    ) : (
                                        <Rocket className="w-5 h-5" />
                                    )}
                                    <span>
                                        {!serviceHealth?.chat_enabled ? 'Offline' : isLoading ? 'Starting' : 'Begin'}
                                    </span>
                                </div>
                                {/* Shine Effect */}
                                {serviceHealth?.chat_enabled && (
                                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                )}
                            </button>
                        </form>
                    </div>
                </footer>
            </div>
        </div>
    );
}