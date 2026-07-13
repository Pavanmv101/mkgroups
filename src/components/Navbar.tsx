import Link from 'next/link';
import { Home, Phone, UserCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-mk-primary text-2xl font-bold tracking-tighter">MK GROUP</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-mk-gold hover:text-mk-primary-hover">
                Home
              </Link>
              <Link href="/listings" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-mk-gold hover:text-mk-primary-hover">
                Listings
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <a href="tel:+1234567890" className="inline-flex items-center text-sm font-medium text-mk-brown hover:text-mk-primary">
              <Phone className="h-4 w-4 mr-1" />
              Contact Us
            </a>
            <Link href="/admin/login" className="text-gray-400 hover:text-mk-primary transition-colors">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
