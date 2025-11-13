import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  HelpCircle,
  Package,
  LucideIcon,
  RotateCcw,
  Package2,
} from "lucide-react";
import React, { useState } from "react";


interface Categories{
  id:string;
  title:string
  icon:LucideIcon
  description:string
  faqs:{q:string,a:string}[]
}

const categories:Categories[] = [
  {
    id: "orders",
    title: "Orders & Delivery",
    icon: Package,
    description: "Track orders, delivery issues, returns",
    faqs: [
      {
        q: "How do I track my order?",
        a: "Go to Orders section and click on your order to see real-time tracking information.",
      },
      {
        q: "What is the delivery time?",
        a: "Standard delivery takes 3-5 business days. Express delivery is available for 1-2 days.",
      },
      {
        q: "Can I change my delivery address?",
        a: "Yes, you can modify the address before the order is shipped from the Orders page.",
      },
    ],
  },
  {
    id: "payments",
    title: "Payments & Refunds",
    icon: CreditCard,
    description: "Payment methods, refund status, billing",
    faqs: [
      {
        q: "What payment methods are accepted?",
        a: "We accept credit/debit cards, UPI, net banking, and digital wallets.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 5-7 business days to your original payment method.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard encryption and comply with PCI DSS standards.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & Exchanges",
    icon: RotateCcw ,
    description: "Return policy, exchange process",
    faqs: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for most items in original condition with tags.",
      },
      {
        q: "How do I initiate a return?",
        a: "Go to your order details and click 'Return Item'. Follow the instructions to schedule a pickup.",
      },
      {
        q: "Are there any return fees?",
        a: "Returns are free for defective items. A small fee may apply for other returns.",
      },
    ],
  },
  {
    id: "account",
    title: "Account & Profile",
    icon: User,
    description: "Login issues, profile settings, privacy",
    faqs: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page and follow the email instructions.",
      },
      {
        q: "Can I change my email address?",
        a: "Yes, go to Profile section and edit your email. You'll need to verify the new email.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact our support team to initiate account deletion. This process takes 7-10 days.",
      },
    ],
  },
  {
    id: "products",
    title: "Products & Stock",
    icon: Package2,
    description: "Product info, availability, quality",
    faqs: [
      {
        q: "How do I know if an item is in stock?",
        a: "Stock status is shown on the product page. You can enable notifications for out-of-stock items.",
      },
      {
        q: "Are product images accurate?",
        a: "We strive for accuracy, but colors may vary slightly due to screen settings.",
      },
      {
        q: "Do you restock sold-out items?",
        a: "Most popular items are restocked regularly. Enable notifications to get alerts.",
      },
    ],
  },
  {
    id: "other",
    title: "Other Issues",
    icon: HelpCircle,
    description: "Technical issues, feedback, suggestions",
    faqs: [
      {
        q: "The website is not loading properly",
        a: "Try clearing your browser cache and cookies. Use the latest browser version.",
      },
      {
        q: "How do I provide feedback?",
        a: "Use the contact form below or email us at feedback@store.com",
      },
      {
        q: "Do you have a mobile app?",
        a: "Yes! Download our app from App Store or Google Play for a better experience.",
      },
    ],
  },
];

const Help_Support = () => {
  const [selectedCategory, setSelectedCategory] = useState<string|null>(null);
  // const [showContactForm, setShowContactForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const [formData, setFormData] = useState({
  //   subject: "",
  //   category: "",
  //   message: "",
  //   email: "",
  //   orderNumber: "",
  // });

  const filteredFaqs = selectedCategory
    ? categories.find((c) => c.id === selectedCategory)?.faqs || []
    : categories
        .flatMap((c) => c.faqs)
        .filter(
          (faq) =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <motion.div
      key="addresses"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border border-gray-200 rounded-sm">
        {/* top */}
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Help and Support</h2>
        </div>

        {/* Categories Grid */}
        {!searchQuery && !selectedCategory && (
          <div className="mb-6 mt-2">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Browse by Category
            </h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
              {categories.map((category) => {
                const IconComponent =
                  typeof category.icon === "string" ? null : category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-blue-500 text-left"
                  >
                    <div className="flex items-start gap-3">
                      {IconComponent ? (
                        <IconComponent
                          className="text-red-400 flex-shrink-0"
                          size={24}
                        />
                      ) : (
                        <category.icon/>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* FAQs */}
        {(searchQuery || selectedCategory) && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className=" font-bold text-gray-800">
                {selectedCategory
                  ? categories.find((c) => c.id === selectedCategory)?.title
                  : "Search Results"}
              </h2>
              {selectedCategory && 
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-red-400 hover:text-red-600 font-medium"
                >
                  ← Back 
                </button>
              }
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <summary className="font-normal text-gray-800 cursor-pointer list-none flex items-center justify-between">
                      {faq.q}
                      <span className="text-red-300 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 text-gray-600 pl-4 border-l-2 border-red-500">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-600">
                  No results found. Try a different search or contact support.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Additional Resources */}
        <div className="mt-6 bg-red-50  p-6">
          <h3 className="font-semibold text-gray-800 mb-3">Still need help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is available Monday-Friday, 9 AM - 6 PM EST.
            Average response time is under 2 hours during business hours.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg text-sm">
              <Mail size={16} className="text-blue-500" />
              support@store.com
            </span>
            <span className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-lg text-sm">
              <Phone size={16} className="text-green-500" />
              +1 234 567 890
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Help_Support;
