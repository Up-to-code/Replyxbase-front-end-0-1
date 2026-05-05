import { getBookings, getCustomers } from "@/app/actions/crm";
import { CrmModuleKey } from "../real-estate-data";
import RealEstateModuleClient from "./RealEstateModuleClient";

export default async function RealEstateModulePage({ moduleKey }: { moduleKey: CrmModuleKey }) {
  const [bookingsData, customers] = await Promise.all([getBookings(1, 50), getCustomers()]);

  return (
    <RealEstateModuleClient
      moduleKey={moduleKey}
      initialBookings={bookingsData.bookings.map((booking) => ({
        ...booking,
        date: booking.date.toISOString(),
        createdAt: booking.createdAt.toISOString(),
        updatedAt: booking.updatedAt.toISOString(),
        customer: {
          ...booking.customer,
          lastVisit: booking.customer.lastVisit?.toISOString(),
        },
      }))}
      initialCustomers={customers.map((customer) => ({
        ...customer,
        lastVisit: customer.lastVisit?.toISOString(),
      }))}
      initialPagination={{
        currentPage: bookingsData.currentPage,
        totalPages: bookingsData.totalPages,
        totalItems: bookingsData.totalItems,
      }}
    />
  );
}
