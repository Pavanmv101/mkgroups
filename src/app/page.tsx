import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative w-full h-[600px] flex items-center justify-center bg-mk-primary-dark"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-mk-bg mb-6 tracking-tight">
            Premium Land Developments for Agriculture & Living
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            MK Group specializes in verified, high-quality land conversions for agricultural, farming, and residential communities.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/listings" 
              className="bg-mk-gold hover:bg-yellow-500 text-mk-primary-dark font-bold py-3 px-8 rounded-md transition-colors inline-flex items-center"
            >
              View Listings <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-mk-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-mk-primary-dark mb-4">About MK Group</h2>
              <h3 className="text-xl text-mk-brown mb-6 font-semibold">Your Trusted Partner in Land Investment</h3>
              <p className="text-lg text-gray-600 mb-6">
                With years of expertise in land acquisition and development, MK Group ensures that every parcel of land we offer is thoroughly vetted, converted, and ready for your specific needs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ShieldCheck className="h-6 w-6 text-mk-gold mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-700"><strong>100% Clear Titles:</strong> Every property undergoes rigorous legal verification.</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-6 w-6 text-mk-gold mt-1 flex-shrink-0" />
                  <span className="ml-3 text-gray-700"><strong>Prime Locations:</strong> Strategically chosen plots with excellent growth potential.</span>
                </li>
              </ul>
            </div>
            <div className="bg-mk-gray h-80 rounded-lg flex items-center justify-center relative overflow-hidden shadow-xl border border-gray-200">
              <span className="text-gray-400 font-medium">[ Beautiful Landscape Placeholder ]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-mk-primary-dark">Our Development Standards</h2>
            <p className="mt-4 text-xl text-gray-600">Every project is equipped with essential infrastructure.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-mk-bg p-8 rounded-xl shadow-sm border border-mk-gray text-center hover:shadow-md transition-shadow">
              <div className="mx-auto h-12 w-12 bg-mk-primary-light text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Electricity Access</h3>
              <p className="text-gray-600">Reliable power connectivity established to all development boundaries.</p>
            </div>
            <div className="bg-mk-bg p-8 rounded-xl shadow-sm border border-mk-gray text-center hover:shadow-md transition-shadow">
              <div className="mx-auto h-12 w-12 bg-mk-primary-light text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Road Connectivity</h3>
              <p className="text-gray-600">Well-planned internal roads connecting to major highways and towns.</p>
            </div>
            <div className="bg-mk-bg p-8 rounded-xl shadow-sm border border-mk-gray text-center hover:shadow-md transition-shadow">
              <div className="mx-auto h-12 w-12 bg-mk-primary-light text-white rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Water Availability</h3>
              <p className="text-gray-600">Verified groundwater sources and planned irrigation infrastructure.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
