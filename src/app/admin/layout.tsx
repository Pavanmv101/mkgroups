import { ReactNode } from "react";

export const metadata = {
  title: "Admin Dashboard | MK Group",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  // In a real application, you would implement Next.js middleware
  // to protect all /admin routes except /admin/login by checking Supabase auth session.
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {children}
    </div>
  );
}
