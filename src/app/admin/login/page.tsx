"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Supabase login
    // const { error } = await supabase.auth.signInWithPassword({ email, password })
    setTimeout(() => {
      setLoading(false);
      // For now, mock successful login and redirect
      router.push("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mk-bg px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-mk-primary-light text-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-mk-primary-dark">Admin Access</h2>
          <p className="mt-2 text-sm text-gray-600">Secure login for MK Group Administrators</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
