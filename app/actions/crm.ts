'use server';

import { Booking, BookingFormData, SortField, SortDirection, Customer } from '@/app/[locale]/dashboard/crm/types';
import { calculateEndTime } from '@/app/[locale]/dashboard/crm/utils';
import { generateMinimalBookings, mockCustomers } from '@/app/[locale]/dashboard/crm/mockData';

// --- DB Simulation ---
// Simulate a database in memory
// Note: In a real serverless environment, this wouldn't persist.
// For this demo, it works as long as the server process stays alive.
let dbBookings: Booking[] = [];
let dbCustomers: Customer[] = [...mockCustomers];
let isInitialized = false;

function initializeDb() {
  if (!isInitialized) {
    dbBookings = generateMinimalBookings();
    isInitialized = true;
  }
}

function setDbBookings(bookings: Booking[]) {
  dbBookings = bookings;
}

function setDbCustomers(customers: Customer[]) {
  dbCustomers = customers;
}

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Activities Actions ---
export async function logActivity(
  type: 'call' | 'email' | 'note' | 'meeting',
  content: string,
  relatedTo: 'booking' | 'customer',
  relatedId: string
) {
  initializeDb();
  await delay(300);

  const activity: any = {
    id: `activity-${Date.now()}`,
    type,
    content,
    createdAt: new Date(),
    createdBy: 'CurrentUser', // Mock user
    relatedTo,
    relatedId
  };

  if (relatedTo === 'booking') {
    const booking = dbBookings.find(b => b.id === relatedId);
    if (booking) {
      booking.activities = [...(booking.activities || []), activity];
    }
  } else {
    // Handle customer activities if needed
  }

  return { success: true, activity };
}

// --- Bookings Actions ---
export async function getBookings(
  page: number = 1,
  itemsPerPage: number = 10,
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
    operator: 'equals' | 'contains' | 'gt' | 'lt';
    value: string;
  }[]
) {
  initializeDb();
  await delay(500); // Simulate latency

  let filtered = [...dbBookings];

  // Apply filters
  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(b =>
        b.customer.fullName.toLowerCase().includes(searchLower) ||
        b.customer.email.toLowerCase().includes(searchLower) ||
        b.customer.phone.includes(filters.search!)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(b => b.status === filters.status);
    }

    if (filters.service && filters.service !== 'all') {
      filtered = filtered.filter(b => b.serviceType === filters.service);
    }
  }

  // Apply dynamic filters
  if (dynamicFilters && dynamicFilters.length > 0) {
    filtered = filtered.filter(booking => {
      return dynamicFilters.every(filter => {
        if (!filter.value) return true; // Skip empty values
        
        const bookingValue = (booking as any)[filter.field];
        const filterValue = filter.value;

        switch (filter.operator) {
          case 'equals':
            return String(bookingValue).toLowerCase() === String(filterValue).toLowerCase();
          case 'contains':
            return String(bookingValue).toLowerCase().includes(String(filterValue).toLowerCase());
          case 'gt':
            return Number(bookingValue) > Number(filterValue);
          case 'lt':
            return Number(bookingValue) < Number(filterValue);
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sort) {
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sort.field) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'customer':
          aValue = a.customer.fullName.toLowerCase();
          bValue = b.customer.fullName.toLowerCase();
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'service':
          aValue = a.serviceType.toLowerCase();
          bValue = b.serviceType.toLowerCase();
          break;
        case 'priority':
          const priorityOrder = { 'urgent': 3, 'high': 2, 'normal': 1 };
          aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBookings = filtered.slice(startIndex, startIndex + itemsPerPage);

  return {
    bookings: paginatedBookings,
    totalItems,
    totalPages,
    currentPage: page
  };
}

export async function createBooking(formData: BookingFormData) {
  initializeDb();
  await delay(800);

  // Check if customer exists or create new
  let customer = dbCustomers.find(c => c.email === formData.customer.email);
  
  if (!customer) {
    customer = {
      id: `customer-${Date.now()}`,
      ...formData.customer,
      totalBookings: 0,
    };
    setDbCustomers([...dbCustomers, customer]);
  } else {
      // Update existing customer info
      const updatedCustomer = { ...customer, ...formData.customer };
      setDbCustomers(dbCustomers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
      customer = updatedCustomer;
  }

  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    customerId: customer.id,
    customer: customer,
    date: formData.booking.date,
    startTime: formData.booking.startTime,
    endTime: calculateEndTime(formData.booking.startTime, formData.booking.duration),
    duration: formData.booking.duration,
    people: formData.booking.people,
    serviceType: formData.booking.serviceType,
    occasion: formData.booking.occasion || '',
    specialRequests: formData.booking.specialRequests || '',
    location: formData.booking.location || '',
    status: formData.booking.status,
    priority: formData.booking.priority,
    staffAssigned: formData.booking.staffAssigned || '',
    notes: formData.booking.notes || '',
    source: formData.booking.source || 'website',
    tags: formData.booking.tags || [],
    activities: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  setDbBookings([...dbBookings, newBooking]);
  
  // Update customer stats
  customer.totalBookings = (customer.totalBookings || 0) + 1;
  customer.lastVisit = newBooking.date;

  return { success: true, booking: newBooking };
}

export async function updateBooking(bookingId: string, formData: BookingFormData) {
  initializeDb();
  await delay(800);

  const index = dbBookings.findIndex(b => b.id === bookingId);
  if (index === -1) {
    throw new Error('Booking not found');
  }

  const oldBooking = dbBookings[index];
  
  // Update customer info
  let customer = dbCustomers.find(c => c.id === oldBooking.customerId);
  if (customer) {
      const updatedCustomer = { ...customer, ...formData.customer };
      setDbCustomers(dbCustomers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
      customer = updatedCustomer;
  }

  const updatedBooking: Booking = {
    ...oldBooking,
    customer: customer || oldBooking.customer,
    date: formData.booking.date,
    startTime: formData.booking.startTime,
    endTime: calculateEndTime(formData.booking.startTime, formData.booking.duration),
    duration: formData.booking.duration,
    people: formData.booking.people,
    serviceType: formData.booking.serviceType,
    occasion: formData.booking.occasion,
    specialRequests: formData.booking.specialRequests,
    location: formData.booking.location,
    status: formData.booking.status,
    priority: formData.booking.priority,
    staffAssigned: formData.booking.staffAssigned,
    notes: formData.booking.notes,
    source: formData.booking.source,
    tags: formData.booking.tags,
    updatedAt: new Date(),
  };

  const newBookings = [...dbBookings];
  newBookings[index] = updatedBooking;
  setDbBookings(newBookings);
  
  return { success: true, booking: updatedBooking };
}

export async function deleteBooking(bookingId: string) {
  initializeDb();
  await delay(500);
  
  setDbBookings(dbBookings.filter(b => b.id !== bookingId));
  return { success: true };
}

export async function updateBookingStatus(bookingId: string, status: Booking['status']) {
  initializeDb();
  await delay(300);

  const booking = dbBookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = status;
    booking.updatedAt = new Date();
    return { success: true, booking };
  }
  return { success: false, error: 'Booking not found' };
}

// --- Calendar Actions ---
export async function getAllBookingsForCalendar(
    filters?: {
        search?: string;
        status?: string;
        service?: string;
    }
) {
    initializeDb();
    await delay(300);

    let filtered = [...dbBookings];

    // Apply filters (same as above, could be refactored)
    if (filters) {
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(b =>
                b.customer.fullName.toLowerCase().includes(searchLower) ||
                b.customer.email.toLowerCase().includes(searchLower) ||
                b.customer.phone.includes(filters.search!)
            );
        }

        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(b => b.status === filters.status);
        }

        if (filters.service && filters.service !== 'all') {
            filtered = filtered.filter(b => b.serviceType === filters.service);
        }
    }
    
    return filtered;
}

// --- Customers Actions ---
export async function getCustomers() {
  initializeDb();
  await delay(200);
  return dbCustomers;
}
