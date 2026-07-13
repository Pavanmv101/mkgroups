"use client";

import { useState, use } from "react";
import { MapPin, Maximize, Tag, Zap, Droplets, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const mockListings = [
  {
    id: "1",
    title: "10 Acres Prime Agricultural Land",
    location: "North Valley",
    size: "10 Acres",
    price: 500000,
    zoning_type: "Agricultural",
    description: "Fertile land suitable for various crops. Includes a functioning well and electricity access. Clear title and boundary markings completed.",
    status: "Available",
    amenities: ["Fencing", "Electricity", "Water Source (Borewell)"]
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
    amenities: ["Paved Roads", "Underground Electricity", "Sewer Connection"]
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
    amenities: ["River Access", "Partial Fencing"]
  }
];

export default function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const listing = mockListings.find(l => l.id === resolvedParams.id);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    preferredDate: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Listing not found</h1>
        <Link href="/listings" className="text-mk-primary mt-4 inline-block hover:underline">
          &larr; Back to listings
        </Link>
      </div>
    );
  }

  const handleBookVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate Supabase INSERT
    // await supabase.from('site_visits').insert([{ property_id: listing.id, ...formData }])
    console.log("Submitting site visit:", formData, "for property:", listing.id);
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/listings" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-mk-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-mk-gray h-96 rounded-xl flex items-center justify-center text-gray-500 shadow-md relative overflow-hidden">
            <span className="font-semibold text-xl">[ High-Res Image Placeholder ]</span>
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-1.5 text-sm font-bold uppercase rounded-full shadow-sm ${listing.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {listing.status}
              </span>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center"><MapPin className="w-5 h-5 mr-1.5 text-mk-brown" /> {listing.location}</span>
              <span className="flex items-center"><Maximize className="w-5 h-5 mr-1.5 text-mk-brown" /> {listing.size}</span>
              <span className="flex items-center"><Tag className="w-5 h-5 mr-1.5 text-mk-brown" /> {listing.zoning_type}</span>
            </div>
            <div className="text-3xl font-bold text-mk-primary-dark mb-8">
              ${listing.price.toLocaleString()}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {listing.description}
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {listing.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-mk-gold mr-3" />
                  <span className="text-gray-700 font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 sticky top-24">
            <h3 className="text-2xl font-bold text-mk-primary-dark mb-2">Book a Site Visit</h3>
            <p className="text-gray-600 mb-6 text-sm">Schedule a tour of this property with our agents.</p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-green-900 mb-2">Request Received!</h4>
                <p className="text-green-700 text-sm">We will contact you shortly to confirm your visit schedule.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-green-800 underline hover:text-green-600"
                >
                  Book another visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookVisit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    required 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date & Time</label>
                  <input 
                    type="datetime-local" 
                    required 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border text-gray-700"
                    value={formData.preferredDate}
                    onChange={e => setFormData({...formData, preferredDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea 
                    rows={3}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2.5 border"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={listing.status === 'Booked'}
                  className="w-full bg-mk-primary hover:bg-mk-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-colors shadow-sm"
                >
                  {listing.status === 'Booked' ? 'Property Not Available' : 'Submit Booking Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
