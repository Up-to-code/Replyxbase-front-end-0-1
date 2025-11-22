'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, MessageCircle, Users, BarChart3, Bot, Play, Rocket,
  CheckCircle2, Star, Check, Linkedin, Instagram,
  MessageSquare, Send, Sparkles, Globe, Code,
  Brain, Workflow, Menu, X as CloseIcon,
  ShieldCheck, MessageSquareText, Pause, ArrowRight,
  MoveRight, Layers, Command, ChevronDown, Plus,
  Cpu, Share2, Zap as ZapIcon, Slack, Trello, Figma, Github, Mail,
  XCircle, CheckCircle, Database, UserPlus, Quote, X
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";

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

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-white">
      {/* Modern Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-600 mb-8 hover:bg-gray-100 transition-colors cursor-pointer">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
                    New: WhatsApp Business API Integration
                    <ArrowRight className="w-4 h-4 ml-1 text-gray-400" />
                </div>
            </motion.div>
            
            <motion.h1 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight leading-[1] text-balance"
            >
              Your AI Customer <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Service Agent.</span>
            </motion.h1>
            
            <motion.p 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl leading-relaxed font-light text-balance"
            >
              Connect WhatsApp, Telegram, and Forms. Let AI handle the conversations, 
              save data to your CRM, and collaborate with your team.
            </motion.p>
            
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-20"
            >
              <Button variant="primary" size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 bg-blue-600 hover:bg-blue-700 border-none" aria-label="Start Free Trial">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg rounded-full border-gray-200 hover:bg-gray-50 text-gray-600 bg-white"
                icon={Play}
                aria-label="Watch Demo"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Hero Image with Tilt Effect */}
            <motion.div 
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.2, type: "spring" }}
                className="relative w-full max-w-6xl mx-auto perspective-1000"
            >
                <div className="relative rounded-2xl border border-gray-200 bg-gray-50/50 p-2 shadow-2xl backdrop-blur-sm">
                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[16/10] relative">
                         <Image 
                            src="/assets/dashboard_hero.png" 
                            alt="ChatConnect Dashboard Interface" 
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => (
    <div className="py-12 bg-white border-b border-gray-100 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="flex w-max gap-16 animate-marquee opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-800"><MessageCircle className="w-8 h-8" /> WhatsApp</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-800"><Send className="w-8 h-8" /> Telegram</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-800"><Slack className="w-8 h-8" /> Slack</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-800"><Trello className="w-8 h-8" /> Trello</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-800"><Mail className="w-8 h-8" /> Gmail</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-800"><Globe className="w-8 h-8" /> Website</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-800"><Figma className="w-8 h-8" /> Figma</div>
                </React.Fragment>
            ))}
        </div>
    </div>
);

// Bento Grid Components
const BentoCard = ({ 
    title, 
    description, 
    icon: Icon, 
    className, 
    children 
}: { 
    title: string, 
    description: string, 
    icon: any, 
    className?: string,
    children?: React.ReactNode 
}) => (
    <div className={`bg-white rounded-3xl border border-gray-200 p-8 flex flex-col relative overflow-hidden hover:shadow-lg transition-all duration-300 group ${className}`}>
        <div className="mb-6 z-10">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 leading-relaxed">{description}</p>
        </div>
        <div className="flex-1 relative z-0">
            {children}
        </div>
    </div>
);

const FeaturesBento = () => (
    <section className="py-32 bg-gray-50/50">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Everything you need. Nothing you don't.</h2>
                <p className="text-lg text-gray-600">
                    Powerful features wrapped in a simple, elegant interface.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {/* Large Card - Unified Inbox */}
                <BentoCard 
                    title="Unified Inbox" 
                    description="Manage WhatsApp, Telegram, and Webchat from one place. No more tab switching."
                    icon={MessageSquare}
                    className="md:col-span-2 min-h-[400px]"
                >
                    <div className="absolute bottom-0 right-0 w-[90%] h-[80%] bg-gray-100 rounded-tl-2xl border-t border-l border-gray-200 shadow-sm overflow-hidden">
                        <Image src="/assets/feature_inbox.png" alt="Inbox" fill className="object-cover object-top" />
                    </div>
                </BentoCard>

                {/* Tall Card - AI Auto-Pilot */}
                <BentoCard 
                    title="AI Auto-Pilot" 
                    description="Train your agent on your data. It handles 80% of queries instantly."
                    icon={Bot}
                    className="md:row-span-2 min-h-[400px]"
                >
                     <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-blue-50 to-transparent flex items-end justify-center pb-8">
                        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 w-[80%]">
                            <div className="flex gap-3 mb-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"><Bot className="w-4 h-4 text-blue-600"/></div>
                                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-3 text-sm text-gray-600 flex-1">
                                    Hello! How can I help you today?
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-blue-600 rounded-2xl rounded-tr-none p-3 text-sm text-white">
                                    I need to check my order status.
                                </div>
                            </div>
                        </div>
                     </div>
                </BentoCard>

                {/* Small Card - CRM */}
                <BentoCard 
                    title="Built-in CRM" 
                    description="Auto-save customer details and history."
                    icon={Database}
                    className="min-h-[300px]"
                >
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                        <UserPlus className="w-8 h-8 text-blue-600" />
                    </div>
                </BentoCard>

                {/* Small Card - Analytics */}
                <BentoCard 
                    title="Analytics" 
                    description="Track response times and resolution rates."
                    icon={BarChart3}
                    className="min-h-[300px]"
                >
                    <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-around px-8 pb-8">
                        <div className="w-8 bg-blue-200 h-12 rounded-t-lg"></div>
                        <div className="w-8 bg-blue-300 h-20 rounded-t-lg"></div>
                        <div className="w-8 bg-blue-400 h-16 rounded-t-lg"></div>
                        <div className="w-8 bg-blue-600 h-24 rounded-t-lg"></div>
                    </div>
                </BentoCard>
            </div>
        </div>
    </section>
);

const TestimonialCard = ({ quote, author, role, company }: { quote: string, author: string, role: string, company: string }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <Quote className="w-8 h-8 text-blue-100 mb-6" />
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">"{quote}"</p>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {author[0]}
            </div>
            <div>
                <div className="font-bold text-gray-900">{author}</div>
                <div className="text-sm text-gray-500">{role}, {company}</div>
            </div>
        </div>
    </div>
);

const TestimonialsSection = () => (
    <section className="py-24 bg-white border-y border-gray-100">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Loved by Support Teams</h2>
                <p className="text-gray-600">Don't just take our word for it.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <TestimonialCard 
                    quote="ChatConnect cut our response time by 90%. The AI agent is incredibly accurate."
                    author="Sarah Jenkins"
                    role="Head of Support"
                    company="TechFlow"
                />
                <TestimonialCard 
                    quote="Finally, a tool that brings WhatsApp and Telegram into one dashboard. A game changer."
                    author="Michael Chen"
                    role="Founder"
                    company="GrowthLabs"
                />
                <TestimonialCard 
                    quote="The CRM integration is seamless. We never lose track of a lead anymore."
                    author="Emma Wilson"
                    role="Sales Director"
                    company="Elevate"
                />
            </div>
        </div>
    </section>
);

const PricingCard = ({
  name,
  price,
  description,
  features,
  highlight = false,
  isAnnual
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  isAnnual: boolean;
}) => (
  <div className={`h-full p-8 rounded-3xl border flex flex-col transition-all duration-300 ${highlight ? 'bg-gray-900 text-white border-gray-900 shadow-2xl scale-105' : 'bg-white border-gray-200 text-gray-900 hover:border-gray-300'}`}>
        <div className="mb-8">
            <h3 className={`text-lg font-medium mb-2 ${highlight ? 'text-gray-300' : 'text-gray-500'}`}>{name}</h3>
            <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{price}</span>
                <span className={`text-sm ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>{isAnnual ? '/mo' : '/mo'}</span>
            </div>
            <p className={`mt-4 text-sm ${highlight ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        </div>
        <ul className="space-y-4 mb-8 flex-1">
            {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                    <Check className={`w-5 h-5 ${highlight ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={highlight ? 'text-gray-300' : 'text-gray-700'}>{f}</span>
                </li>
            ))}
        </ul>
        <Button 
            variant={highlight ? 'primary' : 'outline'} 
            className={`w-full rounded-full h-12 ${highlight ? 'bg-blue-600 hover:bg-blue-500 border-none text-white' : 'border-gray-200 hover:bg-gray-50'}`}
            aria-label={`Get Started with ${name} plan`}
        >
            Get Started
        </Button>
  </div>
);

const PricingSection = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
      <section id="pricing" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg mb-8">Start for free, scale as you grow.</p>
            
            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 p-1 bg-gray-100 rounded-full w-fit mx-auto">
                <button 
                    onClick={() => setIsAnnual(false)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    Monthly
                </button>
                <button 
                    onClick={() => setIsAnnual(true)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isAnnual ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                >
                    Yearly <span className="text-green-600 text-xs font-bold ml-1">-20%</span>
                </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-20">
            <PricingCard 
                name="Starter"
                price="$0"
                description="For individuals."
                features={["1 AI Agent", "100 Conversations/mo", "Community Support"]}
                isAnnual={isAnnual}
            />
            <PricingCard 
                name="Pro"
                price={isAnnual ? "$39" : "$49"}
                description="For growing teams."
                features={["3 AI Agents", "Unlimited Conversations", "Priority Support", "Analytics", "Custom Branding"]}
                highlight={true}
                isAnnual={isAnnual}
            />
            <PricingCard 
                name="Enterprise"
                price="Custom"
                description="For organizations."
                features={["Unlimited Agents", "Dedicated Success Manager", "SLA", "Custom Integrations"]}
                isAnnual={isAnnual}
            />
          </div>
        </div>
      </section>
    );
};

const CTASection = () => (
    <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
            <div className="bg-gray-900 rounded-[2.5rem] p-12 md:p-24 text-center relative overflow-hidden">
                {/* Abstract Shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Ready to automate your support?
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Join thousands of companies using ChatConnect to delight customers and save time.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="white" size="lg" className="h-14 px-10 rounded-full text-lg text-gray-900 hover:bg-gray-100 border-none" aria-label="Start Free Trial">
                            Start Free Trial
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-lg text-white border-gray-700 hover:bg-gray-800 hover:text-white" aria-label="Contact Sales">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-6 gap-12 mb-20">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">ChatConnect</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs">
            Building the future of customer communication with artificial intelligence.
          </p>
          <div className="flex gap-4">
            {[Linkedin, Instagram, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-colors" aria-label="Social Link">
                    <Icon className="w-4 h-4" />
                </a>
            ))}
          </div>
        </div>
        
        {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
            { title: "Resources", links: ["Documentation", "API Reference", "Community", "Help Center"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "Status"] },
        ].map((col, i) => (
            <div key={i}>
                <h4 className="font-bold text-gray-900 mb-6">{col.title}</h4>
                <ul className="space-y-4">
                    {col.links.map((link, j) => (
                        <li key={j}>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{link}</a>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
      </div>
      
      <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <div>&copy; 2024 ChatConnect Inc. All rights reserved.</div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>All systems operational</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Chat Widget ---
const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-open and greet
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
            setIsTyping(true);
            setTimeout(() => {
                setIsTyping(false);
                setMessages([{ role: 'ai', text: "Hi there! 👋 I'm the ChatConnect AI agent. How can I help you automate your support today?" }]);
            }, 1500);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

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
            let response = "That's a great question! ChatConnect can definitely help with that. Would you like to see a live demo?";
            if (userMsg.toLowerCase().includes("pricing")) {
                response = "We offer flexible pricing starting at $0/mo for individuals. Our Pro plan is $39/mo. Check out the Pricing section for more details!";
            } else if (userMsg.toLowerCase().includes("whatsapp")) {
                response = "Yes! We support full WhatsApp Business API integration. You can manage all your WhatsApp chats directly from our dashboard.";
            }
            setMessages(prev => [...prev, { role: 'ai', text: response }]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Callout */}
            {!isOpen && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Try the AI Agent
                </motion.div>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-[350px] md:w-[400px] overflow-hidden flex flex-col max-h-[600px]"
                    >
                        {/* Header */}
                        <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold">ChatConnect AI</div>
                                    <div className="text-xs text-blue-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                        Online
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4 min-h-[300px]">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form 
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                />
                                <button 
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-gray-400">Powered by ChatConnect AI</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-blue-600 rounded-full shadow-xl flex items-center justify-center text-white hover:bg-blue-700 transition-colors z-50"
            >
                {isOpen ? <ChevronDown className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
            </motion.button>
        </div>
    );
};

const LandingPageClient = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">
                ChatConnect
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              {["Features", "Pricing", "Resources", "Company"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                  {item}
                </a>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                Log In
              </Button>
              <Button variant="primary" size="sm" className="rounded-full px-6 bg-gray-900 hover:bg-gray-800 border-none text-white">
                Sign Up
              </Button>
            </div>
            
            <button className="md:hidden p-2" onClick={() => setMobileNavOpen(true)} aria-label="Open Menu">
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>
      </header>

      <main>
        <HeroSection />
        <Marquee />
        <FeaturesBento />
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
