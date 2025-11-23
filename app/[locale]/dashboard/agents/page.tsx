'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { AgentCard } from './components/AgentCard';

export default function AgentsPage() {
  const t = useTranslations("Dashboard.Agents");

  // Mock data - replace with real data fetching
  const agents = [
    {
      id: '1',
      name: 'Support Bot',
      role: 'Customer Support',
      status: 'active' as const,
      stats: { conversations: 1250, users: 850, satisfaction: 98 }
    },
    {
      id: '2',
      name: 'Sales Assistant',
      role: 'Sales',
      status: 'active' as const,
      stats: { conversations: 850, users: 420, satisfaction: 95 }
    },
    {
      id: '3',
      name: 'Onboarding Helper',
      role: 'Assistant',
      status: 'training' as const,
      stats: { conversations: 120, users: 45, satisfaction: 88 }
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-500 mt-2">{t('subtitle')}</p>
        </div>
        <Link 
          href="/dashboard/agents/create"
          className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium shadow-lg shadow-gray-200"
        >
          <Plus className="w-5 h-5" />
          {t('createAgent')}
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-700">
          <Filter className="w-5 h-5" />
          {t('filter')}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </div>
  );
}
