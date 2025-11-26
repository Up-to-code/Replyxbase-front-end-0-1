import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking } from '../../types';
import { PriorityBadge } from '../ui/Badges';

/**
 * Props for the KanbanBoard component.
 */
interface KanbanBoardProps {
  /** List of bookings to display */
  bookings: Booking[];
  /** Callback when a booking is viewed */
  onView: (booking: Booking) => void;
  /** Callback when a booking status changes */
  onStatusChange?: (bookingId: string, newStatus: Booking['status']) => void;
  /** Callback when a booking is updated */
  onUpdateBooking?: (booking: Booking) => Promise<void>;
  /** Whether data is loading */
  isLoading?: boolean;
}

const defaultColumns: { id: Booking['status']; titleKey: string; color: string }[] = [
  { id: 'pending', titleKey: 'pending', color: 'bg-amber-50 border-amber-200' },
  { id: 'confirmed', titleKey: 'confirmed', color: 'bg-emerald-50 border-emerald-200' },
  { id: 'completed', titleKey: 'completed', color: 'bg-blue-50 border-blue-200' },
  { id: 'cancelled', titleKey: 'cancelled', color: 'bg-rose-50 border-rose-200' },
  { id: 'no-show', titleKey: 'no-show', color: 'bg-gray-50 border-gray-200' },
];

/**
 * Displays bookings in a Kanban board format with drag-and-drop support.
 */
export const KanbanBoard: React.FC<KanbanBoardProps> = ({ bookings, onView, onStatusChange, onUpdateBooking, isLoading }) => {
  const t = useTranslations("Dashboard.CRM.Kanban");
  const tStatus = useTranslations("Dashboard.CRM.Status");
  const [draggedBookingId, setDraggedBookingId] = useState<string | null>(null);
  
  // Column Renaming State
  const [columnTitles, setColumnTitles] = useState<{ [key: string]: string }>({});
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [tempColumnTitle, setTempColumnTitle] = useState('');

  // Card Editing State
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ fullName: string }>({ fullName: '' });

  useEffect(() => {
    // Initialize column titles
    const titles: { [key: string]: string } = {};
    defaultColumns.forEach(col => {
      titles[col.id] = tStatus(col.titleKey);
    });
    setColumnTitles(titles);
  }, [tStatus]);

  const handleDragStart = (e: React.DragEvent, bookingId: string) => {
    setDraggedBookingId(bookingId);
    e.dataTransfer.setData('bookingId', bookingId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: Booking['status']) => {
    e.preventDefault();
    const bookingId = e.dataTransfer.getData('bookingId');
    if (bookingId && onStatusChange) {
      onStatusChange(bookingId, status);
    }
    setDraggedBookingId(null);
  };

  const getBookingsByStatus = (status: Booking['status']) => {
    return bookings.filter(b => b.status === status);
  };

  // Column Renaming Handlers
  const startEditingColumn = (id: string, currentTitle: string) => {
    setEditingColumnId(id);
    setTempColumnTitle(currentTitle);
  };

  const saveColumnTitle = () => {
    if (editingColumnId && tempColumnTitle.trim()) {
      setColumnTitles(prev => ({ ...prev, [editingColumnId]: tempColumnTitle }));
    }
    setEditingColumnId(null);
  };

  // Card Editing Handlers
  const startEditingCard = (booking: Booking) => {
    setEditingBookingId(booking.id);
    setEditForm({
      fullName: booking.customer.fullName
    });
  };

  const saveCardEdit = async (booking: Booking) => {
    if (onUpdateBooking) {
      await onUpdateBooking({
        ...booking,
        customer: {
          ...booking.customer,
          fullName: editForm.fullName
        }
      });
    }
    setEditingBookingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 px-4 min-h-[600px]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-[300px] bg-gray-50 rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-32 bg-white rounded-lg"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 px-4 min-h-[calc(100vh-200px)]">
      {defaultColumns.map((column) => {
        const columnBookings = getBookingsByStatus(column.id);
        const currentTitle = columnTitles[column.id] || tStatus(column.titleKey);
        
        return (
          <div
            key={column.id}
            className={`min-w-[320px] max-w-[320px] flex flex-col rounded-xl border ${column.color.replace('bg-', 'border-').replace('50', '200')} bg-gray-50/50`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className={`p-4 border-b ${column.color.replace('bg-', 'border-').replace('50', '200')} bg-white rounded-t-xl sticky top-0 z-10`}>
              <div className="flex items-center justify-between">
                {editingColumnId === column.id ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      value={tempColumnTitle}
                      onChange={(e) => setTempColumnTitle(e.target.value)}
                      className="flex-1 text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveColumnTitle();
                        if (e.key === 'Escape') setEditingColumnId(null);
                      }}
                    />
                    <button onClick={saveColumnTitle} className="p-1 text-green-600 hover:bg-green-50 rounded">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditingColumnId(null)} className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="font-semibold text-gray-700 flex items-center gap-2 cursor-pointer hover:text-blue-600"
                    onDoubleClick={() => startEditingColumn(column.id, currentTitle)}
                  >
                    {currentTitle}
                    <span className="text-xs font-normal text-gray-500 bg-white/50 px-2 py-0.5 rounded-full border border-gray-200">
                      {columnBookings.length}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
              {columnBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  layoutId={booking.id}
                  draggable={!editingBookingId}
                  onDragStart={(e) => handleDragStart(e as any, booking.id)}
                  className={`bg-white p-4 rounded-lg border border-gray-200 transition-all duration-200 group ${
                    draggedBookingId === booking.id ? 'opacity-50' : ''
                  } ${!editingBookingId ? 'cursor-grab active:cursor-grabbing hover:border-blue-400' : ''}`}
                  whileHover={!editingBookingId ? { y: -2 } : {}}
                >
                  {editingBookingId === booking.id ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">{t("customerName")}</label>
                        <input
                          type="text"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                          className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          autoFocus
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => setEditingBookingId(null)}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => saveCardEdit(booking)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div onDoubleClick={() => startEditingCard(booking)}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                            {booking.customer.fullName.charAt(0)}
                          </div>
                          <div onClick={() => onView(booking)} className="cursor-pointer">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1 hover:text-blue-600">
                              {booking.customer.fullName}
                            </p>
                            <p className="text-xs text-gray-500">
                              {booking.serviceType}
                            </p>
                          </div>
                        </div>
                        <PriorityBadge priority={booking.priority} />
                      </div>

                      <div className="space-y-2 cursor-pointer" onClick={() => onView(booking)}>
                        <div className={`flex items-center gap-2 text-xs ${
                          new Date(booking.date) < new Date() && booking.status === 'pending' 
                            ? 'text-rose-600 font-medium' 
                            : 'text-gray-600'
                        }`}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>
                            {booking.date.toLocaleDateString()} • {booking.startTime}
                          </span>
                          {new Date(booking.date) < new Date() && booking.status === 'pending' && (
                            <span className="bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded text-[10px]">{t("overdue")}</span>
                          )}
                        </div>
                        
                        {booking.location && (
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="line-clamp-1">{booking.location}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           {/* Status dot for quick visual check */}
                           <div className={`w-2 h-2 rounded-full ${
                             booking.status === 'confirmed' ? 'bg-emerald-500' :
                             booking.status === 'pending' ? 'bg-amber-500' :
                             booking.status === 'completed' ? 'bg-blue-500' :
                             'bg-gray-300'
                           }`} />
                           <span className="text-xs text-gray-500 capitalize">{tStatus(booking.status)}</span>
                        </div>
                        <span 
                          onClick={() => onView(booking)}
                          className="text-xs text-gray-400 group-hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          {t("viewDetails")} →
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              
              {columnBookings.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                  {t("noBookings")}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
