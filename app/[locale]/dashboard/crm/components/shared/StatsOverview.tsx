import React from 'react';
import { TrendingUp, Users, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking } from '../../types';

/**
 * Props for the StatsOverview component.
 */
interface StatsOverviewProps {
  /** List of bookings to calculate stats from */
  bookings: Booking[];
  /** Whether data is loading */
  isLoading?: boolean;
}

/**
 * Displays key statistics about bookings (Total, Pending, Confirmed).
 */
export const StatsOverview: React.FC<StatsOverviewProps> = ({ bookings, isLoading }) => {
  const t = useTranslations("Dashboard.CRM.Stats");

  const stats = React.useMemo(() => {
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;

    return [
      {
        title: t("totalBookings"),
        value: totalBookings,
        icon: Calendar,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
      },
      {
        title: t("pending"),
        value: pendingBookings,
        icon: Users,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
      },
      {
        title: t("confirmed"),
        value: confirmedBookings,
        icon: TrendingUp,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
      },
    ];
  }, [bookings, t]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-100 rounded"></div>
                <div className="h-6 w-12 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 px-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl border border-gray-200 transition-colors duration-200 hover:border-blue-300"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
