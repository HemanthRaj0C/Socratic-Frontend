'use client';
import { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

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
        return <div className="flex h-screen w-full items-center justify-center bg-gray-900"><p className="text-white animate-pulse">Loading User...</p></div>;
    }
    
    if (!user) {
        return <div className="flex h-screen w-full items-center justify-center bg-gray-900"><p className="text-white animate-pulse">Redirecting...</p></div>;
    }

    return (
        <div className="flex h-screen bg-gray-900 text-white font-sans">
            <aside className="w-64 bg-gray-800 p-2 flex flex-col flex-shrink-0">
                <div className="flex justify-between items-center mb-4 p-2 flex-shrink-0">
                    <h2 className="text-lg font-semibold">Chats</h2>
                    <Link href="/chat" className="p-2 rounded-md hover:bg-gray-700" title="New Chat">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </Link>
                </div>
                <nav className="flex-grow overflow-y-auto space-y-1">
                    {conversations.map(convo => {
                        const isActive = pathname === `/chat/${convo.id}`;
                        return (
                            <Link key={convo.id} href={`/chat/${convo.id}`} className={`block w-full text-left p-2 rounded-md truncate text-sm transition-colors ${isActive ? 'bg-blue-600 font-semibold' : 'hover:bg-gray-700'}`}>
                                {convo.title}
                            </Link>
                        )
                    })}
                </nav>
                <div className="pt-2 mt-2 border-t border-gray-700 flex-shrink-0">
                    <div className='flex items-center gap-2 p-2'>
                        <span className='text-sm truncate'>{user.displayName || user.email}</span>
                        <button onClick={logout} className="ml-auto px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700 transition-colors">Logout</button>
                    </div>
                </div>
            </aside>
            <main className="flex-grow flex flex-col">{children}</main>
        </div>
    );
}