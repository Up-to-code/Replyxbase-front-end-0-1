/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  MessageSquare,
  Users,
  Bot,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  FileText,
  Phone,
  Globe,
  Smartphone,
  Send,
  Instagram,
  CheckCircle2,
  Clock
} from 'lucide-react';

// ============================================
// MOCK DATA - SAAS SPECIFIC
// ============================================
const dashboardData = {
  stats: [
    { 
      id: 'messages', 
      title: 'Total Messages', 
      value: '12,450', 
      change: '+24%', 
      trend: 'up',
      icon: MessageSquare,
      color: 'blue'
    },
    { 
      id: 'sales', 
      title: 'Sales Conversions', 
      value: '$4,290', 
      change: '+18%', 
      trend: 'up',
      icon: TrendingUp,
      color: 'green'
    },
    { 
      id: 'csat', 
      title: 'CSAT Score', 
      value: '4.8/5', 
      change: '+0.2', 
      trend: 'up',
      icon: CheckCircle2,
      color: 'purple'
    },
    { 
      id: 'saved', 
      title: 'Hours Saved', 
      value: '142h', 
      change: '+12h', 
      trend: 'up',
      icon: Clock,
      color: 'orange'
    },
  ],

  platforms: [
    { name: 'WhatsApp', icon: Phone, messages: 5230, growth: 24, color: '#25D366', bg: 'bg-green-50' },
    { name: 'Website', icon: Globe, messages: 3450, growth: 15, color: '#3b82f6', bg: 'bg-blue-50' },
    { name: 'Telegram', icon: Send, messages: 2100, growth: 8, color: '#0088cc', bg: 'bg-sky-50' },
    { name: 'Instagram', icon: Instagram, messages: 1670, growth: 32, color: '#E4405F', bg: 'bg-pink-50' },
  ],

  agents: [
    { name: 'Sales Bot Alpha', role: 'Lead Gen', status: 'active', conversations: 1240, conversion: '18%' },
    { name: 'Support Helper', role: 'Customer Service', status: 'active', conversations: 2100, conversion: 'N/A' },
    { name: 'Real Estate Pro', role: 'Property Info', status: 'training', conversations: 45, conversion: '5%' },
    { name: 'Booking Agent', role: 'Scheduling', status: 'paused', conversations: 890, conversion: '12%' },
  ],

  bookings: [
    { time: '14:00', customer: 'Sarah Connor', type: 'Demo Call', status: 'confirmed' },
    { time: '15:30', customer: 'John Smith', type: 'Support', status: 'pending' },
    { time: '16:45', customer: 'Mike Ross', type: 'Sales', status: 'confirmed' },
  ],

  activity: [
    { type: 'lead', text: 'New qualified lead from WhatsApp', time: '2m ago', icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { type: 'invoice', text: 'Invoice #INV-2024 generated', time: '15m ago', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { type: 'booking', text: 'Demo scheduled with John Doe', time: '1h ago', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100' },
    { type: 'alert', text: 'High volume on Website Widget', time: '2h ago', icon: Zap, color: 'text-orange-600', bg: 'bg-orange-100' },
  ],

  chartData: [
    { name: 'Mon', messages: 2400, automated: 1800 },
    { name: 'Tue', messages: 1398, automated: 1100 },
    { name: 'Wed', messages: 9800, automated: 8500 },
    { name: 'Thu', messages: 3908, automated: 3200 },
    { name: 'Fri', messages: 4800, automated: 4100 },
    { name: 'Sat', messages: 3800, automated: 3400 },
    { name: 'Sun', messages: 4300, automated: 3900 },
  ]
};

// ============================================
// COMPONENTS
// ============================================

const StatCard = ({ stat }: { stat: any }) => {
  const Icon = stat.icon;
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    purple: 'text-purple-600 bg-purple-50',
    orange: 'text-orange-600 bg-orange-50',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colors[stat.color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {stat.change}
        </div>
      </div>
      <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
    </div>
  );
};

const PlatformItem = ({ platform }: { platform: any }) => {
  const Icon = platform.icon;
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-gray-100">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${platform.bg}`}>
          <Icon className="w-5 h-5" style={{ color: platform.color }} />
        </div>
        <div>
          <p className="font-semibold text-gray-900">{platform.name}</p>
          <p className="text-sm text-gray-500">{platform.messages.toLocaleString()} msgs</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-green-600 text-sm font-medium">+{platform.growth}%</span>
        <MoreHorizontal className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

const AgentRow = ({ agent }: { agent: any }) => (
  <tr className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <p className="font-medium text-gray-900 text-sm">{agent.name}</p>
          <p className="text-xs text-gray-500">{agent.role}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
        ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 
          agent.status === 'training' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'}`}>
        {agent.status}
      </span>
    </td>
    <td className="py-4 px-4 text-sm text-gray-600">{agent.conversations}</td>
    <td className="py-4 px-4 text-sm text-gray-600">{agent.conversion}</td>
  </tr>
);

const ActivityItem = ({ item }: { item: any }) => {
  const Icon = item.icon;
  return (
    <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg}`}>
        <Icon className={`w-4 h-4 ${item.color}`} />
      </div>
      <div>
        <p className="text-sm text-gray-900 font-medium">{item.text}</p>
        <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
      </div>
    </div>
  );
};

const BookingItem = ({ booking }: { booking: any }) => (
  <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors bg-gray-50/50">
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center justify-center w-10 h-10 bg-white rounded-lg border border-gray-200">
        <span className="text-xs font-bold text-gray-900">{booking.time}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{booking.customer}</p>
        <p className="text-xs text-gray-500">{booking.type}</p>
      </div>
    </div>
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
    }`}>
      {booking.status}
    </span>
  </div>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function DashboardPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate a quick data fetch for smooth entry
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, here's what's happening with your agents today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Download Report
            </button>
            <button className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
              <Bot className="w-4 h-4" />
              Create New Agent
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardData.stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Charts & Agents) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Analytics Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Conversation Volume</h2>
                <select className="bg-gray-50 border-none text-sm text-gray-600 rounded-lg px-3 py-1 focus:ring-0 cursor-pointer hover:bg-gray-100 transition-colors">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              <div className="h-[300px] w-full">
                {!isLoaded ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl animate-pulse">
                    <div className="text-gray-400 text-sm">Loading chart data...</div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboardData.chartData}>
                      <defs>
                        <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#6b7280', fontSize: 12 }} 
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: 'none' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="messages" 
                        stroke="#000000" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorMessages)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Active Agents Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Active Agents</h2>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conversations</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.agents.map((agent, idx) => (
                      <AgentRow key={idx} agent={agent} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column (Platforms & Activity) */}
          <div className="space-y-6">

             {/* Bookings Card (NEW) */}
             <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Today's Calls</h2>
                <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">3 Upcoming</span>
              </div>
              <div className="space-y-2">
                {dashboardData.bookings.map((booking, idx) => (
                  <BookingItem key={idx} booking={booking} />
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                View Calendar
              </button>
            </div>
            
            {/* Connected Channels */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Connected Channels</h2>
              <div className="space-y-1">
                {dashboardData.platforms.map((platform, idx) => (
                  <PlatformItem key={idx} platform={platform} />
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-dashed border-gray-300 rounded-xl text-sm font-medium text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" />
                Connect New Channel
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-2">
                {dashboardData.activity.map((item, idx) => (
                  <ActivityItem key={idx} item={item} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}