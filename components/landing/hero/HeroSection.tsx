"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle, Send, Globe, CheckCircle2, Sparkles, Zap, Cpu, Layers } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const HeroSection = ({ session: initialSession }: { session?: any }) => {
  const { data: session } = authClient.useSession();
  const t = useTranslations("Landing.Hero");
  const tCommon = useTranslations("Common");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const channels = [
    { name: "WhatsApp", icon: MessageCircle, color: "bg-[#25D366]", delay: 0 },
    { name: "Telegram", icon: Send, color: "bg-[#0088cc]", delay: 0.2 },
    { name: "Web", icon: Globe, color: "bg-[#2A4D9A]", delay: 0.4 },
    { name: "API", icon: Cpu, color: "bg-[#8b5cf6]", delay: 0.6 },
    { name: "Slack", icon: Layers, color: "bg-[#4A154B]", delay: 0.8 }
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] ltr:right-[-5%] rtl:left-[-5%] w-[800px] h-[800px] bg-[#2A4D9A]/10 rounded-full blur-3xl opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] ltr:left-[-5%] rtl:right-[-5%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-3xl opacity-60 animate-pulse-slow delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-start lg:rtl:text-right max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A4D9A]/10 text-[#2A4D9A] text-sm font-bold mb-8 border border-[#2A4D9A]/20 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <Sparkles className="w-4 h-4" />
                {t("badge")}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]"
            >
              {t.rich("title", {
                highlight: (chunks) => <span className="text-[#2A4D9A]">{chunks}</span>
              })}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            >
              <Link href={session ? "/dashboard" : "/signup"} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full shadow-xl shadow-[#2A4D9A]/20 hover:shadow-[#2A4D9A]/30 bg-[#2A4D9A] hover:bg-[#1e3a75] text-white transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  {session ? tCommon("dashboard") : tCommon("getStarted")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                {tCommon("watchDemo")}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Convergence Animation */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] flex items-center justify-center scale-90 sm:scale-100"
            >
              {/* Central Platform Hub */}
              <div className="relative z-20 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white ring-1 ring-gray-100">
                 {/* Logo / Brand Representation */}
                 <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-16 h-16 bg-[#2A4D9A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#2A4D9A]/30">
                        <Zap className="w-8 h-8 text-white fill-white" />
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">Replyxbase</span>
                 </div>

                 {/* Pulsing Ripple Effect */}
                 <div className="absolute inset-0 rounded-full border-2 border-[#2A4D9A]/10 animate-ping-slow"></div>
                 <div className="absolute -inset-4 rounded-full border border-[#2A4D9A]/5 animate-pulse"></div>
              </div>

              {/* Converging Channels */}
              {channels.map((channel, index) => {
                  const angle = (index * 360) / channels.length - 90; // Start from top
                  const radius = isMobile ? 130 : 220; 
                  
                  return (
                      <motion.div
                          key={index}
                          className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 z-10"
                          initial={{ x: Math.cos(angle * Math.PI / 180) * radius, y: Math.sin(angle * Math.PI / 180) * radius, opacity: 0 }}
                          animate={{ 
                              x: [
                                  Math.cos(angle * Math.PI / 180) * radius, // Start
                                  Math.cos(angle * Math.PI / 180) * (radius - 20), // Move in
                                  Math.cos(angle * Math.PI / 180) * radius // Move out slightly
                              ],
                              opacity: 1
                          }}
                          transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                              delay: channel.delay
                          }}
                      >
                          {/* Connection Beam */}
                          <div 
                            className="absolute top-1/2 left-1/2 h-[2px] bg-gradient-to-r from-transparent to-[#2A4D9A]/30 origin-left -z-10"
                            style={{ 
                                width: radius - 80, // Distance to center roughly
                                transform: `rotate(${angle + 180}deg)`,
                                left: "50%",
                                top: "50%"
                             }}
                          />

                          {/* Icon Card */}
                          <div className={`w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center relative group hover:scale-110 transition-transform`}>
                              <div className={`w-10 h-10 ${channel.color} rounded-xl flex items-center justify-center text-white`}>
                                  <channel.icon className="w-5 h-5" />
                              </div>
                          </div>
                      </motion.div>
                  );
              })}

              {/* Floating Success Indicators */}
               <motion.div
                animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-0 right-10 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 z-30"
              >
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold text-gray-700">Data Synced</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
