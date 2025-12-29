import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


export default function Footer() {
  return (
    <footer 
      className="w-full bg-black text-white px-6 md:px-12 lg:px-24 py-14"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-12">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <img
            src="/logo.png"
            alt="New Line - Premium Disposable Spa Wear Company Logo"
            className="w-24 pb-4 h-auto object-contain mx-auto md:mx-0"
            loading="lazy"
          />
          <p className="mt-3 text-gray-300 text-[12px] leading-relaxed max-w-xs mx-auto md:mx-0">
            Creating meaningful digital experiences with clean, modern, and
            user-focused design.
          </p>
        </div>

        {/* 3 Column Section (Quick Links, Contact, Socials) */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr_0.8fr] gap-10 text-center md:text-left">
          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-semibold text-[12px] mb-3">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-[12px]">
              <li>
                <a href="#home" className="hover:text-white" aria-label="Go to Home section">
                  Home
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white" aria-label="Go to Shop section">
                  Shop
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white" aria-label="Go to About Us section">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white" aria-label="Go to Contact Us section">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-[12px] mb-3">Contact</h3>
            <ul className="space-y-3 text-gray-300 text-[12px]">
              {/* Email */}
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-gray-300" /> yourmail@gmail.com
              </li>

              {/* WhatsApp */}
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <FaWhatsapp className="w-5 h-5 text-gray-300" /> +94 71 234 5678
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-[12px] mb-3">Follow Us</h3>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <a 
                href="https://facebook.com" 
                className="hover:text-white" 
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://instagram.com" 
                className="hover:text-white" 
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-400 text-[12px]">
        © {new Date().getFullYear()} New Line. All rights reserved.
      </div>
    </footer>
  );
}
