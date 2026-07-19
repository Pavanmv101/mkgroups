import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Maximize, Tag, MessageCircle } from 'lucide-react';
import { getListingById } from '@/actions/listing';
import BookingForm from '@/components/BookingForm';

import ImageCarousel from '@/components/ImageCarousel';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { data: listing } = await getListingById(resolvedParams.id);
  
  if (!listing) {
    return { title: 'Listing Not Found | MK Group' };
  }

  const mainImage = (listing.image_urls && listing.image_urls.length > 0) 
    ? listing.image_urls[0] 
    : (listing.image_url || '/hero-bg.jpg');

  return {
    title: `${listing.title} | MK Group`,
    description: listing.description.substring(0, 160),
    openGraph: {
      title: `${listing.title} - Price on Request`,
      description: `Premium ${listing.zoning_type === 'Agricultural' ? 'Agricultural Land' : listing.zoning_type === 'Residential' ? 'Dry Land' : listing.zoning_type} in ${listing.location}. ${listing.size}.`,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
    },
  };
}

export default async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: listing, error } = await getListingById(resolvedParams.id);

  if (error || !listing) {
    return notFound();
  }

  // Combine new image_urls and legacy image_url for the carousel
  const images = listing.image_urls && listing.image_urls.length > 0 
    ? listing.image_urls 
    : (listing.image_url ? [listing.image_url] : []);

  // Pre-fill WhatsApp message
  const whatsappMessage = encodeURIComponent(`Hi MK Group, I am interested in your property listing: ${listing.title} (${listing.location}). Please share more details with me.`);
  const whatsappUrl = `https://wa.me/918792384199?text=${whatsappMessage}`;

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
              <div className="relative">
                <ImageCarousel images={images} />
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                    listing.status === 'Available' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {listing.status}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${
                    listing.zoning_type === 'Agricultural' ? 'bg-mk-bg text-mk-primary-dark border border-mk-gray' : 'bg-blue-50 text-blue-800 border border-blue-100'
                  }`}>
                    {listing.zoning_type === 'Agricultural' ? 'Agricultural Land' : listing.zoning_type === 'Residential' ? 'Dry Land' : listing.zoning_type}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">{listing.title}</h1>
                
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-xl font-bold">Price on Request</span>
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
            <div className="sticky top-24 space-y-6">
              <BookingForm listingId={listing.id} />
              
              {/* WhatsApp Quick Connect */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Have quick questions?</h3>
                <p className="text-gray-500 text-sm mb-4">Chat directly with our sales team on WhatsApp.</p>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#25D366] hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
