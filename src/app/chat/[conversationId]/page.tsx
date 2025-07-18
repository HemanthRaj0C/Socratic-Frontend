'use client';
import { useState, FormEvent, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import Aurora from '@/components/Aurora/Aurora';
import DotGrid from '@/components/DotGrid/DotGrid';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import './markdown-styles.css';
import { 
  Zap, 
  Turtle, 
  Bot, 
  X, 
  GraduationCap, 
  XCircle, 
  Lightbulb, 
  Brain,
  ArrowLeft,
  Send
} from 'lucide-react';

interface Message { 
  role: 'user' | 'assistant'; 
  content: string; 
  source?: string;
  isError?: boolean;
}
interface ServiceHealth { 
    status: 'online' | 'slow' | 'offline'; 
    service: string; 
    chat_enabled: boolean;
    details?: {
        colab: string;
        huggingface: string;
    };
}

export default function ConversationPage() {
    const { user } = useAuth();
    const params = useParams();
    const router = useRouter();
    const conversationId = params.conversationId as string;
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [serviceHealth, setServiceHealth] = useState<ServiceHealth | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (user && conversationId) {
            const fetchMessages = async () => {
                setIsLoading(true);
                try {
                    const idToken = await user.getIdToken();
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations/${conversationId}`, {
                        headers: { 'Authorization': `Bearer ${idToken}` },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setMessages(data.messages || []);
                    } else if (response.status === 404) {
                        setMessages([{role: 'assistant', content: 'This conversation could not be found. It may have been deleted or you may not have access to it.'}]);
                    } else {
                        setMessages([{role: 'assistant', content: 'Failed to load this conversation. Please try again later.'}]);
                    }
                } catch (error) {
                    console.error('Error fetching conversation:', error);
                    setMessages([{role: 'assistant', content: 'Network error while loading conversation. Please check your connection and try again.'}]);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchMessages();
        }
    }, [user, conversationId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!input.trim() || isLoading || !user || !serviceHealth?.chat_enabled) return;
            
            // Create a synthetic form event
            const syntheticEvent = {
                preventDefault: () => {},
            } as FormEvent;
            handleSubmit(syntheticEvent);
        }
    };

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
                body: JSON.stringify({ messages: [userMessage], conversation_id: conversationId }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to fetch');
            }
            
            const data = await response.json();
            
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: data.reply,
                source: data.source // Store source separately for rendering
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            const message = error instanceof Error ? error.message : "Unknown error";
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `Error: ${message}`,
                isError: true
            }]);
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
                icon: <Zap className="w-4 h-4 text-green-400" />
            },
            slow: { 
                color: 'text-yellow-400', 
                bg: 'bg-yellow-500/20', 
                text: 'Slow AI (CPU)', 
                icon: <Turtle className="w-4 h-4 text-yellow-400" />
            },
            offline: { 
                color: 'text-red-400', 
                bg: 'bg-red-500/20', 
                text: 'AI Offline', 
                icon: <X className="w-4 h-4 text-red-400" />
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
                <header className="relative p-2 md:p-3 border-b border-white/10 backdrop-blur-sm bg-black/20 flex-shrink-0 pt-16 md:pt-2">
                    <div className="relative z-10 max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <button
                                onClick={() => router.push('/chat')}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                                title="Back to conversations"
                            >
                                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-2">
                                    <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                                    <span className="hidden sm:inline">Socratic Learning Session</span>
                                    <span className="sm:hidden">Learning Session</span>
                                </h1>
                                <p className="text-xs md:text-sm text-gray-400">AI-powered personalized tutoring</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 md:space-x-3">
                            <ServiceStatusIndicator />
                            <div className="hidden md:block text-sm text-gray-300">{user?.displayName || user?.email}</div>
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold">
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
                    
                    {/* Service Offline Banner */}
                    {serviceHealth?.status === 'offline' && (
                        <div className="mx-2 md:mx-4 mb-4 p-3 md:p-4 bg-red-900/50 border border-red-500/30 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center space-x-2 md:space-x-3">
                                <XCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                                <div>
                                    <h3 className="font-semibold text-red-200 text-sm md:text-base">AI Services Temporarily Unavailable</h3>
                                    <p className="text-xs md:text-sm text-red-300">
                                        All AI model services are currently offline. Please check back in a few minutes.
                                        <br className="hidden sm:block" />We're working to restore service as quickly as possible.
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
                        <div className="mx-2 md:mx-4 mb-4 p-3 md:p-4 bg-yellow-900/50 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
                            <div className="flex items-center space-x-2 md:space-x-3">
                                <Turtle className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                                <div>
                                    <h3 className="font-semibold text-yellow-200 text-sm md:text-base">Running on Backup CPU</h3>
                                    <p className="text-xs md:text-sm text-yellow-300">
                                        AI responses may be slower than usual. We're using CPU-based processing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto p-2 md:p-6 space-y-4 md:space-y-6">
                        {isLoading && messages.length === 0 ? (
                            <div className="flex h-64 md:h-96 items-center justify-center">
                                <div className="text-center">
                                    <div className="animate-spin w-6 h-6 md:w-8 md:h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                                    <p className="text-gray-400 animate-pulse text-sm md:text-base">Loading conversation...</p>
                                </div>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="text-center py-8 md:py-16 px-4">
                                <div className="flex justify-center mb-4">
                                    <Bot className="w-12 h-12 md:w-16 md:h-16 text-blue-400" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Ready to Learn?
                                </h2>
                                <p className="text-gray-400 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base">
                                    Start your Socratic learning journey. Ask any question and I'll guide you through discovery!
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-2xl mx-auto">
                                    <div className="p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                                        <div className="flex justify-center mb-2">
                                            <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                                        </div>
                                        <h3 className="font-semibold mb-1 text-sm md:text-base">Ask Questions</h3>
                                        <p className="text-xs md:text-sm text-gray-400">I'll help you discover answers through guided inquiry</p>
                                    </div>
                                    <div className="p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                                        <div className="flex justify-center mb-2">
                                            <Brain className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                                        </div>
                                        <h3 className="font-semibold mb-1 text-sm md:text-base">Think Critically</h3>
                                        <p className="text-xs md:text-sm text-gray-400">Develop deeper understanding through questioning</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div key={index} className={`flex gap-2 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} px-2 md:px-0`}>
                                    {msg.role === 'assistant' && (
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                        </div>
                                    )}
                                    <div className={`p-3 md:p-4 rounded-2xl max-w-[85%] md:max-w-2xl backdrop-blur-sm border ${
                                        msg.role === 'user' 
                                            ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 border-blue-500/30 text-white' 
                                            : msg.isError
                                            ? 'bg-red-900/50 border-red-500/30 text-red-100'
                                            : 'bg-white/10 border-white/20 text-gray-100'
                                    }`}>
                                        {msg.isError && (
                                            <div className="mb-2 flex items-center space-x-1">
                                                <X className="w-4 h-4 text-red-400" />
                                            </div>
                                        )}
                                        <div className="prose prose-invert max-w-none text-sm md:text-base">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeHighlight]}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-xs md:text-sm font-bold">
                                            {user?.displayName?.[0] || user?.email?.[0] || 'U'}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                        {isLoading && messages.length > 0 && (
                            <div className="flex gap-2 md:gap-4 justify-start px-2 md:px-0">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </div>
                                <div className="p-3 md:p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse">
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
                <footer className="relative p-3 md:p-4 backdrop-blur-sm bg-black/20 border-t border-white/10 flex-shrink-0">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="flex gap-2 md:gap-3">
                            <div className="flex-grow relative">
                                <textarea 
                                    value={input} 
                                    onChange={(e) => setInput(e.target.value)} 
                                    onKeyDown={handleKeyDown}
                                    placeholder={
                                        !serviceHealth?.chat_enabled 
                                            ? "AI services are currently offline. Please try again later..." 
                                            : serviceHealth?.status === 'slow'
                                            ? "AI is running on slow CPU - responses may take longer..."
                                            : "Ask me anything... I'll guide you to the answer"
                                    }
                                    rows={1}
                                    className={`w-full p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-2xl border transition-all duration-200 text-white placeholder-gray-400 text-sm md:text-base resize-none overflow-hidden ${
                                        !serviceHealth?.chat_enabled 
                                            ? 'border-red-500/30 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50' 
                                            : 'border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50'
                                    }`}
                                    style={{
                                        minHeight: '52px',
                                        maxHeight: '120px'
                                    }}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = 'auto';
                                        target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                                    }}
                                    disabled={isLoading || !serviceHealth?.chat_enabled}
                                />
                                <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs md:text-sm">
                                    {!serviceHealth?.chat_enabled ? (
                                        <span className="bg-red-500/20 px-2 py-1 rounded text-xs text-red-300 flex items-center space-x-1">
                                            <X className="w-3 h-3" />
                                            <span className="hidden sm:inline">Service Offline</span>
                                            <span className="sm:hidden">Offline</span>
                                        </span>
                                    ) : input.length > 0 && (
                                        <span className="bg-blue-500/20 px-2 py-1 rounded text-xs flex items-center space-x-1">
                                            <span className="hidden sm:inline">Enter to send • Shift+Enter for new line</span>
                                            <span className="sm:hidden">↵ Send • ⇧↵ New line</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className={`group relative px-4 md:px-6 py-3 md:py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border overflow-hidden ${
                                    !serviceHealth?.chat_enabled
                                        ? 'bg-gradient-to-r from-red-700 to-red-800 border-red-600 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-slate-700 to-gray-700 hover:from-slate-600 hover:to-gray-600 border-slate-600'
                                }`}
                                disabled={isLoading || !input.trim() || !serviceHealth?.chat_enabled}
                            >
                                <div className="relative z-10 flex items-center space-x-1 md:space-x-2">
                                    {!serviceHealth?.chat_enabled ? (
                                        <X className="w-4 h-4 md:w-5 md:h-5" />
                                    ) : isLoading ? (
                                        <div className="animate-spin w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    ) : (
                                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                                    )}
                                    <span className="text-sm md:text-base">
                                        {!serviceHealth?.chat_enabled ? 'Offline' : isLoading ? 'Thinking' : 'Send'}
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