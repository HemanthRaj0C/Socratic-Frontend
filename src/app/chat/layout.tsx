'use client';
import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import DotGrid from '@/components/DotGrid/DotGrid';

interface Conversation { id: string; title: string; }

export default function ChatLayout({ children }: { children: ReactNode }) {
    const { user, logout, loading } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const fetchConversations = async () => {
                const idToken = await user.getIdToken();
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/conversations`, {
                    headers: { 'Authorization': `Bearer ${idToken}` },
                });
                if (response.ok) setConversations(await response.json());
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
            {/* Floating Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 p-4 w-72 z-50 bg-black/20 backdrop-blur-md border border-white/10 flex flex-col">
                <div className="relative z-10 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                        <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            💬 Conversations
                        </h2>
                        <Link 
                            href="/chat" 
                            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group" 
                            title="New Chat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Conversations List */}
                    <nav className="flex-grow overflow-y-auto space-y-2 mb-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                        {conversations.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-3xl mb-2">💭</div>
                                <p className="text-gray-400 text-sm">No conversations yet</p>
                                <p className="text-gray-500 text-xs mt-1">Start a new chat to begin</p>
                            </div>
                        ) : (
                            conversations.map(convo => {
                                const isActive = pathname === `/chat/${convo.id}`;
                                return (
                                    <Link 
                                        key={convo.id} 
                                        href={`/chat/${convo.id}`} 
                                        className={`block w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                                            isActive 
                                                ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border border-blue-500/30' 
                                                : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                                        }`}
                                    >
                                        <div className="truncate font-medium">{convo.title}</div>
                                        <div className="text-xs text-gray-400 mt-1">Recent conversation</div>
                                    </Link>
                                );
                            })
                        )}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                                {user.displayName?.[0] || user.email?.[0] || 'U'}
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                    {user.displayName || user.email}
                                </div>
                                <div className="text-xs text-gray-400">Signed in</div>
                            </div>
                            <button 
                                onClick={logout} 
                                className="px-3 py-1 bg-red-600/80 hover:bg-red-600 rounded-lg text-xs font-medium transition-colors duration-200 flex-shrink-0"
                                title="Sign out"
                            >
                                🚪
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content - Fixed positioning to avoid scroll conflicts */}
            <main className="fixed top-0 right-0 bottom-0 left-72 overflow-hidden">
                {children}
            </main>
        </div>
    );
}