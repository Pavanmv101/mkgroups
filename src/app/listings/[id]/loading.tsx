export default function ListingDetailLoading() {
  return (
    <div className="bg-mk-bg min-h-screen py-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link Skeleton */}
        <div className="h-4 w-32 bg-gray-200 rounded-md mb-8"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property Details Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Image Carousel Skeleton */}
              <div className="h-[400px] w-full bg-gray-200"></div>
              
              <div className="p-8">
                {/* Badges */}
                <div className="h-6 w-24 bg-gray-200 rounded-full mb-4"></div>
                
                {/* Title */}
                <div className="h-10 w-3/4 bg-gray-200 rounded-lg mb-6"></div>
                
                {/* Stats Bar */}
                <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="h-12 w-32 bg-gray-100 rounded-lg"></div>
                  <div className="h-12 w-48 bg-gray-100 rounded-lg"></div>
                  <div className="h-12 w-32 bg-gray-100 rounded-lg"></div>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-4">
                  <div className="h-6 w-48 bg-gray-200 rounded-md mb-6"></div>
                  <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                  <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                  <div className="h-4 w-5/6 bg-gray-100 rounded-md"></div>
                  <div className="h-4 w-4/6 bg-gray-100 rounded-md"></div>
                  <div className="h-4 w-full bg-gray-100 rounded-md mt-6"></div>
                  <div className="h-4 w-3/4 bg-gray-100 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Booking Form Skeleton */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="h-6 w-48 bg-gray-200 rounded-md mb-6"></div>
                <div className="space-y-4">
                  <div className="h-12 w-full bg-gray-50 rounded-lg"></div>
                  <div className="h-12 w-full bg-gray-50 rounded-lg"></div>
                  <div className="h-12 w-full bg-gray-50 rounded-lg"></div>
                  <div className="h-12 w-full bg-gray-50 rounded-lg"></div>
                  <div className="h-12 w-full bg-gray-200 rounded-lg mt-6"></div>
                </div>
              </div>
              
              {/* WhatsApp Quick Connect Skeleton */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="h-6 w-48 bg-gray-200 rounded-md mx-auto mb-2"></div>
                <div className="h-4 w-56 bg-gray-100 rounded-md mx-auto mb-4"></div>
                <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
