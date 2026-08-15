import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-purple-800 shadow text-white/80 font-family">
      <div className="max-w-7xl mx-auto px-12 pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-2 pb-10 border-b border-gray-300">

          {/* Brand */}
          <div>
            <h3 className="mb-4 text-2xl text-white font-bold">GenZ Store</h3>
            <p className="text-sm leading-relaxed mb-5">
              GenZ Store brings you the most comfortable and trendy furniture for your modern lifestyle.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors">
                <FaFacebookF className="text-sm" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors">
                <FaTiktok className="text-sm" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div className="md:pl-16">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">Products</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/products" className="hover:text-purple-300 transition-colors">All Style</a></li>
              <li><a href="/products?category=men" className="hover:text-purple-300 transition-colors">Men's Style</a></li>
              <li><a href="/products?category=women" className="hover:text-purple-300 transition-colors">Women's Style</a></li>
              <li><a href="/products?category=couple" className="hover:text-purple-300 transition-colors">Couple's Style</a></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div className="lg:pl-16">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">Quick Link</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/" className="hover:text-purple-300 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-purple-300 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-purple-300 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:pl-16 lg:pl-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4 text-white">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <a href="mailto:info@genzstore.com" aria-label="Email" className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
                  <FaEnvelope />
                </a>
                <span className="text-sm mt-1.5">info@genzstore.com</span>
              </li>
              <li className="flex items-start gap-3">
                <a href="tel:0123456789" aria-label="Phone" className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
                  <FaPhone />
                </a>
                <span className="text-sm mt-1.5">0123456789</span>
              </li>
              <li className="flex items-start gap-3">
                <a href="#" aria-label="Location" className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white shrink-0">
                  <FaLocationDot />
                </a>
                <span className="text-sm mt-1.5">Phnom Penh, Cambodia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-5 text-center">
          <p className="text-xs">GenZ Store 2026. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}