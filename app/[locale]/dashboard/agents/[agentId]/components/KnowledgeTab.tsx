import React from 'react';
import { useTranslations } from 'next-intl';

export const KnowledgeTab = () => {
  const t = useTranslations("Dashboard.Agents.Detail");

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900">{t("knowledge.title")}</h3>
          <p className="text-sm text-gray-500">{t("knowledge.subtitle")}</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-colors">
          {t("knowledge.manage")}
        </button>
      </div>
      <div className="space-y-3">
        {['Product Documentation', 'FAQ Database', 'Company Policy'].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-medium text-gray-700">{item}</span>
            </div>
            <span className="text-xs text-gray-400">Synced</span>
          </div>
        ))}
      </div>
    </div>
  );
};
