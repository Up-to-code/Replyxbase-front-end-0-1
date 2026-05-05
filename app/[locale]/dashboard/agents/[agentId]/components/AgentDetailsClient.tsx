'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Power, PlayCircle, Share2, Settings, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { OverviewTab } from './OverviewTab';
import { IntegrationsTab } from './IntegrationsTab';
import { SettingsTab } from './SettingsTab';

interface AgentDetailsClientProps {
  agent: {
    id: string;
    name: string;
    role: string;
    status: string;
    lastActive?: string;
    conversations?: number;
    conversion?: string;
    stats?: {
        conversations: number;
        users: number;
        satisfaction: number;
    }
  };
}

export default function AgentDetailsClient({ agent }: AgentDetailsClientProps) {
  const t = useTranslations("Dashboard.Agents.Detail");
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: 'overview', label: t('tabs.overview'), icon: PlayCircle },
    { id: 'integrations', label: t('tabs.integrations'), icon: Share2 },
    { id: 'settings', label: t('tabs.settings'), icon: Settings },
  ];

  const handleTabChange = (tabId: string) => {
    setIsLoading(true);
    setError(null);
    setActiveTab(tabId);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
      // Simulate random error for demonstration (very low probability)
      if (Math.random() > 0.99) {
        setError('Failed to load tab content. Please try again.');
      }
    }, 500);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/dashboard/agents" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rtl:hidden" />
          <ArrowRight className="w-4 h-4 ltr:hidden" />
          {t("backToAgents")}
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 font-bold text-3xl">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  agent.status === 'active' ? 'bg-green-50 text-green-700 border-green-100' : 
                  agent.status === 'training' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                  'bg-gray-50 text-gray-700 border-gray-100'
                }`}>
                  {agent.status}
                </span>
              </div>
              <p className="text-gray-500">{agent.role} • {t("lastActive", { time: agent.lastActive || 'Just now' })}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors shadow-none">
              <Power className="w-4 h-4" />
              {t("status.pause")}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                isActive 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-700 animate-fade-in">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
          <button 
            onClick={() => handleTabChange(activeTab)}
            className="ml-auto text-sm font-bold hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 animate-fade-in">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-gray-500">Loading content...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'integrations' && <IntegrationsTab />}
            {activeTab === 'settings' && <SettingsTab agent={agent} />}
          </div>
        )}
      </div>
    </div>
  );
}
