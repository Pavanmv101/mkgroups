"use client";

import Image from "next/image";

import { useState } from "react";
import { LogOut, Home, Users, PlusCircle, Edit, Trash2, X, Upload, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateVisitStatus } from "@/actions/visit";
import { addListing, updateListing, deleteListing } from "@/actions/listing";
import { updateMessageStatus } from "@/actions/contact";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboardClient({ listings, visits, messages }: { listings: any[], visits: any[], messages: any[] }) {
  const [activeTab, setActiveTab] = useState<"listings" | "visits" | "messages">("listings");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/api/admin/logout");
  };


  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateVisitStatus(id, newStatus);
      toast.success("Status updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to update status");
    }
  };

  const handleMessageStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateMessageStatus(id, newStatus);
      toast.success("Message status updated");
    } catch (err: any) {
      toast.error(err.message || "Failed to update message status");
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteListing(id);
      toast.success("Listing deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete listing");
    }
  };

  const openModal = (listing: any = null) => {
    setEditingListing(listing);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return null;

    setUploadingImage(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('property_images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('property_images')
          .getPublicUrl(filePath);
          
        uploadedUrls.push(data.publicUrl);
      }
      return uploadedUrls;
    } catch (error: any) {
      toast.error(error.message || "Error uploading images");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleListingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      const fileInput = e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement;
      
      if (fileInput?.files?.length) {
        const imageUrls = await handleImageUpload(fileInput.files);
        if (imageUrls && imageUrls.length > 0) {
          formData.set('image_urls', JSON.stringify(imageUrls));
          formData.set('image_url', imageUrls[0]); // fallback for old column
        }
      }

      if (editingListing) {
        await updateListing(editingListing.id, formData);
        toast.success("Listing updated successfully");
      } else {
        await addListing(formData);
        toast.success("Listing created successfully");
      }
      
      setIsModalOpen(false);
      setEditingListing(null);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-mk-primary-dark text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-mk-primary flex items-center space-x-3">
          <div className="bg-white rounded-full p-1 inline-flex items-center justify-center w-14 h-14 shadow-sm overflow-hidden flex-shrink-0">
            <Image src="/logo.jpg" alt="MK Group" width={60} height={60} className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tighter text-mk-gold">MK GROUP</h2>
            <p className="text-xs text-gray-300 mt-0.5">Admin Dashboard</p>
          </div>
        </div>
        <div className="flex-1 py-6 space-y-2 px-4">
          <button 
            onClick={() => setActiveTab("listings")}
            className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'listings' ? 'bg-mk-primary text-white' : 'text-gray-300 hover:bg-mk-primary hover:text-white'}`}
          >
            <Home className="w-5 h-5 mr-3" /> Manage Listings
          </button>
          <button 
            onClick={() => setActiveTab("visits")}
            className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'visits' ? 'bg-mk-primary text-white' : 'text-gray-300 hover:bg-mk-primary hover:text-white'}`}
          >
            <Users className="w-5 h-5 mr-3" /> Site Visit Requests
          </button>
          <button 
            onClick={() => setActiveTab("messages")}
            className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${activeTab === 'messages' ? 'bg-mk-primary text-white' : 'text-gray-300 hover:bg-mk-primary hover:text-white'}`}
          >
            <Mail className="w-5 h-5 mr-3" /> Messages
          </button>
        </div>
        <div className="p-4 border-t border-mk-primary">
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden bg-mk-primary-dark text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-0.5 inline-flex items-center justify-center w-8 h-8 shadow-sm overflow-hidden flex-shrink-0">
              <Image src="/logo.jpg" alt="MK Group" width={40} height={40} className="w-full h-full object-contain" />
            </div>
            <span className="font-bold">MK Group Admin</span>
          </div>
          <button onClick={handleLogout}><LogOut className="w-5 h-5" /></button>
        </div>
        {/* Mobile Tabs */}
        <div className="md:hidden flex bg-white border-b border-gray-200">
          <button onClick={() => setActiveTab("listings")} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'listings' ? 'border-b-2 border-mk-primary text-mk-primary' : 'text-gray-500'}`}>Listings</button>
          <button onClick={() => setActiveTab("visits")} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'visits' ? 'border-b-2 border-mk-primary text-mk-primary' : 'text-gray-500'}`}>Visits</button>
          <button onClick={() => setActiveTab("messages")} className={`flex-1 py-3 text-sm font-medium ${activeTab === 'messages' ? 'border-b-2 border-mk-primary text-mk-primary' : 'text-gray-500'}`}>Msgs</button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === "listings" ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Manage Listings</h1>
                  <button onClick={() => openModal()} className="bg-mk-primary hover:bg-mk-primary-hover text-white px-4 py-2 rounded-md font-medium flex items-center transition-colors shadow-sm">
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Listing
                  </button>
                </div>
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type / Size</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listings.length === 0 && (
                        <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No listings found.</td></tr>
                      )}
                      {listings.map((listing) => (
                        <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">{listing.title}</div>
                            <div className="text-sm text-gray-500">{listing.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {listing.zoning_type === 'Agricultural' ? 'Agricultural Land' : listing.zoning_type === 'Residential' ? 'Dry Land' : listing.zoning_type}
                            </div>
                            <div className="text-sm text-gray-500">{listing.size}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            ₹{listing.price.toLocaleString('en-IN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full shadow-sm ${listing.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => openModal(listing)} className="text-mk-primary hover:text-mk-primary-hover mr-4 transition-colors"><Edit className="w-5 h-5 inline" /></button>
                            <button onClick={() => handleDeleteListing(listing.id)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 className="w-5 h-5 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeTab === "visits" ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Site Visit Requests</h1>
                </div>
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {visits.length === 0 && (
                        <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No site visits found.</td></tr>
                      )}
                      {visits.map((visit) => (
                        <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">{visit.name}</div>
                            <div className="text-sm text-gray-500">{visit.phone} • {visit.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">{visit.listings?.title || 'Unknown Property'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                            {new Date(visit.preferred_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select 
                              className="text-sm font-semibold border-gray-300 rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary cursor-pointer p-2"
                              defaultValue={visit.status}
                              onChange={(e) => handleStatusChange(visit.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
                </div>
                <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {messages.length === 0 && (
                        <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No contact messages found.</td></tr>
                      )}
                      {messages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">{msg.name}</div>
                            <div className="text-sm text-gray-500">{msg.phone} • {msg.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{msg.message}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select 
                              className={`text-sm font-semibold rounded-lg shadow-sm focus:border-mk-primary focus:ring-mk-primary cursor-pointer p-2 ${msg.status === 'Unread' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-gray-50 border-gray-300'}`}
                              defaultValue={msg.status}
                              onChange={(e) => handleMessageStatusChange(msg.id, e.target.value)}
                            >
                              <option value="Unread">Unread</option>
                              <option value="Read">Read</option>
                              <option value="Replied">Replied</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingListing ? 'Edit Listing' : 'Add New Listing'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleListingSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                  <input type="text" name="title" required defaultValue={editingListing?.title} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" name="location" required defaultValue={editingListing?.location} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size (e.g. 10 Acres)</label>
                  <input type="text" name="size" required defaultValue={editingListing?.size} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" name="price" required defaultValue={editingListing?.price} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zoning Type</label>
                  <select name="zoning_type" required defaultValue={editingListing?.zoning_type || "Agricultural"} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border">
                    <option value="Agricultural">Agricultural Land</option>
                    <option value="Residential">Dry Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" required defaultValue={editingListing?.status || "Available"} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border">
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" required rows={4} defaultValue={editingListing?.description} className="w-full border-gray-300 rounded-md shadow-sm focus:ring-mk-primary focus:border-mk-primary p-2 border"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative hover:bg-gray-50 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-mk-primary hover:text-mk-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-mk-primary">
                        <span>Upload a file</span>
                        <input type="file" name="images" multiple accept="image/*" className="sr-only" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB (You can select multiple files)</p>
                    {editingListing?.image_urls?.length > 0 ? (
                      <p className="text-xs text-green-600 font-semibold mt-2">Currently has {editingListing.image_urls.length} image(s) uploaded.</p>
                    ) : editingListing?.image_url ? (
                      <p className="text-xs text-green-600 font-semibold mt-2">Currently has an image uploaded.</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mk-primary mr-3">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting || uploadingImage} className="bg-mk-primary border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-mk-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mk-primary disabled:opacity-50 flex items-center">
                  {(isSubmitting || uploadingImage) ? 'Saving...' : 'Save Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
