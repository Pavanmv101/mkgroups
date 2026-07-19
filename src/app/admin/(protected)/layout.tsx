import { ReactNode } from "react";
import { verifyAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard | MK Group",
};

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {children}
    </div>
  );
}
