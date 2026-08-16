import { Link } from "react-router-dom";
import { publicUrl } from "../lib/publicUrl";
import {
  FaTruckFast,
  FaRulerCombined,
  FaRotateLeft,
  FaCreditCard,
  FaHeadset,
  FaBoxOpen,
  FaArrowRight,
  FaCheck,
  FaStar,
} from "react-icons/fa6";

const SERVICES = [
  {
    icon: FaTruckFast,
    title: "Fast Shipping",
    description: "Packed within 24 hours and shipped nationwide, with express options when you need it sooner.",
  },
  {
    icon: FaRulerCombined,
    title: "Size & Fit Guide",
    description: "Detailed size charts on every product so you order the right fit the first time, every time.",
  },
  {
    icon: FaRotateLeft,
    title: "Easy Returns",
    description: "14 days to change your mind. Free exchanges on size issues, no awkward questions asked.",
  },
  {
    icon: FaCreditCard,
    title: "Secure Payment",
    description: "Cards, e-wallets, or bank transfer — every transaction is encrypted end to end.",
  },
  {
    icon: FaBoxOpen,
    title: "Order Tracking",
    description: "Follow your order from confirmation to your doorstep, right from your account.",
  },
  {
    icon: FaHeadset,
    title: "Customer Support",
    description: "Sizing questions or order issues — our team replies within 24 hours, every day.",
  },
];

const TRUST_POINTS = [
  "Same-day dispatch on orders before 3PM",
  "14-day free returns & exchanges",
  "Verified, secure checkout every time",
];

export default function Services() {
  return (
    <div className="bg-white overflow-hidden">
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-600 mb-4">
              We Don't Just Sell Fits,
              <span className="text-pink-600"> We Back Them</span>
            </h1>
            <p className="text-black/55 text-sm sm:text-base mt-5 max-w-md leading-relaxed">
              From the moment you check out to the moment it lands on your doorstep,
              here's everything GenZ Store does to make sure you're covered.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to="/products"
                className="rounded-xl bg-purple-600 text-white font-600 px-6 py-3 text-sm hover:bg-purple-700 transition-colors"
              >
                Shop the collection
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-purple-200 font-600 px-6 py-3 text-sm hover:bg-black/5 transition-colors">
                Talk to us
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200">
              <img
                src={publicUrl("/images/goodService.png")}
                alt="GenZ Store customer wearing the latest collection"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>

            {/* Floating rating card */}
            <div className="absolute -bottom-6 left-4 sm:left-8 bg-white rounded-2xl shadow-lg border border-black/5 px-5 py-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                <FaStar />
              </div>
              <div>
                <p className="font-display font-700 text-lg leading-none">4.9 / 5</p>
                <p className="text-xs text-black/45 mt-1">from 8,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-purple-50/60 rounded-3xl p-6 sm:p-10 lg:p-14">
          <div className="order-2 lg:order-1">
            <h2 className="font-extrabold text-purple-600 text-5xl sm:text-3xl mb-4">
              Why shoppers keep coming back
            </h2>
            <p className="text-black/55 text-sm leading-relaxed mb-6 max-w-md">
              We built GenZ Store around one idea — shopping should feel effortless
              from cart to closet. Here's how we back that up.
            </p>
            <ul className="space-y-3 mb-8">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-black/70">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <FaCheck size={11} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-block rounded-full bg-purple-600 text-white font-600 px-6 py-3 text-sm hover:bg-purple-700 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          <div className="order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-200 to-purple-300">
              <img
                src={publicUrl("/images/goodService.png")}
                alt="Packing an order at GenZ Store"
                className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")}/>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 sm:pb-28">
        <div className="text-center max-w-lg mx-auto mb-12">
          <p className="text-xs font-700 uppercase tracking-widest text-purple-600 mb-3">
            Features & services
          </p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl">
            Everything covered, start to fit
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group relative rounded-2xl border border-black/10 p-6 hover:border-purple-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-700 text-lg mb-2">{title}</h3>
              <p className="text-sm text-black/55 leading-relaxed mb-6">{description}</p>
              <div className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center text-black/40 group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-colors">
                <FaArrowRight size={13} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}