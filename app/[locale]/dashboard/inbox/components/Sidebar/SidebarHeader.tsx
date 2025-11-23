import React from 'react';
import { useRouter } from 'next/navigation';
import { Home, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SidebarHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const router = useRouter();
  const t = useTranslations("Dashboard.Inbox");

  return (
    <>
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
        <button 
          onClick={() => router.push('/dashboard')}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-colors"
          title="Back to Dashboard"
        >
          <Home className="w-6 h-6 rtl:rotate-180" />
        </button>
      </div>
      
      <div className="px-6 pb-4 pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 rtl:left-auto rtl:right-3" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-gray-200 focus:ring-0 rounded-xl transition-all duration-200 text-base rtl:pl-4 rtl:pr-10"
          />
        </div>
      </div>
    </>
  );
};
