import { getListings } from '@/actions/listing';
import ListingsGrid from '@/components/ListingsGrid';

export const dynamic = 'force-dynamic';

export default async function ListingsPage() {
  const { data: listings, error } = await getListings();

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error loading listings</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-mk-bg min-h-screen pb-20">
      <div className="bg-mk-primary-dark py-16 text-center shadow-inner">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-sm mb-4">
          Available Properties
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Explore our handpicked selection of verified agricultural and dry land.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <ListingsGrid initialListings={listings || []} />
      </div>
    </div>
  );
}
