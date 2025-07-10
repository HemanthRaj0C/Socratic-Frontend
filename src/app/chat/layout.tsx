'use client';
import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DotGrid from '@/components/DotGrid/DotGrid';
import { MessageCircle, Plus, MessageSquare, LogOut } from 'lucide-react';

interface Conversation { id: string; title: string; createdAt?: any; }

export default function ChatLayout({ children }: { children: ReactNode }) {
    const { user, logout, loading } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const fetchConversations = async () => {
                try {
                    const idToken = await user.getIdToken();
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations`, {
                        headers: { 'Authorization': `Bearer ${idToken}` },
                    });
                    if (response.ok) {
                        const conversations = await response.json();
                        setConversations(conversations);
                    } else {
                        console.error('Failed to fetch conversations:', response.status);
                        setConversations([]);
                    }
                } catch (error) {
                    console.error('Error fetching conversations:', error);
                    setConversations([]);
                }
            };
            fetchConversations();
        }
    }, [user, pathname]); // Refetch when path changes (e.g., after new chat is created)

    // Handle redirect for unauthenticated users
    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white animate-pulse">Loading User...</p>
                </div>
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white animate-pulse">Redirecting...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-screen overflow-hidden">
            {/* Mobile Overlay */}
            <div 
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-opacity duration-300" 
                id="mobile-overlay"
                onClick={() => {
                    document.getElementById('sidebar')?.classList.add('-translate-x-full');
                    document.getElementById('mobile-overlay')?.classList.add('opacity-0', 'pointer-events-none');
                    setIsSidebarOpen(false);
                }}
            ></div>
            
            {/* Floating Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 p-2 md:p-4 w-64 md:w-72 z-50 bg-black/20 backdrop-blur-md border border-white/10 flex flex-col transform -translate-x-full md:translate-x-0 transition-transform duration-300" id="sidebar">
                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 md:mb-6 pb-3 md:pb-4 border-b border-white/10">
                        <h2 className="text-base md:text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-2">
                            <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                            <span>Conversations</span>
                        </h2>
                        <div className="flex items-center space-x-1">
                            <Link 
                                href="/chat" 
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group" 
                                title="New Chat"
                            >
                                <Plus className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white transition-colors" />
                            </Link>
                            {/* Mobile Close Button */}
                            <button 
                                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                                onClick={() => {
                                    document.getElementById('sidebar')?.classList.add('-translate-x-full');
                                    document.getElementById('mobile-overlay')?.classList.add('opacity-0', 'pointer-events-none');
                                    setIsSidebarOpen(false);
                                }}
                            >
                                <span className="text-gray-400 hover:text-white">×</span>
                            </button>
                        </div>
                    </div>

                    {/* Conversations List */}
                    <nav className="flex-grow overflow-y-auto space-y-2 mb-4 md:mb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
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
                        {conversations.length === 0 ? (
                            <div className="text-center py-6 md:py-8">
                                <div className="flex justify-center mb-2">
                                    <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-400 text-xs md:text-sm">No conversations yet</p>
                                <p className="text-gray-500 text-xs mt-1">Start a new chat to begin</p>
                            </div>
                        ) : (
                            conversations.map(convo => {
                                const isActive = pathname === `/chat/${convo.id}`;
                                return (
                                    <Link 
                                        key={convo.id} 
                                        href={`/chat/${convo.id}`} 
                                        className={`block w-full text-left p-2 md:p-3 rounded-lg text-xs md:text-sm transition-all duration-200 ${
                                            isActive 
                                                ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border border-blue-500/30' 
                                                : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                                        }`}
                                        onClick={() => {
                                            // Close sidebar on mobile when selecting a conversation
                                            if (window.innerWidth < 768) {
                                                document.getElementById('sidebar')?.classList.add('-translate-x-full');
                                                document.getElementById('mobile-overlay')?.classList.add('opacity-0', 'pointer-events-none');
                                                setIsSidebarOpen(false);
                                            }
                                        }}
                                    >
                                        <div className="truncate font-medium">{convo.title}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            {convo.createdAt ? new Date(convo.createdAt).toLocaleDateString() : 'Recent conversation'}
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="pt-3 md:pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white/5 rounded-lg">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold flex-shrink-0">
                                {user.displayName?.[0] || user.email?.[0] || 'U'}
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="text-xs md:text-sm font-medium text-white truncate">
                                    {user.displayName || user.email}
                                </div>
                                <div className="text-xs text-gray-400">Signed in</div>
                            </div>
                            <button 
                                onClick={logout} 
                                className="px-2 md:px-3 py-1 bg-red-600/80 hover:bg-red-600 rounded-lg text-xs font-medium transition-colors duration-200 flex-shrink-0 flex items-center space-x-1"
                                title="Sign out"
                            >
                                <LogOut className="w-3 h-3" />
                                <span className="hidden md:inline">Exit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Menu Button */}
            {!isSidebarOpen && (
                <button 
                    className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-lg text-white"
                    id='mobile-menu-button'
                    onClick={() => {
                        document.getElementById('sidebar')?.classList.remove('-translate-x-full');
                        document.getElementById('mobile-overlay')?.classList.remove('opacity-0', 'pointer-events-none');
                        setIsSidebarOpen(true);
                    }}
                >
                    <MessageCircle className="w-5 h-5" />
                </button>
            )}

            {/* Main Content - Fixed positioning to avoid scroll conflicts */}
            <main className="fixed top-0 right-0 bottom-0 left-0 md:left-72 overflow-hidden">
                {children}
            </main>
        </div>
    );
}