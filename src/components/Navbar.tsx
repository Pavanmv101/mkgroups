import Link from 'next/link';
import { Home, Phone, UserCircle } from 'lucide-react';

import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bg-white rounded-full overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center w-16 h-16">
                <Image src="/logo.jpg" alt="MK Group" width={100} height={100} className="w-full h-full object-cover" priority />
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-mk-gold hover:text-mk-primary-hover">
                Home
              </Link>
              <Link href="/listings" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-mk-gold hover:text-mk-primary-hover">
                Listings
              </Link>
              <Link href="/contact" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-mk-gold hover:text-mk-primary-hover">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link href="/contact" className="inline-flex items-center text-sm font-medium text-mk-brown hover:text-mk-primary">
              <Phone className="h-4 w-4 mr-1" />
              Contact Us
            </Link>
            <Link href="/admin" className="text-gray-400 hover:text-mk-primary transition-colors">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
