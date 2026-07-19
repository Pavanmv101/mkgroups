import { ReactNode } from "react";

// Parent layout for /admin — no auth check here.
// Auth is handled by the (protected) route group layout.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
