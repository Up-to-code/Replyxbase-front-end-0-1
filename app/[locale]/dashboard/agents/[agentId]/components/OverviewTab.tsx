import React from 'react';
import { useTranslations } from 'next-intl';
import { AgentStats } from '../../components/AgentStats';

export const OverviewTab = () => {
  const t = useTranslations("Dashboard.Agents.Detail");

  return (
    <div className="space-y-8 animate-fade-in">
      <AgentStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-4">{t("activity.title")}</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-300" />
                  {i !== 2 && <div className="w-0.5 h-full bg-gray-100 my-1" />}
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">Resolved customer query regarding pricing</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
