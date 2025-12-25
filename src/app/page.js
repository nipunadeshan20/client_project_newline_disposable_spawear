import Navbar from "../app/components/Navbar";
import HeroSection from "../app/components/HeroSection/hero";
import ShopSection from "./components/Shop/fourway";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Script from "next/script";

// JSON-LD Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "New Line",
  description: "Premium disposable spa wear for professionals. Hygienic, comfortable, and trusted by luxury spas and hotels.",
  url: "https://newline.lk",
  logo: "https://newline.lk/logo.png",
  image: "https://newline.lk/images/hero_background.png",
  priceRange: "LKR",
  address: {
    "@type": "PostalAddress",
    addressCountry: "LK",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "LKR",
    availability: "https://schema.org/InStock",
    itemOffered: [
      {
        "@type": "Product",
        name: "Disposable Underwear - Fourway Material",
        description: "Premium disposable underwear made from fourway stretch material. Each pack contains 100 pieces.",
        category: "Spa Wear",
      },
      {
        "@type": "Product",
        name: "Disposable Underwear - Paper Material",
        description: "Eco-friendly disposable underwear made from paper material. Each pack contains 100 pieces.",
        category: "Spa Wear",
      },
      {
        "@type": "Product",
        name: "T-Light Candle",
        description: "Premium t-light candles for spa ambiance. Each pack contains 100 pieces.",
        category: "Spa Accessories",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div itemScope itemType="https://schema.org/WebPage">
        <header>
          <Navbar />
        </header>
        
        <main>
          <HeroSection />
          <ShopSection />
          <AboutUs />
          <ContactUs />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
