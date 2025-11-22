'use client';

import React, { useState, ReactNode, ButtonHTMLAttributes } from "react";
import {
  Zap, MessageCircle, Users, BarChart3, Bot, Play, Rocket,
  CheckCircle2, ArrowRight, Star, Check, X, Linkedin, Instagram,
  Mail, MessageSquare, Monitor, Smartphone, Send, Sparkles, Globe, Code,
  Brain, Workflow, ArrowUpRight, Menu, X as CloseIcon,
  ShoppingCart, FileText, Database, Slack, CreditCard,
  ShieldCheck, MessageSquareText, ThumbsUp, DollarSign, ChevronLeft, ChevronRight, Pause,
  PieChart as PieChartIcon,
  ColumnsSettings,
} from "lucide-react";

// LucideIcon type for icon props
type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>;

type ModernButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  loading?: boolean;
  className?: string;
};

const ModernButton = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  className = "",
  ...props
}: ModernButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-lg rounded-full",
    xl: "px-10 py-5 text-xl rounded-full",
  };
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 border border-transparent",
    secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-transparent",
    outline: "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50 border border-transparent",
    danger: "bg-red-600 text-white hover:bg-red-700 border border-transparent",
    success: "bg-green-600 text-white hover:bg-green-700 border border-transparent",
    white: "bg-white text-blue-600 border-2 border-white hover:bg-blue-50"
  };

  return (
    <button
      type="button"
      className={[
        "font-semibold flex items-center justify-center gap-3 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      ].join(" ")}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading
        ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        : Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

const ImagePlaceholder = ({
  width = "100%",
  height = "200px",
  className = "",
  children
}: {
  width?: string;
  height?: string;
  className?: string;
  children?: ReactNode;
}) => (
  <div
    className={`bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 ${className}`}
    style={{ width, height }}
  >
    {children || (
      <div className="text-center">
        <MessageSquareText className="w-12 h-12 mx-auto mb-2 opacity-60" />
        <p className="text-sm font-medium opacity-75">Feature Image</p>
      </div>
    )}
  </div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  features
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}) => (
  <div className="bg-neutral-50 rounded-3xl p-8 transition-all duration-300 hover:bg-white hover:shadow-sm">
    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
      <Icon className="w-7 h-7 text-blue-600" />
    </div>
    <h3 className="text-2xl font-bold text-neutral-800 mb-4">{title}</h3>
    <p className="text-neutral-600 mb-6 leading-relaxed">{description}</p>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3 text-neutral-700">
          <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span className="font-medium">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TestimonialCard = ({
  name,
  role,
  company,
  content,
  avatar,
  rating
}: {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}) => (
  <div className="bg-neutral-50 rounded-3xl p-8">
    <div className="flex items-center gap-2 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-300"}`}
        />
      ))}
    </div>
    <p className="text-neutral-600 mb-6 italic">"{content}"</p>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="font-bold text-blue-600 text-lg">{avatar}</span>
      </div>
      <div>
        <p className="font-semibold text-neutral-800">{name}</p>
        <p className="text-sm text-neutral-600">{role} at {company}</p>
      </div>
    </div>
  </div>
);

const PricingCard = ({
  name,
  price,
  description,
  features,
  popular = false,
  cta
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}) => (
  <div
    className={`relative bg-neutral-50 rounded-3xl p-8 transition-all duration-300 hover:bg-white hover:shadow-md ${popular ? "ring-2 ring-blue-600 bg-white shadow-md" : ""}`}
  >
    {popular && (
      <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold rtl:translate-x-1/2">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-bold text-neutral-800 mb-2">{name}</h3>
    <div className="text-4xl font-bold text-blue-600 mb-2">{price}</div>
    <p className="text-neutral-600 mb-6">{description}</p>
    <ModernButton
      variant={popular ? "primary" : "outline"}
      className="w-full mb-8"
    >
      {cta}
    </ModernButton>
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center gap-3 text-neutral-700"
        >
          <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 start-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Customer Service Platform
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-800 mb-6 leading-[1.15] tracking-tight">
              Automate Support,
              <span className="text-blue-600"> Boost Sales</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Centralize communication from WhatsApp, Telegram, and Web. Automate repetitive tasks, reduce workload, and boost sales with custom AI agents.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
              <ModernButton variant="primary" size="lg" icon={Rocket}>
                Start Free Trial
              </ModernButton>
              <ModernButton
                variant="outline"
                size="lg"
                icon={isVideoPlaying ? Pause : Play}
                onClick={() => setIsVideoPlaying(v => !v)}
              >
                {isVideoPlaying ? "Pause" : "Watch"} Demo
              </ModernButton>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-neutral-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <ImagePlaceholder height="500px" className="shadow-sm bg-blue-50">
                <div className="text-center p-8">
                    <Bot className="w-24 h-24 text-blue-600 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold text-blue-900 mb-2">Dashboard Preview</h3>
                    <p className="text-blue-700/70">High-quality screenshot of the dashboard would go here.</p>
                </div>
            </ImagePlaceholder>
          </div>
        </div>
      </div>
    </section>
  );
};

const ChannelsSection = () => (
  <section className="py-12 bg-white border-b border-neutral-100">
    <div className="container mx-auto px-6 text-center">
      <p className="text-neutral-500 font-medium mb-8 text-sm">
        Connects seamlessly with your favorite platforms
      </p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 hover:opacity-100 transition-all duration-300">
        {[
          { name: "WhatsApp", icon: MessageCircle, color: "#25D366" },
          { name: "Telegram", icon: Send, color: "#0088cc" },
          { name: "Instagram", icon: MessageSquare, color: "#E1306C" },
          { name: "Website", icon: Globe, color: "#003087" },
          { name: "Custom API", icon: Code, color: "#6C7378" },
        ].map((platform, index) => {
          const Icon = platform.icon;
          return (
            <div key={index} className="flex items-center gap-2 text-neutral-700 font-bold text-lg grayscale hover:grayscale-0 transition-all">
              <Icon className="w-6 h-6" style={{ color: platform.color }} />
              {platform.name}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const InteractiveDemo = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Connect Channels",
      description: "Link WhatsApp, Telegram, and more.",
      icon: Code,
      color: "bg-green-500",
    },
    {
      title: "Train AI Agent",
      description: "Upload your business knowledge.",
      icon: Brain,
      color: "bg-purple-500",
    },
    {
      title: "Go Live",
      description: "Automate conversations instantly.",
      icon: Rocket,
      color: "bg-blue-500",
    },
  ];

  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            How It Works
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Get started in minutes, not days.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
                {steps.map((s, index) => {
                    const Icon = s.icon;
                    const isActive = index === step;
                    return (
                        <div 
                            key={index} 
                            className={`flex gap-6 p-6 rounded-3xl transition-all cursor-pointer ${isActive ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                            onClick={() => setStep(index)}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 ${isActive ? s.color : 'bg-neutral-300'}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-neutral-800' : 'text-neutral-500'}`}>{s.title}</h3>
                                <p className={`${isActive ? 'text-neutral-600' : 'text-neutral-400'}`}>{s.description}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="relative">
                 <ImagePlaceholder height="400px" className="bg-white shadow-sm">
                    <div className="text-center">
                        <span className="text-6xl font-bold text-blue-100 mb-4 block">{step + 1}</span>
                        <p className="text-xl font-medium text-blue-900">Step {step + 1} Visualization</p>
                    </div>
                 </ImagePlaceholder>
            </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          Everything You Need
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
          Powerful tools to automate support and grow your business.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={MessageSquareText}
          title="Unified Inbox"
          description="Manage all conversations from WhatsApp, Telegram, and Web in one place."
          features={["Team Collaboration", "Chat History", "Multi-Agent Support"]}
        />
        <FeatureCard
          icon={Bot}
          title="Custom AI Agents"
          description="Build intelligent agents that understand your business and customers."
          features={["Natural Language Processing", "Auto-Handoff", "Sentiment Analysis"]}
        />
        <FeatureCard
          icon={Users}
          title="Lead Management"
          description="Automatically capture and organize customer data and interactions."
          features={["Auto-Tagging", "Customer Profiles", "CRM Integration"]}
        />
        <FeatureCard
          icon={BarChart3}
          title="Advanced Analytics"
          description="Get deep insights into your customer interactions and agent performance."
          features={["Real-time Dashboard", "Performance Metrics", "Export Data"]}
        />
        <FeatureCard
          icon={Workflow}
          title="Workflow Automation"
          description="Automate repetitive tasks and create custom workflows for your team."
          features={["Custom Triggers", "Conditional Logic", "API Integrations"]}
        />
        <FeatureCard
          icon={ShieldCheck}
          title="Enterprise Security"
          description="Bank-level security to keep your customer data safe and compliant."
          features={["End-to-end Encryption", "GDPR Compliance", "Regular Audits"]}
        />
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 bg-neutral-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          Trusted by Businesses
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
          See what our customers have to say about us.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TestimonialCard
          name="Sarah Johnson"
          role="Marketing Director"
          company="TechFlow"
          content="ChatConnect has completely transformed how we handle customer support. Our response times have dropped by 80%!"
          avatar="SJ"
          rating={5}
        />
        <TestimonialCard
          name="Michael Chen"
          role="Founder"
          company="GrowthLabs"
          content="The AI agents are incredibly smart. They handle complex queries with ease, allowing my team to focus on high-value tasks."
          avatar="MC"
          rating={5}
        />
        <TestimonialCard
          name="Emily Davis"
          role="Customer Success"
          company="RetailPlus"
          content="Setting up was a breeze. The integration with WhatsApp and Telegram works seamlessly. Highly recommended!"
          avatar="ED"
          rating={5}
        />
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section id="pricing" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
          Simple Pricing
        </h2>
        <p className="text-neutral-600">
          Start for free and scale as you grow.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <PricingCard
          name="Starter"
          price="$19/mo"
          description="Perfect for small businesses."
          features={[
            "1 AI Agent",
            "1,000 Messages/mo",
            "WhatsApp Integration",
            "Email Support",
          ]}
          cta="Start Free Trial"
        />
        <PricingCard
          name="Growth"
          price="$49/mo"
          description="For growing teams."
          features={[
            "5 AI Agents",
            "10,000 Messages/mo",
            "All Integrations",
            "CRM Sync",
            "Priority Support",
          ]}
          popular={true}
          cta="Start Free Trial"
        />
        <PricingCard
          name="Enterprise"
          price="$99/mo"
          description="For large organizations."
          features={[
            "Unlimited Agents",
            "Unlimited Messages",
            "Custom API Access",
            "Dedicated Manager",
          ]}
          cta="Contact Sales"
        />
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
        <div className="bg-blue-600 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 start-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 end-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
                Ready to Automate Your Support?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg mb-10 relative z-10">
                Join thousands of businesses that use ChatConnect to boost sales and save time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <ModernButton variant="white" size="lg" icon={Rocket}>
                Start Free Trial
                </ModernButton>
                <ModernButton variant="outline" size="lg" className="text-white border-white hover:bg-white/10" icon={Play}>
                Watch Demo
                </ModernButton>
            </div>
            <p className="text-blue-200 text-sm mt-6 relative z-10">
                No credit card required • 14-day free trial
            </p>
        </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white text-neutral-600 pt-20 pb-10 border-t border-neutral-100">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-neutral-800">ChatConnect</span>
          </div>
          <p className="text-neutral-500 max-w-sm leading-relaxed mb-8">
            Empowering businesses with intelligent automation. Connect, automate, and grow.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-lg text-neutral-800 mb-6">Product</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Integrations</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">API Docs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg text-neutral-800 mb-6">Company</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div>&copy; 2024 ChatConnect Inc. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const TwitterIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => (
  <div
    className={`fixed inset-0 bg-white z-50 transform transition-transform ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
    style={{ transition: "transform 0.3s" }}
  >
    <div className="flex flex-col p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl text-neutral-800">ChatConnect</span>
        </div>
        <button type="button" onClick={onClose} className="p-2" aria-label="Close menu">
          <CloseIcon className="w-6 h-6 text-neutral-600" />
        </button>
      </div>
      <nav className="flex flex-col gap-6">
        <a href="#features" className="text-lg font-medium text-neutral-800">Features</a>
        <a href="#pricing" className="text-lg font-medium text-neutral-800">Pricing</a>
        <a href="#" className="text-lg font-medium text-neutral-800">Integrations</a>
        <a href="#" className="text-lg font-medium text-neutral-800">Resources</a>
        <div className="flex gap-3 mt-4">
          <ModernButton variant="outline" size="sm" className="flex-1">Log In</ModernButton>
          <ModernButton variant="primary" size="sm" className="flex-1">Sign Up</ModernButton>
        </div>
      </nav>
    </div>
  </div>
);

const CompleteLandingPage = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-neutral-100 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-blue-600">
                ChatConnect
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-neutral-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-sm font-semibold text-neutral-600 hover:text-blue-600 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-sm font-semibold text-neutral-600 hover:text-blue-600 transition-colors">
                Integrations
              </a>
              <a href="#" className="text-sm font-semibold text-neutral-600 hover:text-blue-600 transition-colors">
                Resources
              </a>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <ModernButton variant="outline" size="sm">
                Log In
              </ModernButton>
              <ModernButton variant="primary" size="sm">
                Sign Up
              </ModernButton>
            </div>
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-neutral-700" />
            </button>
          </div>
        </div>
      </header>
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <main>
        <HeroSection />
        <ChannelsSection />
        <InteractiveDemo />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default CompleteLandingPage;