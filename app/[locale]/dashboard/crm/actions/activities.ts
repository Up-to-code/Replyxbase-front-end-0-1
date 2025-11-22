'use server';

import { dbBookings, initializeDb, delay } from './db';

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
