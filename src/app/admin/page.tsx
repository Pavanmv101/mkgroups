import { getListings } from "@/actions/listing";
import { getSiteVisits } from "@/actions/visit";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const revalidate = 0; // Disable caching to always fetch live data

export default async function AdminDashboard() {
  const [{ data: listings = [] }, visits = []] = await Promise.all([
    getListings(),
    getSiteVisits().catch(() => []) // Handle potential errors gracefully if table is empty
  ]);

  return <AdminDashboardClient listings={listings || []} visits={visits || []} />;
}
