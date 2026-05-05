'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createAgent } from '@/app/actions/agents';
import { MessageSquare, Check, Brain, Calendar, Users, ChevronDown, Loader2, Sparkles, Zap, Building, ShoppingBag, HeartPulse, Cpu, Banknote, MoreHorizontal } from 'lucide-react';

export const CreateAgentForm: React.FC = () => {
  const t = useTranslations("Dashboard.Agents.Create");
  // Default all capabilities to selected
  const [capabilities, setCapabilities] = useState<string[]>(['crm', 'booking', 'support']);
  const [selectedModel, setSelectedModel] = useState('gpt4');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);

  const industries = [
    { id: 'realEstate', label: 'industries.realEstate', icon: Building },
    { id: 'ecommerce', label: 'industries.ecommerce', icon: ShoppingBag },
    { id: 'healthcare', label: 'industries.healthcare', icon: HeartPulse },
    { id: 'technology', label: 'industries.technology', icon: Cpu },
    { id: 'finance', label: 'industries.finance', icon: Banknote },
    { id: 'other', label: 'industries.other', icon: MoreHorizontal },
  ];

  const toggleCapability = (cap: string) => {
    setCapabilities(prev => 
      prev.includes(cap) ? prev.filter(c => c !== cap) : [...prev, cap]
    );
  };

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const result = await createAgent({
        name,
        model: selectedModel,
        capabilities,
        industry: selectedIndustry,
        systemPrompt,
      });

      if (result.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error creating agent:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 animate-fade-in">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
          <Check className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("successTitle")}</h2>
        <p className="text-gray-500 mb-8">{t("successSubtitle")}</p>
        <button 
          onClick={() => window.location.href = '/dashboard/agents'}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          {t("goToDashboard")}
        </button>
      </div>
    );
  }

  const models = [
    { id: 'gpt4', name: 'GPT-4o', icon: Sparkles, desc: 'Best for complex reasoning' },
    { id: 'claude', name: 'Claude 3.5 Sonnet', icon: Brain, desc: 'Natural & articulate' },
    { id: 'gemini', name: 'Gemini 1.5 Pro', icon: Zap, desc: 'Fast & multimodal' },
  ];

  const selectedModelData = models.find(m => m.id === selectedModel);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex-1 bg-white border border-gray-100 rounded-xl p-8 min-h-[600px]">
        <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t("basicInfo.title")}</h2>
              <p className="text-gray-500 mt-2">{t("basicInfo.subtitle")}</p>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-2">
                <label className="text-sm font-semibold text-gray-900">{t("form.name")}</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("form.namePlaceholder")}
                  className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base transition-all"
                />
              </div>

              <div className="grid gap-2 relative">
                <label className="text-sm font-semibold text-gray-900">{t("form.model")}</label>
                <button 
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="w-full flex items-center justify-between bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 border-2 rounded-xl px-5 py-4 text-base transition-all"
                >
                  <div className="flex items-center gap-3">
                    {selectedModelData && <selectedModelData.icon className="w-5 h-5 text-gray-900" />}
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{selectedModelData?.name}</div>
                      <div className="text-xs text-gray-500">{selectedModelData?.desc}</div>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isModelDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model.id);
                          setIsModelDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <model.icon className="w-5 h-5 text-gray-700" />
                        <div>
                          <div className="font-semibold text-gray-900">{model.name}</div>
                          <div className="text-xs text-gray-500">{model.desc}</div>
                        </div>
                        {selectedModel === model.id && <Check className="w-4 h-4 text-gray-900 ml-auto" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-gray-900">{t("form.capabilities")}</label>
                <div className="grid gap-3">
                  {[
                    { id: 'crm', icon: Users, label: 'capabilitiesList.crm' },
                    { id: 'booking', icon: Calendar, label: 'capabilitiesList.booking' },
                    { id: 'support', icon: MessageSquare, label: 'capabilitiesList.support' },
                  ].map((cap) => {
                    const Icon = cap.icon;
                    const isSelected = capabilities.includes(cap.id);
                    return (
                      <button
                        key={cap.id}
                        onClick={() => toggleCapability(cap.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left rtl:text-right
                          ${isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? 'bg-white' : 'bg-gray-100'}`}>
                            <Icon className="w-5 h-5 text-gray-700" />
                          </div>
                          <span className="font-semibold text-gray-900">{t(cap.label)}</span>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-gray-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="max-w-2xl space-y-8">
              <div className="grid gap-2 relative">
                <label className="text-sm font-semibold text-gray-900">{t("industry")}</label>
                <button 
                  onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                  className="w-full flex items-center justify-between bg-gray-50 border-transparent hover:bg-white hover:border-gray-200 border-2 rounded-xl px-5 py-4 text-base transition-all"
                >
                  <div className="flex items-center gap-3">
                    {selectedIndustry ? (
                      <>
                        {(() => {
                          const industry = industries.find(i => i.id === selectedIndustry);
                          const Icon = industry?.icon;
                          return Icon ? <Icon className="w-5 h-5 text-gray-900" /> : null;
                        })()}
                        <span className="font-semibold text-gray-900">
                          {industries.find(i => i.id === selectedIndustry) 
                            ? t(industries.find(i => i.id === selectedIndustry)!.label)
                            : ''}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500">{t("industry")}</span>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isIndustryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isIndustryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-10 overflow-hidden max-h-60 overflow-y-auto">
                    {industries.map((industry) => (
                      <button
                        key={industry.id}
                        onClick={() => {
                          setSelectedIndustry(industry.id);
                          setIsIndustryDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <industry.icon className="w-5 h-5 text-gray-700" />
                        <span className="font-semibold text-gray-900">{t(industry.label)}</span>
                        {selectedIndustry === industry.id && <Check className="w-4 h-4 text-gray-900 ml-auto" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-semibold text-gray-900">System prompt</label>
                <textarea 
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  placeholder="Describe how this agent should answer customers."
                  className="w-full h-32 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl px-5 py-4 text-base transition-all resize-none"
                />
              </div>
            </div>
          </div>

        <div className="flex items-center justify-end pt-8 mt-8 border-t border-gray-100">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-none disabled:opacity-70 disabled:cursor-not-allowed
              ${isSubmitting ? 'pl-6 pr-8' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              t("common.create")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
