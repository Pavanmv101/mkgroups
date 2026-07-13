"use client";

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Maximize, ArrowRight, Filter, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ListingsGrid({ initialListings }: { initialListings: any[] }) {
  const [filterType, setFilterType] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');

  // Extract unique locations for the filter
  const locations = ['All', ...Array.from(new Set(initialListings.map(l => l.location)))];

  const filteredListings = initialListings.filter(listing => {
    const matchType = filterType === 'All' || listing.zoning_type === filterType;
    const matchLocation = filterLocation === 'All' || listing.location === filterLocation;
    return matchType && matchLocation;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
            <Filter className="w-4 h-4 mr-1 text-mk-primary" /> Zoning Type
          </label>
          <select 
            className="w-full border-gray-200 rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary transition-colors cursor-pointer bg-gray-50 p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Residential">Residential</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-mk-primary" /> Location
          </label>
          <select 
            className="w-full border-gray-200 rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary transition-colors cursor-pointer bg-gray-50 p-2"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
          <button 
            onClick={() => { setFilterType('All'); setFilterLocation('All'); }}
            className="mt-4 text-mk-primary hover:text-mk-primary-dark font-medium underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredListings.map((listing) => (
              <motion.div 
                key={listing.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={listing.image_url || '/hero-bg.jpg'} 
                    alt={listing.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                      listing.status === 'Available' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {listing.status}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md bg-white/80 ${
                      listing.zoning_type === 'Agricultural' ? 'text-mk-primary-dark' : 'text-blue-800'
                    }`}>
                      {listing.zoning_type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">{listing.title}</h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-600 flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-mk-gold" /> {listing.location}
                    </p>
                    <p className="text-gray-600 flex items-center text-sm">
                      <Maximize className="w-4 h-4 mr-2 text-mk-gold" /> {listing.size}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-2xl font-extrabold text-mk-primary-dark flex items-center">
                      <IndianRupee className="w-5 h-5 mr-1 text-gray-400" />
                      {listing.price.toLocaleString('en-IN')}
                    </p>
                    <Link 
                      href={`/listings/${listing.id}`}
                      className="text-mk-primary hover:text-mk-primary-dark font-semibold flex items-center group-hover:underline"
                    >
                      Details <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
