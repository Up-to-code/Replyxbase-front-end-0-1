import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  MessageSquare, 
  Phone, 
  Mail, 
  Building, 
  Edit2, 
  Trash2, 
  UserCheck,
  MapPin,
  Tag
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking } from '../../types';
import { StatusBadge, PriorityBadge } from '../ui/Badges';
import { Rating } from '../ui/Rating';
import { ActivityLog } from '../activities/ActivityLog';
import { ActivityForm } from '../activities/ActivityForm';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingDetailsSkeleton } from '../skeletons';

/**
 * Props for the BookingDetailsDrawer component.
 */
interface BookingDetailsDrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback to close the drawer */
  onClose: () => void;
  /** Callback to edit the booking */
  onEdit: (booking: Booking) => void;
  /** Callback to delete the booking */
  onDelete: (bookingId: string) => void;
  /** The booking to display */
  booking?: Booking;
  /** Whether data is loading */
  isLoading?: boolean;
  /** Callback to add an activity */
  onAddActivity?: (type: 'call' | 'email' | 'note' | 'meeting', content: string, relatedTo: 'booking' | 'customer', relatedId: string) => Promise<void>;
}

/**
 * Drawer component to display detailed information about a booking.
 */
export const BookingDetailsDrawer: React.FC<BookingDetailsDrawerProps> = ({ 
  isOpen, 
  onClose, 
  onEdit, 
  onDelete,
  booking,
  isLoading = false,
  onAddActivity
}) => {
  const drawerRef = useOutsideClick(onClose);
  const router = useRouter();
  const t = useTranslations("Dashboard.CRM.Bookings.Details");
  
  if (!booking && !isLoading) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 overflow-y-auto rtl:right-auto rtl:left-0 rtl:transform rtl:-scale-x-100"
          >
            <div className="rtl:transform rtl:-scale-x-100 h-full">
              {isLoading ? (
                <BookingDetailsSkeleton />
              ) : booking ? (
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{t("title")}</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {booking.date.toLocaleDateString()} • {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (booking) {
                             router.push(`/dashboard/inbox?customerId=${booking.customer.id}`);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                        title={t("chatTooltip")}
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onEdit(booking)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                        title={t("editTooltip")}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(booking.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                        title={t("deleteTooltip")}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                        title={t("closeTooltip")}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Customer Details */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">{t("customerDetails")}</h4>
                      <div className="flex items-center gap-3">
                        <UserCheck className="w-5 h-5 text-gray-500" />
                        <p className="text-sm font-medium text-gray-900">
                          {booking.customer.fullName}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <p className="text-sm text-gray-700">{booking.customer.email}</p>
                      </div>
                      {booking.customer.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <p className="text-sm text-gray-700">{booking.customer.phone}</p>
                        </div>
                      )}
                      {booking.customer.company && (
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-gray-500" />
                          <p className="text-sm text-gray-700">{booking.customer.company}</p>
                        </div>
                      )}
                      {booking.customer.address && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-gray-500" />
                          <p className="text-sm text-gray-700">{booking.customer.address}</p>
                        </div>
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">{t("bookingInfo")}</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">{t("status")}</p>
                          <StatusBadge status={booking.status} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t("priority")}</p>
                          <PriorityBadge priority={booking.priority} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t("rating")}</p>
                          <Rating rating={booking.rating || 0} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{t("serviceType")}</p>
                          <p className="text-sm font-medium text-gray-900">
                            {booking.serviceType}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">{t("duration")}</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.duration} {t("minutes")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">{t("people")}</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.people}
                            </p>
                          </div>
                        </div>
                        {booking.occasion && (
                          <div>
                            <p className="text-xs text-gray-500">{t("occasion")}</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.occasion}
                            </p>
                          </div>
                        )}
                        {booking.location && (
                          <div>
                            <p className="text-xs text-gray-500">{t("location")}</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.location}
                            </p>
                          </div>
                        )}
                        {booking.specialRequests && (
                          <div>
                            <p className="text-xs text-gray-500">{t("specialRequests")}</p>
                            <p className="text-sm font-medium text-gray-900">
                              {booking.specialRequests}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">{t("internalNotes")}</h4>
                        <p className="text-sm text-gray-700 bg-primary/5 p-3 rounded-lg">
                          {booking.notes}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    {booking.tags && booking.tags.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">{t("tags")}</h4>
                        <div className="flex flex-wrap gap-2">
                          {booking.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Activities Section */}
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">{t("activityLog")}</h4>
                      <div className="mb-6">
                        <ActivityForm 
                          onSubmit={async (type, content) => {
                            if (onAddActivity && booking) {
                              await onAddActivity(type, content, 'booking', booking.id);
                            }
                          }} 
                        />
                      </div>
                      <ActivityLog activities={booking.activities || []} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};