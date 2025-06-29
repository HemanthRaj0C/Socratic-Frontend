// src/app/page.tsx
'use client';

import { useAuth } from "@/context/AuthContext";
import PageLayout from '@/components/layout/PageLayout';
import WelcomePage from '@/components/pages/WelcomePage';
import LandingPage from '@/components/pages/LandingPage';

export default function RootPage() {
  const { user, loading, login } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <p className="text-white animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <PageLayout>
      {user ? (
        <WelcomePage user={user} />
      ) : (
        <LandingPage onLogin={login} />
      )}
    </PageLayout>
  );
}