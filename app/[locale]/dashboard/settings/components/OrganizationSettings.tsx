import React from 'react';
import { useTranslations } from 'next-intl';
import { Upload, Building2 } from 'lucide-react';

export const OrganizationSettings: React.FC = () => {
  const t = useTranslations("Dashboard.Settings.Organization");

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
        <p className="text-base text-gray-500 mt-2">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {/* Logo Upload */}
        <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center border border-gray-100">
            <Building2 className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <button className="flex items-center gap-3 text-sm font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 px-6 py-3 rounded-xl transition-colors">
              <Upload className="w-5 h-5" />
              {t("form.logo")}
            </button>
            <p className="text-sm text-gray-500 mt-3">Recommended size: 512x512px</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-8">
          <div className="grid gap-3">
            <label className="text-sm font-semibold text-gray-700">{t("form.name")}</label>
            <input 
              type="text" 
              defaultValue="Acme Corp"
              className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base text-gray-900 transition-all duration-200"
            />
          </div>

          <div className="grid gap-3">
            <label className="text-sm font-semibold text-gray-700">{t("form.domain")}</label>
            <div className="flex items-center">
              <input 
                type="text" 
                defaultValue="acme"
                className="bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-l-xl px-5 py-4 text-base text-gray-900 transition-all duration-200 flex-1"
              />
              <span className="bg-gray-100 border-l-0 border border-transparent text-gray-500 px-6 py-4 text-base rounded-r-xl font-medium">
                .anan.ai
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 border-t border-gray-100">
          <button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all">
            {t("form.save")}
          </button>
        </div>
      </div>
    </div>
  );
};
