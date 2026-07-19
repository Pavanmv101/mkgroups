"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { submitContactMessage } from '@/actions/contact';
import { toast } from 'sonner';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      await submitContactMessage(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-mk-bg min-h-screen">
      {/* Hero Header */}
      <div className="bg-mk-primary-dark py-20 text-center shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Whether you are looking to invest in agricultural land, secure a legacy asset, or have a general inquiry, our team is ready to help.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Contact Info & Form */}
          <div className="flex-1 p-8 lg:p-12 lg:pr-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-10 pb-10 border-b border-gray-100">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-mk-primary/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-mk-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-500">+91 87923 84199</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-mk-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-mk-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">mkagrilandprojects@gmail.com</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="name" name="name" required className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary p-3 bg-gray-50 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" id="phone" name="phone" required className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary p-3 bg-gray-50 transition-colors" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary p-3 bg-gray-50 transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">How can we help?</label>
                <textarea id="message" name="message" required rows={5} className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary p-3 bg-gray-50 transition-colors" placeholder="I'm interested in learning more about your projects..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-mk-primary hover:bg-mk-primary-hover text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex justify-center items-center"
              >
                {isSubmitting ? 'Sending...' : (
                  <>Send Message <Send className="ml-2 w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="flex-1 bg-gray-100 min-h-[400px] lg:min-h-auto relative">
            {/* Embedded Google Map pointing to Karnataka generally or a specific office if known. Using a general Karnataka coordinate for now. */}
            <iframe 
              src="https://maps.google.com/maps?q=Bengaluru,%20Karnataka&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Overlay card for physical address */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-mk-primary" /> Corporate Office
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bengaluru, Karnataka, India<br/>
                Available for meetings by appointment.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
