import { Booking, BookingFormData, Customer, SortDirection, SortField } from "@/app/[locale]/dashboard/crm/types";
import { generateMinimalBookings, mockCustomers } from "@/app/[locale]/dashboard/crm/mockData";
import { calculateEndTime } from "@/app/[locale]/dashboard/crm/utils";

type BookingResult = {
  bookings: Booking[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
};

let bookingsStore: Booking[] = generateMinimalBookings();
let customersStore: Customer[] = [...mockCustomers];

const delay = () => new Promise((resolve) => setTimeout(resolve, 150));

const matchesSearch = (booking: Booking, search?: string) => {
  if (!search) return true;
  const term = search.toLowerCase();
  return [
    booking.customer.fullName,
    booking.customer.email,
    booking.customer.phone,
    booking.serviceType,
    booking.status,
  ].some((value) => value?.toLowerCase().includes(term));
};

const sortBookings = (bookings: Booking[], field: SortField, direction: SortDirection) => {
  const sign = direction === "asc" ? 1 : -1;
  return [...bookings].sort((a, b) => {
    if (field === "date") return (new Date(a.date).getTime() - new Date(b.date).getTime()) * sign;
    if (field === "customer") return a.customer.fullName.localeCompare(b.customer.fullName) * sign;
    if (field === "status") return a.status.localeCompare(b.status) * sign;
    if (field === "service") return a.serviceType.localeCompare(b.serviceType) * sign;
    return a.priority.localeCompare(b.priority) * sign;
  });
};

const bookingFromForm = (formData: BookingFormData, existingId?: string): Booking => {
  const existingCustomer = customersStore.find((customer) => customer.email === formData.customer.email);
  const customer: Customer = {
    id: existingCustomer?.id ?? `customer-${Date.now()}`,
    ...formData.customer,
    loyaltyTier: existingCustomer?.loyaltyTier ?? "bronze",
    totalBookings: existingCustomer?.totalBookings ?? 0,
    lastVisit: formData.booking.date,
    preferences: existingCustomer?.preferences ?? [],
  };

  customersStore = existingCustomer
    ? customersStore.map((item) => (item.id === existingCustomer.id ? customer : item))
    : [customer, ...customersStore];

  return {
    id: existingId ?? `booking-${Date.now()}`,
    customerId: customer.id,
    customer,
    ...formData.booking,
    endTime: calculateEndTime(formData.booking.startTime, formData.booking.duration),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export async function logActivity(
  type: "call" | "email" | "note" | "meeting",
  content: string,
  _relatedTo: "booking" | "customer",
  relatedId: string,
) {
  await delay();
  const activity = {
    id: `activity-${Date.now()}`,
    type,
    content,
    createdAt: new Date(),
    createdBy: "Demo User",
    relatedId,
  };
  return { success: true, activity };
}

export async function getBookings(
  page = 1,
  itemsPerPage = 10,
  filters?: {
    search?: string;
    status?: string;
    service?: string;
  },
  sort?: {
    field: SortField;
    direction: SortDirection;
  },
  dynamicFilters?: {
    id: string;
    field: string;
    operator: "equals" | "contains" | "gt" | "lt";
    value: string;
  }[],
): Promise<BookingResult> {
  await delay();

  let filtered = bookingsStore.filter((booking) => {
    const statusMatch = !filters?.status || filters.status === "all" || booking.status === filters.status;
    const serviceMatch = !filters?.service || filters.service === "all" || booking.serviceType === filters.service;
    return statusMatch && serviceMatch && matchesSearch(booking, filters?.search);
  });

  dynamicFilters?.forEach((filter) => {
    if (!filter.value) return;
    filtered = filtered.filter((booking) => {
      const value = booking[filter.field as keyof Booking];
      if (value == null) return false;
      if (filter.operator === "contains") return String(value).toLowerCase().includes(filter.value.toLowerCase());
      if (filter.operator === "equals") return String(value).toLowerCase() === filter.value.toLowerCase();
      if (filter.operator === "gt") return Number(value) > Number(filter.value);
      if (filter.operator === "lt") return Number(value) < Number(filter.value);
      return true;
    });
  });

  if (sort) filtered = sortBookings(filtered, sort.field, sort.direction);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const start = (page - 1) * itemsPerPage;

  return {
    bookings: filtered.slice(start, start + itemsPerPage),
    totalItems,
    totalPages,
    currentPage: page,
  };
}

export async function createBooking(formData: BookingFormData) {
  await delay();
  const booking = bookingFromForm(formData);
  bookingsStore = [booking, ...bookingsStore];
  return { success: true, booking };
}

export async function updateBooking(bookingId: string, formData: BookingFormData) {
  await delay();
  const booking = bookingFromForm(formData, bookingId);
  bookingsStore = bookingsStore.map((item) => (item.id === bookingId ? booking : item));
  return { success: true, booking };
}

export async function deleteBooking(bookingId: string) {
  await delay();
  bookingsStore = bookingsStore.filter((booking) => booking.id !== bookingId);
  return { success: true };
}

export async function updateBookingStatus(bookingId: string, status: Booking["status"]) {
  await delay();
  bookingsStore = bookingsStore.map((booking) =>
    booking.id === bookingId ? { ...booking, status, updatedAt: new Date() } : booking,
  );
  return { success: true, booking: bookingsStore.find((booking) => booking.id === bookingId) };
}

export async function getAllBookingsForCalendar() {
  await delay();
  return bookingsStore;
}

export async function getCustomers() {
  await delay();
  return customersStore;
}
