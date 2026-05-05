"use client";

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, Building2, Loader2, Check, Users, Mail, Trash2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export const OrganizationSettings: React.FC = () => {
  const t = useTranslations("Dashboard.Settings.Organization");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Get active organization from Better Auth
  const { data: activeOrg, isPending: isLoadingOrg } = authClient.useActiveOrganization();
  const [orgName, setOrgName] = useState(activeOrg?.name || "");
  const [orgSlug, setOrgSlug] = useState(activeOrg?.slug || "");
  const [logoUrl, setLogoUrl] = useState(activeOrg?.logo || "");

  // Update org name when active org changes
  React.useEffect(() => {
    if (activeOrg) {
      setOrgName(activeOrg.name);
      setOrgSlug(activeOrg.slug);
      setLogoUrl(activeOrg.logo || "");
    }
  }, [activeOrg]);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setLogoUrl(URL.createObjectURL(file));
    toast.success("Logo preview updated");
    setIsUploading(false);
  };

  const handleSave = async () => {
    if (!activeOrg) {
      toast.error("No active organization");
      return;
    }

    setIsSaving(true);
    try {
      await authClient.organization.update({
        organizationId: activeOrg.id,
        name: orgName,
        slug: orgSlug,
        logo: logoUrl,
      });
      
      toast.success("Organization settings updated!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to update organization");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingOrg) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-[#2A4D9A]" />
      </div>
    );
  }

  if (!activeOrg) {
    return (
      <div className="animate-fade-in">
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Organization</h3>
          <p className="text-gray-500">Please select or create an organization to manage settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
        <p className="text-base text-gray-500 mt-2">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {/* Logo Upload */}
        <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center border border-gray-200 overflow-hidden">
            {logoUrl ? (
              <img src={logoUrl} alt="Organization logo" className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div>
            <label className="inline-block">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={isUploading}
                className="hidden"
              />
              <span className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl cursor-pointer transition-colors font-medium text-sm text-gray-700">
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    {t("form.logo")}
                  </>
                )}
              </span>
            </label>
            <p className="text-sm text-gray-500 mt-3">Recommended size: 512x512px</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-8">
          <div className="grid gap-3">
            <label className="text-sm font-semibold text-gray-700">{t("form.name")}</label>
            <input 
              type="text" 
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="bg-gray-50 border border-transparent focus:bg-white focus:border-[#2A4D9A] focus:ring-2 focus:ring-[#2A4D9A]/10 rounded-xl px-5 py-4 text-base text-gray-900 transition-all duration-200 outline-none"
            />
          </div>

          <div className="grid gap-3">
            <label className="text-sm font-semibold text-gray-700">{t("form.domain")}</label>
            <div className="flex items-center">
              <input 
                type="text" 
                value={orgSlug}
                onChange={(e) => setOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                className="bg-gray-50 border border-transparent focus:bg-white focus:border-[#2A4D9A] focus:ring-2 focus:ring-[#2A4D9A]/10 rounded-l-xl px-5 py-4 text-base text-gray-900 transition-all duration-200 flex-1 outline-none"
              />
              <span className="bg-gray-100 border-l-0 border border-gray-200 text-gray-600 px-6 py-4 text-base rounded-r-xl font-medium">
                .replyxbase.com
              </span>
            </div>
          </div>
        </div>

        {/* Organization Details */}
        <div className="grid gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Organization Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Organization ID</p>
              <p className="text-sm font-mono text-gray-900 bg-white px-3 py-2 rounded-lg border border-gray-200">
                {activeOrg.id}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Created</p>
              <p className="text-sm text-gray-900">
                {new Date(activeOrg.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-8 border-t border-gray-100 flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || isUploading}
            className="px-8 py-3.5 bg-[#2A4D9A] hover:bg-blue-800 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                {t("form.save")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
