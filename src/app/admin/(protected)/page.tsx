import { getListings } from "@/actions/listing";
import { getSiteVisits } from "@/actions/visit";
import { getContactMessages } from "@/actions/contact";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const revalidate = 0; // Disable caching to always fetch live data

export default async function AdminDashboard() {
  const [{ data: listings = [] }, visits = [], { data: messages = [] }] = await Promise.all([
    getListings().catch(() => ({ data: [] })),
    getSiteVisits().catch(() => []),
    getContactMessages().catch(() => ({ data: [] }))
  ]);

  return <AdminDashboardClient listings={listings || []} visits={visits || []} messages={messages || []} />;
}
