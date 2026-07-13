"use client";

import { useState } from 'react';
import { submitSiteVisit } from '@/actions/visit';
import { toast } from 'sonner';

export default function BookingForm({ listingId }: { listingId: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formDataObj = new FormData();
    formDataObj.append('listing_id', listingId);
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('phone', formData.phone);
    formDataObj.append('preferred_date', formData.date);
    if (formData.notes) formDataObj.append('notes', formData.notes);

    const result = await submitSiteVisit(formDataObj);
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Site visit booked successfully! We will contact you soon to confirm.');
      setFormData({ name: '', email: '', phone: '', date: '', notes: '' });
    }
  };

  return (
    <div className="bg-mk-bg p-8 rounded-xl shadow-lg border border-mk-gray">
      <h3 className="text-2xl font-bold text-mk-primary-dark mb-6">Book a Site Visit</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" required 
            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-mk-primary focus:border-mk-primary p-3" 
            placeholder="John Doe"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input 
              type="email" required 
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-mk-primary focus:border-mk-primary p-3" 
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" required 
              value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-mk-primary focus:border-mk-primary p-3" 
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Date</label>
          <input 
            type="date" required 
            value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-mk-primary focus:border-mk-primary p-3" 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Notes</label>
          <textarea 
            rows={3} 
            value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-mk-primary focus:border-mk-primary p-3" 
            placeholder="Any specific requirements or questions..."
          ></textarea>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-mk-primary hover:bg-mk-primary-dark text-white font-bold py-4 px-4 rounded-lg shadow-md transition-all disabled:opacity-70 text-lg"
        >
          {loading ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}
