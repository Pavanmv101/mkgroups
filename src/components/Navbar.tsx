"use client";

import Link from 'next/link';
import { Home, Phone, UserCircle, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide the global Navbar on admin pages since they have their own layout
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bg-white rounded-full overflow-hidden shadow-sm border border-gray-100 flex items-center justify-center w-16 h-16">
                <Image src="/logo.jpg" alt="MK Group" width={100} height={100} className="w-full h-full object-cover" priority />
              </div>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
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
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-6">
            <Link href="/contact" className="inline-flex items-center text-sm font-medium text-mk-brown hover:text-mk-primary">
              <Phone className="h-4 w-4 mr-1" />
              Contact Us
            </Link>
            <Link href="/admin" className="text-gray-400 hover:text-mk-primary transition-colors">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mk-gold"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-mk-gold hover:text-mk-primary-hover"
            >
              Home
            </Link>
            <Link 
              href="/listings" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-mk-gold hover:text-mk-primary-hover"
            >
              Listings
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-mk-gold hover:text-mk-primary-hover"
            >
              Contact
            </Link>
            <Link 
              href="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-mk-gold hover:text-mk-primary-hover flex items-center"
            >
              <UserCircle className="h-5 w-5 mr-2" />
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
