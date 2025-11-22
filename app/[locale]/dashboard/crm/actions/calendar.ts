'use server';

import { dbBookings, initializeDb, delay } from './db';

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
