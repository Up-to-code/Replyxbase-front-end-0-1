import React, { use } from 'react';
import { getTranslations } from 'next-intl/server';
import { agentsList } from '@/app/lib/mock-data';
import AgentDetailsClient from './components/AgentDetailsClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = await params;
  const agent = agentsList.find(a => a.id === agentId);
  const t = await getTranslations("Dashboard.Agents.Detail");

  if (!agent) {
    return {
      title: t("notFoundTitle"),
    };
  }

  return {
    title: `${agent.name} - ${t("title")}`,
  };
}

export default function AgentDashboardPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = use(params);
  
  // In a real app, fetch from API/DB
  const agent = agentsList.find(a => a.id === agentId);

  if (!agent) {
    notFound();
  }

  return <AgentDetailsClient agent={agent} />;
}
