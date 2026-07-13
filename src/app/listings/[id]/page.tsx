import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Maximize, IndianRupee, Tag } from 'lucide-react';
import { getListingById } from '@/actions/listing';
import BookingForm from '@/components/BookingForm';

export const revalidate = 0; // Disable caching to always fetch live data for now

export default async function ListingDetail({ params }: { params: { id: string } }) {
  const { data: listing, error } = await getListingById(params.id);

  if (error || !listing) {
    return notFound();
  }

  return (
    <div className="bg-mk-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/listings" className="inline-flex items-center text-mk-primary hover:text-mk-primary-dark font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Listings
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-96 relative">
                <img 
                  src={listing.image_url || '/hero-bg.jpg'} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                    listing.status === 'Available' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {listing.status}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    listing.zoning_type === 'Agricultural' ? 'bg-mk-bg text-mk-primary-dark border border-mk-gray' : 'bg-blue-50 text-blue-800 border border-blue-100'
                  }`}>
                    {listing.zoning_type}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">{listing.title}</h1>
                
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
                    <IndianRupee className="w-6 h-6 mr-2 text-mk-gold" /> 
                    <span className="text-xl font-bold">{listing.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
                    <MapPin className="w-5 h-5 mr-2 text-mk-gold" /> 
                    <span className="text-lg font-medium">{listing.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
                    <Maximize className="w-5 h-5 mr-2 text-mk-gold" /> 
                    <span className="text-lg font-medium">{listing.size}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-mk-primary" /> Property Overview
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm listingId={listing.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
