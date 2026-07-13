"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Maximize, Tag } from "lucide-react";

// Mock Data representing Supabase 'listings' table
const mockListings = [
  {
    id: "1",
    title: "10 Acres Prime Agricultural Land",
    location: "North Valley",
    size: "10 Acres",
    price: 500000,
    zoning_type: "Agricultural",
    description: "Fertile land suitable for various crops. Includes a functioning well and electricity access.",
    status: "Available",
    image_url: "/placeholder-agri.jpg" // Using placeholder text for now
  },
  {
    id: "2",
    title: "Residential Plot in Gated Community",
    location: "Westside Hills",
    size: "2400 sq ft",
    price: 120000,
    zoning_type: "Residential",
    description: "Clear title residential plot ready for construction. Amenities include paved roads and street lighting.",
    status: "Available",
    image_url: "/placeholder-res.jpg"
  },
  {
    id: "3",
    title: "5 Guntas Farm Plot",
    location: "East Riverside",
    size: "5 Guntas",
    price: 85000,
    zoning_type: "Agricultural",
    description: "Perfect for a weekend farmhouse. Adjacent to a perennial river stream.",
    status: "Booked",
    image_url: "/placeholder-farm.jpg"
  }
];

export default function ListingsPage() {
  const [zoningFilter, setZoningFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const filteredListings = mockListings.filter((listing) => {
    const matchZoning = zoningFilter === "All" || listing.zoning_type === zoningFilter;
    const matchLocation = locationFilter === "All" || listing.location.includes(locationFilter);
    return matchZoning && matchLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-mk-primary-dark tracking-tight">Property Listings</h1>
        <p className="mt-2 text-xl text-gray-600">Find the perfect piece of land for your needs.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Zoning Type</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border"
            value={zoningFilter}
            onChange={(e) => setZoningFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Residential">Residential</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <select 
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="All">All Locations</option>
            <option value="North Valley">North Valley</option>
            <option value="Westside Hills">Westside Hills</option>
            <option value="East Riverside">East Riverside</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <Link href={`/listings/${listing.id}`} key={listing.id} className="group flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
            <div className="h-48 bg-mk-gray relative flex items-center justify-center text-gray-400 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              {/* Fallback placeholder text */}
              <span className="font-medium">Image Placeholder</span>
              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${listing.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {listing.status}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-mk-primary transition-colors line-clamp-1">{listing.title}</h3>
              
              <div className="mt-4 flex flex-col space-y-2 text-sm text-gray-600 flex-1">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-mk-brown" />
                  {listing.location}
                </div>
                <div className="flex items-center">
                  <Maximize className="h-4 w-4 mr-2 text-mk-brown" />
                  {listing.size}
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-mk-brown" />
                  {listing.zoning_type}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-2xl font-bold text-mk-primary-dark">
                  ${listing.price.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-mk-gold hover:text-yellow-600">
                  View Details &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredListings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No properties found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
