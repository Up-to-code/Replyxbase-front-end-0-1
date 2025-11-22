import { Booking, Customer } from '../types';
import { generateMinimalBookings, mockCustomers } from '../mockData';

// Simulate a database in memory
// Note: In a real serverless environment, this wouldn't persist.
// For this demo, it works as long as the server process stays alive.
export let dbBookings: Booking[] = [];
export let dbCustomers: Customer[] = [...mockCustomers];
let isInitialized = false;

export function initializeDb() {
  if (!isInitialized) {
    dbBookings = generateMinimalBookings();
    isInitialized = true;
  }
}

export function setDbBookings(bookings: Booking[]) {
  dbBookings = bookings;
}

export function setDbCustomers(customers: Customer[]) {
  dbCustomers = customers;
}

// Helper to simulate network delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
