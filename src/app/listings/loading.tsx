export default function Loading() {
  return (
    <div className="bg-mk-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Skeleton */}
        <div className="text-center mb-12 animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 rounded-md mx-auto"></div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-pulse">
          <div className="flex-1 md:col-span-2 h-14 bg-gray-100 rounded-lg"></div>
          <div className="flex-1 h-14 bg-gray-100 rounded-lg"></div>
          <div className="flex-1 h-14 bg-gray-100 rounded-lg"></div>
          <div className="flex-1 h-14 bg-gray-100 rounded-lg"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
              {/* Image area */}
              <div className="h-48 bg-gray-200"></div>
              
              {/* Content area */}
              <div className="p-6">
                {/* Title */}
                <div className="h-6 w-3/4 bg-gray-200 rounded-md mb-4"></div>
                
                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
                </div>
                
                {/* Footer (Price & Button) */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-6 w-1/3 bg-gray-200 rounded-md"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
