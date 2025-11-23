'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Zap, MessageCircle, Users, BarChart3, Bot, Play, Rocket,
  CheckCircle2, Star, Check, Linkedin, Instagram,
  MessageSquare, Send, Sparkles, Globe, Code,
  Brain, Workflow, Menu, X as CloseIcon,
  ShieldCheck, MessageSquareText, Pause, ArrowRight,
  MoveRight, Layers, Command, ChevronDown, Plus,
  Cpu, Share2, Zap as ZapIcon, Slack, Trello, Figma, Github, Mail,
  XCircle, CheckCircle, Database, UserPlus, Quote, X, Building, ShoppingBag, HeartPulse, Banknote
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";
import FeatureInbox from "./features/FeatureInbox";
import FeatureAgents from "./features/FeatureAgents";
import FeatureCRM from "./features/FeatureCRM";
import FeatureAnalytics from "./features/FeatureAnalytics";
import HeroSection from "./hero/HeroSection";
import OmnichannelFlow from "./features/OmnichannelFlow";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

// --- Animations ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Components ---


const Marquee = () => {
    const t = useTranslations("Landing.Marquee");
    const industries = [
        { icon: Building, label: "realEstate" },
        { icon: ShoppingBag, label: "ecommerce" },
        { icon: HeartPulse, label: "healthcare" },
        { icon: Cpu, label: "technology" },
        { icon: Banknote, label: "finance" },
        { icon: MessageCircle, label: "whatsapp" },
        { icon: Send, label: "telegram" },
        { icon: Globe, label: "website" },
    ];

    return (
        <div className="py-16 bg-white border-b border-gray-100 overflow-hidden relative" dir="ltr">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
            
            <div className="flex w-max gap-16 animate-marquee">
                {[...Array(4)].map((_, i) => (
                    <React.Fragment key={i}>
                        {industries.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-xl font-bold text-gray-400 hover:text-blue-600 transition-colors cursor-default">
                                <item.icon className="w-8 h-8" />
                                <span>{t(item.label)}</span>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};



const TestimonialCard = ({ quote, author, role, company }: { quote: string, author: string, role: string, company: string }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div className="mb-6">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 inline-block fill-yellow-400" />
            ))}
        </div>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">"{quote}"</p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg group-hover:scale-110 transition-transform">
                {author[0]}
            </div>
            <div>
                <div className="font-bold text-gray-900">{author}</div>
                <div className="text-sm text-gray-500">{role}, {company}</div>
            </div>
        </div>
    </div>
);

const TestimonialsSection = () => {
    const t = useTranslations("Landing.Testimonials");
    return (
        <section className="py-32 bg-gray-50/50 border-y border-gray-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">{t("title")}</h2>
                    <p className="text-xl text-gray-600">{t("subtitle")}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <TestimonialCard 
                        quote={t("quote1")}
                        author={t("author1")}
                        role={t("role1")}
                        company={t("company1")}
                    />
                    <TestimonialCard 
                        quote={t("quote2")}
                        author={t("author2")}
                        role={t("role2")}
                        company={t("company2")}
                    />
                    <TestimonialCard 
                        quote={t("quote3")}
                        author={t("author3")}
                        role={t("role3")}
                        company={t("company3")}
                    />
                </div>
            </div>
        </section>
    );
};

const PricingCard = ({
  name,
  price,
  description,
  features,
  highlight = false,
  isAnnual,
  tCommon
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  isAnnual: boolean;
  tCommon: any;
}) => (
  <div className={`h-full p-10 rounded-[2rem] flex flex-col transition-all duration-300 relative ${highlight ? 'bg-gray-900 text-white shadow-2xl scale-105 z-10 ring-1 ring-gray-900' : 'bg-white border border-gray-100 text-gray-900 hover:shadow-xl hover:-translate-y-1'}`}>
        {highlight && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg shadow-blue-600/30">
                Most Popular
            </div>
        )}
        <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${highlight ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold tracking-tight">{price}</span>
                <span className={`text-lg ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>{isAnnual ? '/mo' : '/mo'}</span>
            </div>
            <p className={`text-base ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        </div>
        <Separator className={`mb-8 ${highlight ? 'bg-gray-800' : 'bg-gray-100'}`} />
        <ul className="space-y-5 mb-10 flex-1">
            {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-base">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${highlight ? 'bg-blue-500/20' : 'bg-blue-50'}`}>
                        <Check className={`w-4 h-4 ${highlight ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <span className={highlight ? 'text-gray-300' : 'text-gray-700'}>{f}</span>
                </li>
            ))}
        </ul>
        <Button 
            variant={highlight ? 'primary' : 'outline'} 
            className={`w-full rounded-2xl h-14 text-lg font-semibold transition-all ${highlight ? 'bg-white text-gray-900 hover:bg-gray-100 border-none' : 'border-2 border-gray-100 hover:border-gray-900 hover:bg-transparent text-gray-900'}`}
            aria-label={`Get Started with ${name} plan`}
        >
            {tCommon("getStarted")}
        </Button>
  </div>
);

const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(true);
    const t = useTranslations("Landing.Pricing");
    const tCommon = useTranslations("Common");

    return (
      <section id="pricing" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">{t("title")}</h2>
            <p className="text-xl text-gray-600 mb-10">{t("subtitle")}</p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-100 rounded-full w-fit mx-auto border border-gray-200">
                <button 
                    onClick={() => setIsAnnual(false)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${!isAnnual ? 'bg-white shadow-md text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    {t("monthly")}
                </button>
                <button 
                    onClick={() => setIsAnnual(true)}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-white shadow-md text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    {t("yearly")} <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide">{t("save")}</span>
                </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
            <PricingCard 
                name={t("starter")}
                price="$0"
                description={t("starterDesc")}
                features={[t("features.1agent"), t("features.100conv"), t("features.community")]}
                isAnnual={isAnnual}
                tCommon={tCommon}
            />
            <PricingCard 
                name={t("pro")}
                price={isAnnual ? "$39" : "$49"}
                description={t("proDesc")}
                features={[t("features.3agents"), t("features.unlimitedConv"), t("features.priority"), t("features.analytics"), t("features.branding")]}
                highlight={true}
                isAnnual={isAnnual}
                tCommon={tCommon}
            />
            <PricingCard 
                name={t("enterprise")}
                price="Custom"
                description={t("enterpriseDesc")}
                features={[t("features.unlimitedAgents"), t("features.successManager"), t("features.sla"), t("features.customIntegrations")]}
                isAnnual={isAnnual}
                tCommon={tCommon}
            />
          </div>
        </div>
      </section>
    );
};

const CTASection = () => {
    const t = useTranslations("Landing.CTA");
    const tCommon = useTranslations("Common");
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <div className="bg-gray-900 rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden shadow-2xl">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                            {t("title")}
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
                            {t("subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button variant="white" size="lg" className="h-16 px-12 rounded-full text-xl font-bold text-gray-900 hover:bg-gray-100 border-none shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all" aria-label={tCommon("startFreeTrial")}>
                                {tCommon("startFreeTrial")}
                            </Button>
                            <Button variant="outline" size="lg" className="h-16 px-12 rounded-full text-xl font-bold text-white border-2 border-gray-700 hover:bg-gray-800 hover:border-gray-800 hover:text-white transition-all" aria-label={tCommon("contactSales")}>
                                {tCommon("contactSales")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
  const t = useTranslations("Landing.Footer");
  const tCommon = useTranslations("Common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-6 gap-12 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900 tracking-tight">Replyxbase</span>
            </div>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-xs">
              {t("desc")}
            </p>
            <div className="flex gap-4">
              {[Linkedin, Instagram, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-all hover:-translate-y-1" aria-label="Social Link">
                      <Icon className="w-5 h-5" />
                  </a>
              ))}
            </div>
          </div>
          
          {[
              { title: t("product"), links: ["features", "pricing", "integrations", "changelog"] },
              { title: t("company"), links: ["about", "careers", "blog", "contact"] },
              { title: t("resources"), links: ["docs", "api", "community", "help"] },
              { title: t("legal"), links: ["privacy", "terms", "security", "status"] },
          ].map((col, i) => (
              <div key={i}>
                  <h4 className="font-bold text-gray-900 mb-8 text-lg">{col.title}</h4>
                  <ul className="space-y-4">
                      {col.links.map((linkKey, j) => (
                          <li key={j}>
                              <a href="#" className="text-base text-gray-500 hover:text-blue-600 transition-colors font-medium">{t(`links.${linkKey}`)}</a>
                          </li>
                      ))}
                  </ul>
              </div>
          ))}
        </div>
        
        <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400 font-medium">
          <div>{tCommon("copyright", {year})}</div>
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{tCommon("allSystemsOperational")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Chat Widget ---
const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Landing.Widget");

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        
        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setIsTyping(false);
            let response = t("aiResponseDefault");
            if (userMsg.toLowerCase().includes("pricing") || userMsg.includes("سعر")) {
                response = t("aiResponsePricing");
            } else if (userMsg.toLowerCase().includes("whatsapp") || userMsg.includes("واتساب")) {
                response = t("aiResponseWhatsapp");
            }
            setMessages(prev => [...prev, { role: 'ai', text: response }]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 rtl:right-auto rtl:left-8 rtl:items-start">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 w-[380px] md:w-[420px] overflow-hidden flex flex-col max-h-[650px]"
                    >
                        {/* Header */}
                        <div className="bg-white p-6 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-gray-900">{t("title")}</div>
                                    <div className="text-xs text-green-600 font-medium flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full w-fit mt-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        {t("online")}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 space-y-6 min-h-[350px]">
                            {messages.length === 0 && (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <p className="text-gray-500 text-sm max-w-[200px] mx-auto">{t("welcome")}</p>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none rtl:rounded-br-2xl rtl:rounded-bl-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 rtl:rounded-bl-2xl rtl:rounded-br-none">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form 
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-3"
                            >
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t("placeholder")}
                                    className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 rounded-full px-6 py-3 text-sm transition-all outline-none"
                                />
                                <button 
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                                >
                                    <Send className="w-5 h-5 rtl:rotate-180" />
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{t("poweredBy")}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-blue-600 rounded-full shadow-2xl shadow-blue-600/40 flex items-center justify-center text-white hover:bg-blue-700 transition-colors z-50 ring-4 ring-white"
            >
                {isOpen ? <ChevronDown className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
            </motion.button>
        </div>
    );
};

const LandingPageClient = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const tCommon = useTranslations("Common");
  const tFooter = useTranslations("Landing.Footer");
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-gray-900 tracking-tight">
                Replyxbase
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-10">
              {["features", "pricing", "resources", "company"].map((item) => (
                <a key={item} href={`#${item}`} className="text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                  {tFooter(`links.${item}`)}
                </a>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <Link href="/dashboard">
                  <Button variant="primary" size="sm" className="rounded-full px-8 h-12 bg-gray-900 hover:bg-gray-800 border-none text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                    {tCommon("dashboard")}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 font-semibold h-12 px-6">
                      {tCommon("logIn")}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm" className="rounded-full px-8 h-12 bg-gray-900 hover:bg-gray-800 border-none text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                      {tCommon("signUp")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <button className="md:hidden p-2" onClick={() => setMobileNavOpen(true)} aria-label="Open Menu">
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection session={session} />
        <Marquee />
        <OmnichannelFlow />
        <div id="features">
          <FeatureInbox />
          <FeatureAgents />
          <FeatureCRM />
          <FeatureAnalytics />
        </div>
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
      
      {/* Interactive AI Widget */}
      <ChatWidget />
    </div>
  );
};

export default LandingPageClient;
