'use server';

import { dbCustomers, initializeDb, delay } from './db';

export async function getCustomers() {
  initializeDb();
  await delay(200);
  return dbCustomers;
}
