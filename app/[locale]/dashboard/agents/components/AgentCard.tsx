'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { MoreHorizontal, MessageSquare, Users, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AgentCardProps {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'training';
  stats: {
    conversations: number;
    users: number;
    satisfaction: number;
  };
}

export const AgentCard: React.FC<AgentCardProps> = ({ id, name, role, status, stats }) => {
  const t = useTranslations("Dashboard.Agents.Card");

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    training: 'bg-primary/10 text-primary'
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-all duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 font-bold text-xl border border-gray-100 group-hover:scale-105 transition-transform">
            {name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
            <p className="text-sm text-gray-500 capitalize">{role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
          <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-gray-50">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <MessageSquare className="w-4 h-4" />
          </div>
          <p className="font-bold text-gray-900">{stats.conversations}</p>
          <p className="text-xs text-gray-500">{t('conversations')}</p>
        </div>
        <div className="text-center border-x border-gray-50">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <Users className="w-4 h-4" />
          </div>
          <p className="font-bold text-gray-900">{stats.users}</p>
          <p className="text-xs text-gray-500">{t('users')}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
            <Activity className="w-4 h-4" />
          </div>
          <p className="font-bold text-gray-900">{stats.satisfaction}%</p>
          <p className="text-xs text-gray-500">{t('satisfaction')}</p>
        </div>
      </div>

      <Link 
        href={`/dashboard/agents/${id}`}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 text-gray-900 font-medium hover:bg-primary hover:text-primary-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground"
      >
        {t('viewDashboard')}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
