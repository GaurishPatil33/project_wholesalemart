"use client";
import { Categories } from "@/lib/data";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialIcons = [
    { icon: Facebook, label: "Facebook", color: "from-blue-600 to-blue-400" },
    { icon: Twitter, label: "Twitter", color: "from-sky-500 to-sky-300" },
    {
      icon: Instagram,
      label: "Instagram",
      color: "from-pink-600 via-purple-600 to-indigo-600",
    },
    { icon: Youtube, label: "YouTube", color: "from-red-600 to-red-400" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative mt-10">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 bg-gradient-to-r from-[#900001] to-red-600 hover:from-red-600 hover:to-[#900001] text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 z-10 "
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      <footer className="bg-gradient-to-br from-[#900001]/90 via-[#190001] to-gray-900/99 text-white relative overflow-hidden mt-10">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto px-6 lg:px-8 max-w-7xl">
          {/* Main footer content */}
          <div className="pt-10 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Brand section */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <img
                      src="/logos/ram.png"
                      alt="CHHABI Logo"
                      className="w-12 h-12 rounded-full ring-2 ring-white/10 ring-offset-2 ring-offset-transparent"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-sm"></div>
                  </div>
                  <div className="">
                    <span className="text-2xl font-bold bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent">
                      RAM
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Your ultimate shopping destination for the best deals and
                  latest trends. Experience premium quality with unbeatable
                  prices.
                </p>

                {/* Contact info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <Mail className="w-4 h-4 text-red-50" />
                    <span>chhabi@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-300">
                    <Phone className="w-4 h-4 text-red-50" />
                    <span>+91 999 999 9999</span>
                  </div>
                </div>
              </div>

              {/* Shop categories */}
              <div>
                <h4 className="text-lg font-semibold mb-6 relative">
                  <span className="relative z-10">Shop Categories</span>
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-purple-500"></div>
                </h4>
                <ul className="space-y-3">
                  {Categories.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white relative group transition-all duration-300 block py-1"
                      >
                        <span className="relative z-10">{item.title}</span>
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 relative">
                  <span className="relative z-10">Quick Links</span>
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-purple-500"></div>
                </h4>
                <ul className="space-y-3">
                  {["About Us", "Contact", "Blog", "Careers"].map(
                    (item, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-gray-300 hover:text-white relative group transition-all duration-300 block py-1"
                        >
                          <span className="relative z-10">{item}</span>
                          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Customer Service */}
              <div>
                <h4 className="text-lg font-semibold mb-6 relative">
                  <span className="relative z-10">Customer Service</span>
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-purple-500"></div>
                </h4>
                <ul className="space-y-3">
                  {[
                    "Help Center",
                    "Returns & Refunds",
                    "Shipping Info",
                    "Size Guide",
                  ].map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white relative group transition-all duration-300 block py-1"
                      >
                        <span className="relative z-10">{item}</span>
                        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social media and newsletter section */}
          <div className="border-t border-gray-700/50 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Social media */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <h4 className="text-lg font-semibold">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialIcons.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <div
                        key={index}
                        // onMouseEnter={() => setHoveredSocial(index)}
                        onMouseLeave={() => setHoveredSocial(null)}
                        className="relative group"
                      >
                        <div
                          className={`
                          w-12 h-12 rounded-full flex items-center justify-center 
                          transition-all duration-300 cursor-pointer
                          ${
                            hoveredSocial === index
                              ? `bg-gradient-to-r ${social.color} shadow-lg shadow-red-500/25`
                              : "bg-gray-700/50 hover:bg-gray-600/50"
                          }
                          transform hover:scale-110 hover:-translate-y-1
                        `}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                            {social.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <span className="text-gray-300 whitespace-nowrap">
                  Stay updated:
                </span>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors w-48"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-[#900001] to-red-600 hover:from-red-600 hover:to-[#900001] rounded-r-lg font-semibold transition-all duration-300 hover:shadow-lg">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700/50 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                &copy; 2025 CHHABI. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-red-500"></div>
      </footer>
    </div>
  );
};

export default Footer;
