import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-100/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl text-gray-900 tracking-tight">
            ChatLink
          </span>
        </Link>
      </div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 text-center text-sm text-gray-500">
        &copy; {year} ChatLink Inc.
      </div>
    </div>
  );
}
