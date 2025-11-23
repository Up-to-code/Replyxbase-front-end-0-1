import React from 'react';
import { useTranslations } from 'next-intl';
import { Share2 } from 'lucide-react';

export const IntegrationsTab = () => {
  const t = useTranslations("Dashboard.Agents.Detail");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900">{t("integrations.title")}</h3>
          <p className="text-sm text-gray-500">{t("integrations.subtitle")}</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors">
          {t("integrations.add")}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['WhatsApp', 'Telegram'].map((channel) => (
          <div key={channel} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-gray-600" />
              </div>
              <span className="font-medium text-gray-900">{channel}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
