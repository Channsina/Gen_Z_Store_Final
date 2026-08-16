import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { publicUrl } from "../lib/publicUrl";

const categories = [
  {
    type: "men",
    image: "/images/homeImage/menCateory.png",
    title: "Men",
    description:
      "Modern and versatile looks for men, featuring tailored trousers, casual shirts, and sleek footwear that balance comfort with confident style.",
    to: "/products?category=men",
  },
  {
    type: "women",
    image: "/images/homeImage/womenCateory.png",
    title: "Women",
    description:
      "Elegant and versatile outfits curated for women, featuring chic dresses, stylish tops, and modern accessories that highlight confidence and individuality.",
    to: "/products?category=women",
  },
  {
    type: "couple",
    image: "/images/homeImage/coupleCateory.png",
    title: "Couple",
    description:
      "Coordinated outfits designed for couples, blending casual denim, relaxed trousers, and matching sandals for a stylish paired look.",
    to: "/products?category=couple",
  },
];

const collections = [
  {
    label: "Winter Collection",
    image:
      "/images/homeImage/winterCollection.png",
    className:
      "sm:col-span-2 h-50 rounded-t-2xl md:rounded-tl-2xl lg:rounded-tl-2xl lg:rounded-none",
  },
  {
    label: "Pants",
    image:
      "/images/homeImage/pant.png",
    className: "sm:row-span-2 h-[300px] sm:h-[420px]",
  },
  {
    label: "Skirts",
    image:
      "/images/homeImage/skirt.png",
    className: "sm:row-span-2 h-[300px] sm:h-[420px] lg:rounded-se-2xl",
  },
  {
    label: "Shoes",
    image: "/images/homeImage/shoes.png",
    className: "sm:col-span-2 h-52",
  },
  {
    label: "T-Shirts",
    image:
      "/images/homeImage/t-Shirt.png",
    className: "h-[300px] sm:h-[420px] lg:rounded-es-2xl",
  },
  {
    label: "Dresses",
    image:
      "/images/homeImage/dress.png",
    className: "h-[300px] sm:h-[420px]",
  },
  {
    label: "Jackets",
    image: "/images/homeImage/jacket.png",
    className:
      "sm:row-span-4 sm:col-span-2 h-[300px] sm:h-[420px] rounded-b-2xl md:rounded-b-2xl lg:rounded-br-2xl lg:rounded-none",
  },
];

const whyUs = [
  {
    title: "High Quality",
    copy: "We deliver premium quality products that meet international standards.",
    icon: (
      <path d="M353.8 118.1L330.2 70.3C326.3 62 314.1 61.7 309.8 70.3L286.2 118.1L233.9 125.6C224.6 127 220.6 138.5 227.5 145.4L265.5 182.4L256.5 234.5C255.1 243.8 264.7 251 273.3 246.7L320.2 221.9L366.8 246.3C375.4 250.6 385.1 243.4 383.6 234.1L374.6 182L412.6 145.4C419.4 138.6 415.5 127.1 406.2 125.6L353.9 118.1zM288 320C261.5 320 240 341.5 240 368L240 528C240 554.5 261.5 576 288 576L352 576C378.5 576 400 554.5 400 528L400 368C400 341.5 378.5 320 352 320L288 320zM80 384C53.5 384 32 405.5 32 432L32 528C32 554.5 53.5 576 80 576L144 576C170.5 576 192 554.5 192 528L192 432C192 405.5 170.5 384 144 384L80 384zM448 496L448 528C448 554.5 469.5 576 496 576L560 576C586.5 576 608 554.5 608 528L608 496C608 469.5 586.5 448 560 448L496 448C469.5 448 448 469.5 448 496z" />
    ),
  },
  {
    title: "Best Value",
    copy: "Competitive pricing that gives you maximum value for your money.",
    icon: (
      <path d="M320.3 192L235.7 51.1C229.2 40.3 215.6 36.4 204.4 42L117.8 85.3C105.9 91.2 101.1 105.6 107 117.5L176.6 256.6C146.5 290.5 128.3 335.1 128.3 384C128.3 490 214.3 576 320.3 576C426.3 576 512.3 490 512.3 384C512.3 335.1 494 290.5 464 256.6L533.6 117.5C539.5 105.6 534.7 91.2 522.9 85.3L436.2 41.9C425 36.3 411.3 40.3 404.9 51L320.3 192zM351.1 334.5C352.5 337.3 355.1 339.2 358.1 339.6L408.2 346.9C415.9 348 418.9 357.4 413.4 362.9L377.1 398.3C374.9 400.5 373.9 403.5 374.4 406.6L383 456.5C384.3 464.1 376.3 470 369.4 466.4L324.6 442.8C321.9 441.4 318.6 441.4 315.9 442.8L271.1 466.4C264.2 470 256.2 464.2 257.5 456.5L266.1 406.6C266.6 403.6 265.6 400.5 263.4 398.3L227.1 362.9C221.5 357.5 224.6 348.1 232.3 346.9L282.4 339.6C285.4 339.2 288.1 337.2 289.4 334.5L311.8 289.1C315.2 282.1 325.1 282.1 328.6 289.1L351 334.5z" />
    ),
  },
  {
    title: "Fast Delivery",
    copy: "Quick and reliable delivery service right to your doorstep.",
    icon: (
      <path d="M64 160C64 124.7 92.7 96 128 96L416 96C451.3 96 480 124.7 480 160L480 192L530.7 192C547.7 192 564 198.7 576 210.7L621.3 256C633.3 268 640 284.3 640 301.3L640 448C640 483.3 611.3 512 576 512L572.7 512C562.3 548.9 528.3 576 488 576C447.7 576 413.8 548.9 403.3 512L300.7 512C290.3 548.9 256.3 576 216 576C175.7 576 141.8 548.9 131.3 512L128 512C92.7 512 64 483.3 64 448L64 400L24 400C10.7 400 0 389.3 0 376C0 362.7 10.7 352 24 352L136 352C149.3 352 160 341.3 160 328C160 314.7 149.3 304 136 304L24 304C10.7 304 0 293.3 0 280C0 266.7 10.7 256 24 256L200 256C213.3 256 224 245.3 224 232C224 218.7 213.3 208 200 208L24 208C10.7 208 0 197.3 0 184C0 170.7 10.7 160 24 160L64 160zM576 352L576 301.3L530.7 256L480 256L480 352L576 352zM256 488C256 465.9 238.1 448 216 448C193.9 448 176 465.9 176 488C176 510.1 193.9 528 216 528C238.1 528 256 510.1 256 488zM488 528C510.1 528 528 510.1 528 488C528 465.9 510.1 448 488 448C465.9 448 448 465.9 448 488C448 510.1 465.9 528 488 528z" />
    ),
  },
];

export default function Home() {
  const { products } = useProducts();
  const popular = products.filter((p) => p.bestSeller).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-50 py-12 p-5">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center text-center md:text-left">
          {/* Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-600 mb-4">
              DISCOVER YOUR STYLE AT
              <span className="text-pink-500"> GenZ Store</span>
            </h1>
            <p className="text-sm md:text-md lg:text-lg text-gray-500 mb-6">
              Trendy, affordable fashion made for teens and young adults.
              Express yourself with outfits that match your vibe.
            </p>
            <Link to="/products" className="bg-purple-600 text-white px-8 py-3 rounded-lg shadow-xl hover:bg-purple-500 transition duration-300 inline-block" >
              Shop Now
            </Link>
          </div>

          {/* Image Content */}
          <div className="md:w-1/2 flex justify-center">
            <img src={publicUrl("/images/homeImage/genzFasion.png")} alt="GenZ fashion" className="rounded-xl shadow-2xl max-h-[450px] object-cover"/>
          </div>
        </div>
      </div>

      {/* Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl p-5 mt-4">
        {categories.map((c) => (
          <div key={c.title} className="relative w-full h-56 rounded-2xl overflow-hidden group">
            <img src={publicUrl(c.image)} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-white text-lg font-semibold leading-tight">
                  {c.title}
                </h3>
                <p className="text-white/70 text-sm mt-1 truncate">
                  {c.description}
                </p>
              </div>
              <Link to={c.to} aria-label={`Shop ${c.title}`} className="flex-shrink-0 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Cards Section */}
      <div className="py-12">
        <div className="container mx-auto max-w-7xl p-5">
          <h2 className="text-3xl font-bold mb-16 text-center text-purple-600">
            Popular Products
          </h2>
          {popular.length === 0 ? (
            <p className="text-center text-black/40">
              No products yet — add some from the admin dashboard.
            </p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 gap-6">
            {popular.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          )}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mx-auto max-w-7xl p-5">
        <div className="container mx-auto py-12 sm:py-16 px-0 bg-gray-100 rounded-3xl mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-600">
                1000+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Happy Customers
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-600">
                25+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Products Available
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-600">
                3+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Years of Experience
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-600">
                24/7
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Customer Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Collection Mosaic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto p-5">
        {collections.map((c) => (
          <div key={c.label} className={`relative overflow-hidden ${c.className}`}>
            <img src={publicUrl(c.image)} alt={c.label} className="w-full h-full object-cover"/>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {c.label}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="mx-auto max-w-7xl p-5">
        <div className="container mx-auto max-w7xl px-14 sm:px-2 bg-gray-100 py-12 mb-16 rounded-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-600 mb-10 sm:mb-14">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4 px-0 md:px-8 lg:px-8">
            {whyUs.map((w) => (
              <div key={w.title} className="bg-white p-4 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-5 flex items-center justify-center rounded-full bg-indigo-100 group-hover:bg-purple-600 transition">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600 group-hover:text-white transition" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    {w.icon}
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {w.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}