"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Invalid email or password");
        setLoading(false);
      }
    } catch {
      toast.error("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mk-bg px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center mb-6">
            <div className="bg-white rounded-full p-2 inline-flex items-center justify-center w-24 h-24 shadow-md border border-gray-100 overflow-hidden">
              <Image src="/logo.jpg" alt="MK Group Logo" width={100} height={100} className="w-full h-full object-contain" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-mk-primary-dark">Admin Access</h2>
          <p className="mt-2 text-sm text-gray-600">Secure login for MK Group Administrators</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-mk-primary hover:bg-mk-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mk-primary disabled:opacity-50 transition-colors"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
