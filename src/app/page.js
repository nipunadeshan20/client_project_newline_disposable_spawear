
import Navbar from "../app/components/Navbar";
import HeroSection from "../app/components/HeroSection/hero";
import ShopSection from "./components/Shop/fourway";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <main>
        
        <HeroSection/>
        <ShopSection/>
        <AboutUs />
        <ContactUs />
        <Footer/>
        
      </main>
    </div>
  );
}
