"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Send, Globe, Mail, ArrowDown, Bot, User, CheckCircle2 } from "lucide-react";

const OmnichannelFlow = () => {
  const t = useTranslations("Landing.Features.Omnichannel");

  const channels = [
    { icon: MessageCircle, color: "text-green-500", bg: "bg-green-50", label: "WhatsApp" },
    { icon: Send, color: "text-blue-500", bg: "bg-blue-50", label: "Telegram" },
    { icon: Globe, color: "text-indigo-500", bg: "bg-indigo-50", label: "Website" },
    { icon: Mail, color: "text-red-500", bg: "bg-red-50", label: "Email" },
  ];

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Channels Row */}
          <div className="flex justify-between items-center mb-12 px-4 lg:px-12">
            {channels.map((channel, index) => (
              <div key={index} className="flex flex-col items-center gap-3 relative group">
                <div className={`w-16 h-16 rounded-2xl ${channel.bg} flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300`}>
                  <channel.icon className={`w-8 h-8 ${channel.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-600">{channel.label}</span>
                
                {/* Flow Line */}
                <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: 60, opacity: 1 }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-gray-200 to-blue-500"
                />
                <motion.div 
                    initial={{ opacity: 0, y: 0 }}
                    whileInView={{ opacity: [0, 1, 0], y: 60 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Central AI Processor */}
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12 mx-auto max-w-2xl">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
                <Bot className="w-6 h-6 text-white" />
            </div>
            
            <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Processing Stream</span>
                    <span className="text-green-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Active
                    </span>
                </div>
                
                {/* Mock Processing Items */}
                {[1, 2, 3].map((i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 text-xs font-bold text-gray-500">
                            {i}
                        </div>
                        <div className="flex-1">
                            <div className="h-2 bg-gray-200 rounded w-3/4 mb-2" />
                            <div className="h-2 bg-gray-200 rounded w-1/2" />
                        </div>
                        <div className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                            Analyzing
                        </div>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Output: Unified Inbox Preview */}
          <div className="text-center">
            <ArrowDown className="w-8 h-8 text-gray-300 mx-auto mb-4 animate-bounce" />
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 inline-flex items-center gap-3 px-6 py-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-900">Unified Customer Profile Created</span>
                <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OmnichannelFlow;
