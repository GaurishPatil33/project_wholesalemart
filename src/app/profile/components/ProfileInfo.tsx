import UserAvatar from "@/components/UserAvatar";
import { useUserStore } from "@/lib/store/userStore";
import { motion } from "framer-motion";
import { Edit2, Mail, Phone, Save, User, X } from "lucide-react";
import React, { useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const ProfileInfo = () => {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSave = () => {
    // if (validateForm()) {
    // updateUser(formData);
    setIsEditing(false);
    // }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      // dateOfBirth: user?.dateOfBirth || "",
      // gender: user?.gender || "",
      // location: user?.location || ""
    });
    setErrors({});
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // const userInfoForm = () => <div className=""></div>;

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
          <h2 className="font-semibold text-gray-900">Profile Information</h2>

          {!isEditing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 ring ring-red-300 rounded-full px-3 py-0.5"
            >
              <Edit2 className=" size-4" />
              Edit Profile
            </motion.button>
          ) : (
            <div className=" flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 ring ring-red-300 rounded-full px-3 py-0.5"
              >
                <Save className=" size-4" />
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex items-center gap-1 text-sm font-medium text-white bg-red-500 ring ring-red-100 rounded-full px-3 py-0.5"
              >
                <X className=" size-5" />
                Cancel
              </motion.button>
            </div>
          )}
        </div>

        {/* avatar sec */}
        <div className=" flex items-center  gap-3 mb-5 px-3 md:px-6 py-3">
          <div className="relative">
            <UserAvatar size={60} />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-red-100 text-red-500 p-1 rounded-full hover:bg-red-400 ring ring-red-500 transition-colors">
                <Edit2 className="size-3" />
              </button>
            )}
          </div>
          <div className="">
            <h3 className=" text-xl font-semibold text-gray-800 ">
              {user?.name}
            </h3>
            <div className="flex gap-2">
              {/* <p className="text-gray-600">{user?.email}</p> */}
              <p className="text-gray-600">{user?.phone}</p>
            </div>
          </div>
        </div>

        {/* user info form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-3">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Full Name *
            </label>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 px-1 bg-gray-50 rounded-lg">
                <User size={18} className="text-gray-400" />
                <span className="text-gray-800">{user?.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Email Address *
            </label>
            {isEditing ? (
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 px-1 bg-gray-50 rounded-lg">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-800">{user?.email}</span>
              </div>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 ">
              Phone Number *
            </label>
            {isEditing ? (
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 px-1 bg-gray-50 rounded-lg">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-800">{user?.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* more info */}
        <div className=" mt-5 pt-4 border-t border-gray-300 p-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Details
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm px-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Account ID:</span>
              <span className="font-medium text-gray-800">{user?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Member Since:</span>
              <span className="font-medium text-gray-800">January 2024</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileInfo;
