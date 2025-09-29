import { Address, useUserStore } from "@/lib/store/userStore";
import { motion } from "framer-motion";
import {
  Check,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";
interface AddressFormProps {
  initialData?: Address; // for editing
  onSubmit: (address: Address) => void;
  onCancel?: () => void;
  isDefault?: boolean;
  onSetDefault?: () => void;
}

interface AddressCardPrps {
  address: Address;
  index: number;
}

const AddressForm: React.FC<AddressFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  // isDefault,
  // onSetDefault,
}) => {
  const [addressDetails, setaddressDetails] = useState<Address>(
    initialData || {
      reciversName: "",
      reciversContact: "",
      reciversEmail: "",
      houseNo_Or_Name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      isDefault: false,
      isSelected: true,
    }
  );
  const [isDefaultLocal, setIsDefaultLocal] = useState<boolean>(
    initialData?.isDefault || false
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setaddressDetails({ ...addressDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(addressDetails);
    onSubmit({ ...addressDetails, isDefault: isDefaultLocal });
  };

  return (
    <motion.div
      className="bg-white p-4 rounded-lg"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-3">Add New Address</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <input
          type="text"
          name="reciversName"
          placeholder="Receiver's Name"
          value={addressDetails.reciversName}
          onChange={handleChange}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="tel"
          name="reciversContact"
          placeholder="Receiver's Contact"
          pattern="[0-9]{10}"
          inputMode="numeric"
          maxLength={10}
          value={addressDetails.reciversContact}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,10}$/.test(val)) {
              handleChange(e);
            }
          }}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          required
        />
        {/* <input
          type="email"
          placeholder="Email Address"
          value={addressDetails.reciversEmail}
          onChange={handleChange}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
        /> */}
        <input
          type="text"
          name="houseNo_Or_Name"
          placeholder="House No / Name"
          value={addressDetails.houseNo_Or_Name}
          onChange={handleChange}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street Name / Locality"
          value={addressDetails.street}
          onChange={handleChange}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={addressDetails.city}
          onChange={handleChange}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={addressDetails.state}
          onChange={handleChange}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="PIN Code"
          pattern="[0-9]{6}"
          maxLength={6}
          value={addressDetails.postalCode}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,10}$/.test(val)) {
              handleChange(e);
            }
          }}
          className="py-1 px-2 border rounded-lg focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="default-address"
          checked={isDefaultLocal}
          onChange={() => setIsDefaultLocal(!isDefaultLocal)}
          className="w-4 h-4 text-blue-600"
        />
        <label htmlFor="default-address" className="text-sm text-gray-600">
          Set as default address
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {initialData ? "Update Address" : "Add Address"}
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );
};

const AddressModal = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const {
    user,
    addAddress,
    updateAddress,
    removeAddress,
    setSelectedAddress,
    setDefaultAddress,
  } = useUserStore();

  const handleAddOrUpdate = (addr: Address) => {
    console.log("inModal", addr);
    console.log("inModal", user?.address);

    if (editingIndex !== null) {
      updateAddress(editingIndex, addr);
      if (addr.isDefault) {
        setDefaultAddress(editingIndex);
      }
    } else {
      addAddress(addr);

      if (addr.isDefault) {
        const newIndex = user?.address?.length ?? 0;
        setDefaultAddress(newIndex);
        setSelectedAddress(newIndex);
      }
    }
    setShowAddressForm(false);
    setEditingIndex(null);
  };

  const AddressCard: React.FC<AddressCardPrps> = ({ address, index }) => (
    <motion.div
      className={`relative pt-4 px-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        address.isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
      onClick={() => setSelectedAddress(index)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* {address.isSelected&&(
        <div className=" absolute -top-2 -right-2 bg-blue-200 text-blue-700 ring ring-blue-300 text-xs px-2 py-1 rounded-full font-medium">
          Selected
        </div>
      )} */}
      <div className=" flex items-center gap-3">
        <div className="px-2 space-y-2 w-full">
          <div className="flex items-center to-gray-900 font-normal">
            <h3 className="">{address.reciversName}</h3>
            {address.isDefault && (
              <div className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ring ring-gray-300">
                default
              </div>
            )}
          </div>
          <div className=" flex gap-2 text-sm">
            <Phone className=" size-4" />
            {address.reciversContact}
          </div>
          <div className="text-sm flex  gap-2 text-gray-700 space-y-1">
            <MapPin className=" size-4" />
            <div className="">
              <div className=" flex  items-center  gap-1 space-x-2 ">
                <p>{address.houseNo_Or_Name}</p>
                <p>{address.street}</p>
              </div>
              <div className="flex  items-center  gap-1 space-x-2 ">
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>{address.postalCode}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            address.isSelected
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300"
          }`}
        >
          {address.isSelected && <Check size={12} className="text-white" />}
        </div>
      </div>
      <div className="absolut bottom-0 right-0 left-0 w-full my-2 flex items-center justify-between gap-2">
        <button
          onClick={() => {
            setEditingIndex(index);
            setShowAddressForm(true);
          }}
          className="md:p-1.5 p-1 text-xs md:text-sm flex items-center justify-center w-full gap-2 bg-blue-200 ring rounded-full ring-blue-300 text-blue-600 hover:text-blue-800"
        >
          <Pencil className=" size-3 md:size-4" />
          Edit
          <div className="hidden md:block">Address</div>
        </button>
        <button
          onClick={() => removeAddress(index)}
          className="md:p-2 p-1 text-xs md:text-sm flex items-center justify-center w-full py-1 gap-2 bg-red-200 ring rounded-full ring-red-300 text-red-600 hover:text-blue-800"
        >
          <Trash2 className=" size-3  md:size-4" />
          Remove
          <div className="hidden md:block">Address</div>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-1.5 py-2 w-full">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <MapPin className=" size-5" />
        Shipping Address
      </h2>
      {!showAddressForm && (
        <div className="space-y-1.5">
          {user?.address?.length !== 0 && (
            <>
              {user?.address?.map((address, index) => (
                <AddressCard address={address} index={index} key={index} />
              ))}
            </>
          )}
          <button
            onClick={() => setShowAddressForm(true)}
            className="w-full p-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Address
          </button>
        </div>
      )}
      {showAddressForm && (
        <AddressForm
          initialData={
            editingIndex !== null ? user?.address?.[editingIndex] : undefined
          }
          onSubmit={handleAddOrUpdate}
          onCancel={() => {
            setShowAddressForm(false);
            setEditingIndex(null);
          }}
          isDefault={
            editingIndex !== null
              ? user?.address?.[editingIndex].isDefault
              : false
          }
          onSetDefault={() => {
            if (editingIndex !== null) {
              setDefaultAddress(editingIndex);
              setSelectedAddress(editingIndex);
            }
          }}
        />
      )}
    </div>
  );
};

export default AddressModal;
