// src/app/layout.js
import Navbar from "./components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import ScrollAnimation from "./components/ScrollAnimation";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
      {/* This single prop fixes the Grammarly hydration warning */}
      <body className="antialiased" suppressHydrationWarning={true}>
        {/* If you want Navbar in the layout (most people do) */}
        
        <ScrollAnimation />

        
        {children}
      </body>
    </html>
  );
}