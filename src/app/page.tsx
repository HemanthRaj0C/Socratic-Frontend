// src/app/page.tsx
'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <p className="text-white animate-pulse">Loading...</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">🎓 Welcome back!</h1>
        <p className="text-lg text-gray-400 mb-8">Ready to continue your learning journey?</p>
        <button 
          onClick={() => router.push('/chat')} 
          className="px-6 py-3 bg-green-600 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Go to Chat
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-4">🎓 Socratic AI Tutor</h1>
        <p className="text-lg text-gray-400 mb-8">A better way to learn with AI.</p>
        <button onClick={login} className="px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Login with Google to Begin
        </button>
    </div>
  );
}