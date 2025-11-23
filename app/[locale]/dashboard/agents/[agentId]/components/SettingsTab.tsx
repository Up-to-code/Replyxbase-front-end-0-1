import React from 'react';
import { useTranslations } from 'next-intl';

interface SettingsTabProps {
  agent: {
    name: string;
    role: string;
  };
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ agent }) => {
  const t = useTranslations("Dashboard.Agents.Detail");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-fade-in max-w-2xl">
      <div className="mb-6">
        <h3 className="font-bold text-gray-900">{t("settingsTab.title")}</h3>
        <p className="text-sm text-gray-500">{t("settingsTab.subtitle")}</p>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Agent Name</label>
          <input 
            type="text" 
            defaultValue={agent.name}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input 
            type="text" 
            defaultValue={agent.role}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>
        <div className="pt-4">
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
            {t("settingsTab.save")}
          </button>
        </div>
      </div>
    </div>
  );
};
