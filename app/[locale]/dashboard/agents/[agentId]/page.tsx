'use client';

import React, { use, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Power, PlayCircle, Database, Share2, Settings, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { OverviewTab } from './components/OverviewTab';
import { KnowledgeTab } from './components/KnowledgeTab';
import { IntegrationsTab } from './components/IntegrationsTab';
import { SettingsTab } from './components/SettingsTab';

export default function AgentDashboardPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = use(params);
  const t = useTranslations("Dashboard.Agents.Detail");
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Mock data
  const agent = {
    id: agentId,
    name: 'Support Bot',
    role: 'Customer Support',
    status: 'active',
    lastActive: '2 mins ago'
  };

  const tabs = [
    { id: 'overview', label: t('tabs.overview'), icon: PlayCircle },
    { id: 'knowledge', label: t('tabs.knowledge'), icon: Database },
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
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rtl:hidden" />
          <ArrowRight className="w-4 h-4 ltr:hidden" />
          {t("backToAgents")}
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-900 font-bold text-3xl">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-gray-900">{agent.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                  {agent.status}
                </span>
              </div>
              <p className="text-gray-500">{agent.role} • {t("lastActive", { time: agent.lastActive })}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 font-medium transition-colors">
              <Power className="w-4 h-4" />
              {t("status.pause")}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
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
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 animate-fade-in">
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
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-500">Loading content...</p>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'knowledge' && <KnowledgeTab />}
            {activeTab === 'integrations' && <IntegrationsTab />}
            {activeTab === 'settings' && <SettingsTab agent={agent} />}
          </>
        )}
      </div>
    </div>
  );
}
