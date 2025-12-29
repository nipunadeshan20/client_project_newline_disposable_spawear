"use client";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactUs() {
  const contacts = [
    {
      title: "Email",
      value: "example@gmail.com",
      icon: <Mail className="w-6 h-6 text-gray-500" />,
      link: "mailto:example@gmail.com",
    },
    {
      title: "WhatsApp",
      value: "+94 77 123 4567",
      icon: <FaWhatsapp className="w-6 h-6 text-green-600" />,
      link: "https://wa.me/94771234567",
    },
    ,
    {
      title: "Facebook",
      value: "facebook.com/yourpage",
      icon: <Facebook className="w-6 h-6 text-blue-700" />,
      link: "https://facebook.com/yourpage",
    },
    {
      title: "Instagram",
      value: "@yourinstagram",
      icon: <Instagram className="w-6 h-6 text-pink-600" />,
      link: "https://instagram.com/yourinstagram",
    },
  ];

  return (
    <section
      id="contact"
      className=" scroll-margin-top-navbar w-full py-16 px-6 md:px-12 lg:px-24 bg-white px-10 py-20 bg-cover bg-center bg-no-repeat animate-fade-up"
      style={{ backgroundImage: "url('/images/ContactusBG.png')" }}
    >
      <div className="max-w-4xl mx-auto text-center ">
        <h2 className="text-3xl md:text-4xl font-bold text-[#242424]">
          <span className="text-[#242424]">Contact</span> Us
        </h2>

        <p className="text-gray-900 mt-3 mb-12">
          We’re here to help! Reach us anytime through email, WhatsApp, or our
          social media platforms.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {contacts.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            className="flex items-center gap-4 p-5 bg-white/15 backdrop-blur-sm hover:bg-white/25 transition shadow-sm"
          >
            <div className="p-3 bg-white rounded-xl shadow">{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm">{item.value}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
