// src/app/layout.js
import Navbar from "./components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import ScrollAnimation from "./components/ScrollAnimation";
import { CartProvider } from "@/context/CartContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

// SEO Metadata
export const metadata = {
  title: "New Line | Premium Disposable Spa Wear for Professionals",
  description: "Shop premium disposable spa wear including underwear, shorts, and t-light candles. Hygienic, comfortable, and trusted by luxury spas and hotels in Sri Lanka. Fourway material and paper material options available.",
  keywords: "disposable spa wear, disposable underwear, spa supplies, hotel amenities, disposable shorts, t-light candles, Sri Lanka, hygienic wear, professional spa products, bulk spa supplies",
  authors: [{ name: "New Line" }],
  creator: "New Line",
  publisher: "New Line",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newline.lk",
    siteName: "New Line",
    title: "New Line | Premium Disposable Spa Wear",
    description: "Hygienic, comfortable disposable spa wear trusted by luxury spas and hotels. Shop fourway material wear, paper material wear, and t-light candles.",
    images: [
      {
        url: "/images/hero_background.png",
        width: 1200,
        height: 630,
        alt: "New Line Premium Disposable Spa Wear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Line | Premium Disposable Spa Wear",
    description: "Hygienic, comfortable disposable spa wear trusted by luxury spas and hotels.",
    images: ["/images/hero_background.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      {/* This single prop fixes the Grammarly hydration warning */}
      <body className="antialiased" suppressHydrationWarning={true}>
        <CartProvider>
          {/* If you want Navbar in the layout (most people do) */}
          
          <ScrollAnimation />

          
          {children}
        </CartProvider>
      </body>
    </html>
  );
}