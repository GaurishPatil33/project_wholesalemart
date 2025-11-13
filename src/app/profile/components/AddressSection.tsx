import { Address, useUserStore } from "@/lib/store/userStore";
import { motion } from "framer-motion";
import {
  Building,
  Check,
  Edit2,
  Home,
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

  const AddressCard2: React.FC<AddressCardPrps> = ({ address, index }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border border-gray-200 rounded-sm p-4"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {/* <div
            className={`p-2 rounded ${
              address.type === "home" ? "bg-blue-100" : "bg-orange-100"
              }`}
              >
              {address.type === "home" ? (
                <Home className="w-4 h-4 text-blue-600" />
                ) : (
                  <Building className="w-4 h-4 text-orange-600" />
                  )}
                  </div> */}
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {address.reciversName}
            </p>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded uppercase">
              {/* {address.type} */}
            </span>
            {address.isDefault && (
              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                DEFAULT
              </span>
            )}
            {/* {address.isSelected && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                SELECTED
              </span>
            )} */}
          </div>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setEditingIndex(index);
              setShowAddressForm(true);
            }}
            className="text-gray-600 hover:text-pink-600 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeAddress(index)}
            className="text-gray-600 hover:text-red-600 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <p>
          {address.houseNo_Or_Name},{address.street}
        </p>
        <p>
          {address.city}, {address.state} - {address.postalCode}
        </p>
        <p className="flex items-center gap-2 pt-2">
          <Phone className="w-3 h-3" />
          {address.reciversContact}
        </p>
      </div>
      {!address.isDefault && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setDefaultAddress(index)}
          className="mt-3 text-xs font-medium text-red-400 border border-red-600 px-3 py-1.5 rounded-sm hover:bg-pink-50"
        >
          Set as Default
        </motion.button>
      )}
    </motion.div>
  );

  const AddressForm2: React.FC<AddressFormProps> = ({
    onSubmit,
    initialData,
    onCancel,
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, height: "auto", y: 0 }}
        exit={{ opacity: 0, height: 0 }}
        className="border-2 border-dashed border-gray-300 rounded-sm p-4"
      >
        <p className="text-sm text-gray-600 mb-2">Add New Address</p>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="reciversName"
            placeholder="Name"
            value={addressDetails.reciversName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Phone"
            name="reciversContact"
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
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="House no/name"
            name="houseNo_Or_Name"
            value={addressDetails.houseNo_Or_Name}
            onChange={handleChange}
            className=" border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Street/Locality"
            name="street"
            value={addressDetails.street}
            onChange={handleChange}
            className="cols border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={addressDetails.city}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={addressDetails.state}
            onChange={handleChange}
            className=" border border-gray-300 rounded px-3 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="Pincode"
            pattern="[0-9]{6}"
            name="postalCode"
            maxLength={6}
            value={addressDetails.postalCode}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,6}$/.test(val)) {
                handleChange(e);
              }
            }}
            className=" col-span-2 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          {/* <textarea
            placeholder="Address"
            className="col-span-2 border border-gray-300 rounded px-3 py-2 text-sm"
            rows={3}
          ></textarea> */}
        </div>

        {/* setDefaultAddress */}
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
        <div className="flex gap-2 mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="bg-red-600 text-white text-sm px-4 py-2 rounded-sm hover:bg-pink-700"
          >
            Save Address
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
            className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-sm hover:bg-gray-50"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      key="addresses"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border border-gray-200 rounded-sm">
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900">Saved Addresses</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (editingIndex !== null) {
                setShowAddressForm(true);
                setEditingIndex(null);
              } else {
                setShowAddressForm(!showAddressForm);
                setEditingIndex(null);
              }
            }}
            className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 ring ring-red-300 rounded-full px-3 py-0.5"
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </motion.button>
        </div>
        <div className="p-4 space-y-4">
          {showAddressForm && (
            <AddressForm2
              initialData={
                editingIndex !== null
                  ? user?.address?.[editingIndex]
                  : undefined
              }
              onSubmit={handleAddOrUpdate}
              onCancel={() => {
                setShowAddressForm(false);
                setEditingIndex(null);
              }}
            />
          )}
          {!showAddressForm &&
            user?.address?.map((address, index) => (
              <AddressCard2 address={address} index={index} />
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AddressModal;
