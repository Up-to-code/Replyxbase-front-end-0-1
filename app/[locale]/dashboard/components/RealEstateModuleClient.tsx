"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Booking, CalendarView as CalendarViewType, Customer } from "../crm/types";
import { moduleConfigs, CrmModuleKey } from "../real-estate-data";
import { KanbanBoard } from "../crm/components/kanban/KanbanBoard";
import { CalendarViewComponent } from "../crm/components/calendar/CalendarView";
import { BookingTable } from "../crm/components/bookings/BookingTable";
import { BookingDetailsDrawer } from "../crm/components/bookings/BookingDetailsDrawer";
import { BookingFormDrawer } from "../crm/components/bookings/BookingFormDrawer";
import { DeleteConfirmationModal } from "../crm/components/bookings/DeleteConfirmationModal";
import { StatsOverview } from "../crm/components/shared/StatsOverview";
import { Filters } from "../crm/components/shared/Filters";
import { useFilters } from "../crm/hooks/useFilters";
import { createBooking, deleteBooking, getBookings, updateBooking } from "@/app/actions/crm";
import { BookingFormData } from "../crm/types";

type SerializedCustomer = Omit<Customer, "lastVisit"> & {
  lastVisit?: string;
};

type SerializedBooking = Omit<Booking, "date" | "createdAt" | "updatedAt" | "customer"> & {
  date: string;
  createdAt: string;
  updatedAt: string;
  customer: SerializedCustomer;
};

function reviveBooking(booking: SerializedBooking): Booking {
  return {
    ...booking,
    date: new Date(booking.date),
    createdAt: new Date(booking.createdAt),
    updatedAt: new Date(booking.updatedAt),
    customer: {
      ...booking.customer,
      lastVisit: booking.customer.lastVisit ? new Date(booking.customer.lastVisit) : undefined,
    },
  };
}

export default function RealEstateModuleClient({
  moduleKey,
  initialBookings,
  initialPagination,
}: {
  moduleKey: CrmModuleKey;
  initialBookings: SerializedBooking[];
  initialCustomers: SerializedCustomer[];
  initialPagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}) {
  const config = moduleConfigs[moduleKey];
  const Icon = config.icon;
  const [bookings, setBookings] = useState<Booking[]>(() => initialBookings.map(reviveBooking));
  const [pagination, setPagination] = useState(initialPagination);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<CalendarViewType>("month");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    serviceFilter,
    setServiceFilter,
    dateRange,
    setDateRange,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    dynamicFilters,
    addDynamicFilter,
    removeDynamicFilter,
    updateDynamicFilter,
    currentPage,
    setCurrentPage,
  } = useFilters();

  const visibleModule = useMemo(() => {
    if (moduleKey === "deals") return "deals";
    if (moduleKey === "calendar") return "calendar";
    if (moduleKey === "contacts") return "contacts";
    return "fallback";
  }, [moduleKey]);

  const refreshBookings = async () => {
    const result = await getBookings(
      currentPage,
      50,
      {
        search: searchTerm,
        status: statusFilter,
        service: serviceFilter,
      },
      {
        field: sortField,
        direction: sortDirection,
      },
      dynamicFilters,
    );

    setBookings(result.bookings);
    setPagination({
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      totalItems: result.totalItems,
    });
  };

  const handleCreateBooking = async (formData: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await createBooking(formData);
      await refreshBookings();
      setIsFormOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateBooking = async (formData: BookingFormData) => {
    if (!selectedBooking) return;
    setIsSubmitting(true);
    try {
      await updateBooking(selectedBooking.id, formData);
      await refreshBookings();
      setSelectedBooking(null);
      setIsDetailsOpen(false);
      setIsFormOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return;
    await deleteBooking(bookingToDelete);
    await refreshBookings();
    setBookingToDelete(null);
    setIsDeleteModalOpen(false);
    setSelectedBooking(null);
    setIsDetailsOpen(false);
  };

  const handleStatusChange = async (bookingId: string, status: Booking["status"]) => {
    const booking = bookings.find((item) => item.id === bookingId);
    if (!booking) return;

    const formData: BookingFormData = {
      customer: {
        fullName: booking.customer.fullName,
        email: booking.customer.email,
        phone: booking.customer.phone,
        company: booking.customer.company ?? "",
        address: booking.customer.address ?? "",
        notes: booking.customer.notes ?? "",
      },
      booking: {
        date: booking.date,
        startTime: booking.startTime,
        duration: booking.duration,
        people: booking.people,
        serviceType: booking.serviceType,
        occasion: booking.occasion ?? "",
        specialRequests: booking.specialRequests ?? "",
        location: booking.location ?? "",
        status,
        priority: booking.priority,
        staffAssigned: booking.staffAssigned ?? "",
        notes: booking.notes ?? "",
        source: booking.source ?? "website",
        tags: booking.tags ?? [],
      },
    };

    setBookings((items) => items.map((item) => (item.id === bookingId ? { ...item, status } : item)));
    await updateBooking(bookingId, formData);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-gray-500">{config.eyebrow}</p>
              <h1 className="mt-1 text-2xl font-bold text-primary">{config.title}</h1>
              <p className="mt-1 max-w-3xl text-sm text-gray-500">{config.description}</p>
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedBooking(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            {config.primaryAction}
          </button>
        </div>

        <StatsOverview bookings={bookings} currentFilter={statusFilter} onFilterChange={setStatusFilter} />

        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          serviceFilter={serviceFilter}
          setServiceFilter={setServiceFilter}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={(field, direction) => {
            setSortField(field);
            setSortDirection(direction);
          }}
          dateRange={dateRange}
          setDateRange={setDateRange}
          dynamicFilters={dynamicFilters}
          addDynamicFilter={addDynamicFilter}
          removeDynamicFilter={removeDynamicFilter}
          updateDynamicFilter={updateDynamicFilter}
        />

        {visibleModule === "deals" && (
          <KanbanBoard
            bookings={bookings}
            onView={(booking) => {
              setSelectedBooking(booking);
              setIsDetailsOpen(true);
            }}
            onStatusChange={handleStatusChange}
          />
        )}

        {visibleModule === "calendar" && (
          <CalendarViewComponent
            bookings={bookings}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            view={calendarView}
            onViewChange={setCalendarView}
            onBookingClick={(booking) => {
              setSelectedBooking(booking);
              setIsDetailsOpen(true);
            }}
            onDayClick={(date) => {
              setCurrentDate(date);
              setCalendarView("day");
            }}
          />
        )}

        {(visibleModule === "contacts" || visibleModule === "fallback") && (
          <BookingTable
            bookings={bookings}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
            isLoading={false}
            onView={(booking) => {
              setSelectedBooking(booking);
              setIsDetailsOpen(true);
            }}
            onDelete={(bookingId) => {
              setBookingToDelete(bookingId);
              setIsDeleteModalOpen(true);
            }}
          />
        )}
      </div>

      <BookingDetailsDrawer
        isOpen={isDetailsOpen}
        onClose={() => {
          setSelectedBooking(null);
          setIsDetailsOpen(false);
        }}
        booking={selectedBooking ?? undefined}
        onEdit={(booking) => {
          setSelectedBooking(booking);
          setIsDetailsOpen(false);
          setIsFormOpen(true);
        }}
        onDelete={(bookingId) => {
          setBookingToDelete(bookingId);
          setIsDeleteModalOpen(true);
        }}
      />

      <BookingFormDrawer
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedBooking(null);
        }}
        onSave={selectedBooking ? handleUpdateBooking : handleCreateBooking}
        isLoading={isSubmitting}
        booking={selectedBooking ?? undefined}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setBookingToDelete(null);
        }}
        onConfirm={handleDeleteBooking}
        booking={bookings.find((booking) => booking.id === bookingToDelete)}
      />
    </div>
  );
}
