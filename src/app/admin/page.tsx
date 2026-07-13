"use client";

import { useState } from "react";
import { LogOut, Home, Users, PlusCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data
const mockListings = [
  { id: "1", title: "10 Acres Prime Agricultural Land", location: "North Valley", size: "10 Acres", price: 500000, type: "Agricultural", status: "Available" },
  { id: "2", title: "Residential Plot in Gated Community", location: "Westside Hills", size: "2400 sq ft", price: 120000, type: "Residential", status: "Available" },
  { id: "3", title: "5 Guntas Farm Plot", location: "East Riverside", size: "5 Guntas", price: 85000, type: "Agricultural", status: "Booked" },
];

const mockVisits = [
  { id: "1", clientName: "John Doe", contact: "+123456789", property: "10 Acres Prime Agricultural Land", date: "2026-07-20 10:00 AM", status: "New" },
  { id: "2", clientName: "Jane Smith", contact: "jane@example.com", property: "Residential Plot in Gated Community", date: "2026-07-22 02:00 PM", status: "Contacted" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"listings" | "visits">("listings");
  const router = useRouter();

  const handleLogout = () => {
    // Simulate Supabase signout
    // await supabase.auth.signOut()
    router.push("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-mk-primary-dark text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-mk-primary">
          <h2 className="text-2xl font-bold tracking-tighter text-mk-gold">MK GROUP</h2>
          <p className="text-xs text-gray-300 mt-1">Admin Dashboard</p>
        </div>
        <div className="flex-1 py-6 space-y-2 px-4">
          <button 
            onClick={() => setActiveTab("listings")}
            className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'listings' ? 'bg-mk-primary text-white' : 'text-gray-300 hover:bg-mk-primary hover:text-white'}`}
          >
            <Home className="w-5 h-5 mr-3" /> Manage Listings
          </button>
          <button 
            onClick={() => setActiveTab("visits")}
            className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'visits' ? 'bg-mk-primary text-white' : 'text-gray-300 hover:bg-mk-primary hover:text-white'}`}
          >
            <Users className="w-5 h-5 mr-3" /> Site Visit Requests
          </button>
        </div>
        <div className="p-4 border-t border-mk-primary">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header (simplified) */}
        <div className="md:hidden bg-mk-primary-dark text-white p-4 flex justify-between items-center">
          <span className="font-bold">MK Group Admin</span>
          <button onClick={handleLogout}><LogOut className="w-5 h-5" /></button>
        </div>
        {/* Mobile Tabs */}
        <div className="md:hidden flex bg-white border-b border-gray-200">
          <button onClick={() => setActiveTab("listings")} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'listings' ? 'border-b-2 border-mk-primary text-mk-primary' : 'text-gray-500'}`}>Listings</button>
          <button onClick={() => setActiveTab("visits")} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'visits' ? 'border-b-2 border-mk-primary text-mk-primary' : 'text-gray-500'}`}>Visits</button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "listings" ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Manage Listings</h1>
                  <button className="bg-mk-primary hover:bg-mk-primary-hover text-white px-4 py-2 rounded-md font-medium flex items-center transition-colors">
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Listing
                  </button>
                </div>
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockListings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                            <div className="text-sm text-gray-500">{listing.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{listing.type}</div>
                            <div className="text-sm text-gray-500">{listing.size}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${listing.price.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${listing.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-mk-primary hover:text-mk-primary-hover mr-4"><Edit className="w-4 h-4 inline" /></button>
                            <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Site Visit Requests</h1>
                </div>
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date/Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockVisits.map((visit) => (
                        <tr key={visit.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{visit.clientName}</div>
                            <div className="text-sm text-gray-500">{visit.contact}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 line-clamp-2">{visit.property}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {visit.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select 
                              className="text-sm border-gray-300 rounded-md shadow-sm focus:border-mk-primary focus:ring-mk-primary"
                              defaultValue={visit.status}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-mk-primary hover:text-mk-primary-hover">Save</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
