export default function Footer() {
  return (
    <footer className="bg-mk-gray-dark text-mk-bg py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-xl font-bold tracking-tighter text-mk-gold">MK GROUP</span>
            <p className="mt-4 text-sm text-gray-400">
              Specializing in the development and conversion of land for agricultural, farming, and residential use.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Email: info@mkgroup-agri.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 Agri Land Blvd, Suite 100</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">Legal Disclaimer</h3>
            <p className="mt-4 text-xs text-gray-500 leading-relaxed">
              Listings are for informational purposes only. All titles and property details should be independently verified. Transactions are subject to local regulatory compliance and zoning approvals.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex justify-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MK Group Agri Land Developers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
