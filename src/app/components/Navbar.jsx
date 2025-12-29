"use client";
import React from "react";
import CartButton from "./Cartbutton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");

  // Disable body scroll on mobile menu
  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isMenuOpen]);

  // Scroll Spy Logic
  React.useEffect(() => {
    const sections = ["home", "shop", "about", "contact"];
    const handleScroll = () => {
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 150) current = id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (id) =>
    `hover:text-black dark:hover:text-white transition-colors ${
      activeSection === id
        ? "text-black dark:text-white font-semibold"
        : "text-gray-600 dark:text-gray-400"
    }`;

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="flex items-center justify-between py-4 px-4 sm:px-8 lg:px-[100px] w-full bg-white dark:bg-black">
          {/* Nav items (large screens) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium flex-1">
            <a href="#home" className={linkClass("home")}>Home</a>
            <a href="#shop" className={linkClass("shop")}>Shop</a>
            <a href="#about" className={linkClass("about")}>About Us</a>
            <a href="#contact" className={linkClass("contact")}>Contact Us</a>
          </nav>

          {/* Mobile toggle */}
          <div className="lg:hidden flex-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-black dark:text-white"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <a href="#home">
              <img src="/logo.png" alt="Logo" className="h-8 lg:h-11 object-contain" />
            </a>
          </div>

          {/* Desktop right side */}
          <nav className="hidden lg:flex items-center justify-end gap-6 text-sm flex-1">
            <div className="flex items-center gap-[10px]">
              <a href="https://facebook.com" target="_blank">
                <img src="/icons/fb_icon.png" className="w-5.5 h-5.5 hover:opacity-70 transition" />
              </a>
              <a href="https://instagram.com" target="_blank">
                <img src="/icons/instagram_icon.png" className="w-5.5 h-5.5 hover:opacity-70 transition" />
              </a>
            </div>
            <CartButton />
          </nav>

          {/* Mobile Cart */}
          <div className="lg:hidden flex-1 flex justify-end">
            <CartButton />
          </div>
        </div>
      </header>

     {/* 🚀 FULLSCREEN MOBILE MENU (outside header now) */}
<div
  className={`lg:hidden fixed inset-0 z-40 bg-white dark:bg-black transition-transform duration-300 ease-in-out ${
    isMenuOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
    <img src="/logo.png" className="h-8 object-contain" />
    <button className="text-black dark:text-white" onClick={() => setIsMenuOpen(false)}>
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <nav className="flex flex-col items-center justify-center h-full -mt-24 gap-8 text-xl font-medium">
    <a href="#home" className={linkClass("home")} onClick={() => setIsMenuOpen(false)}>Home</a>
    <a href="#shop" className={linkClass("shop")} onClick={() => setIsMenuOpen(false)}>Shop</a>
    <a href="#about" className={linkClass("about")} onClick={() => setIsMenuOpen(false)}>About Us</a>
    <a href="#contact" className={linkClass("contact")} onClick={() => setIsMenuOpen(false)}>Contact Us</a>

    {/* Social Icons */}
    <div className="flex items-center gap-6 mt-10">
      <a href="https://facebook.com" target="_blank">
        <img src="/icons/fb_icon.png" className="w-6 h-6 hover:opacity-70 transition" />
      </a>
      <a href="https://instagram.com" target="_blank">
        <img src="/icons/instagram_icon.png" className="w-6 h-6 hover:opacity-70 transition" />
      </a>
    </div>
  </nav>
</div>

    </>
  );
}
