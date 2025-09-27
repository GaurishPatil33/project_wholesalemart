import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Check,
  CreditCard,
  IndianRupee,
  LucideIcon,
  Package,
  Shield,
  Smartphone,
  Truck,
  Wallet,
  Lock,
  EyeOff,
  Eye,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export interface PaymentMethod {
  type: "card" | "upi" | "cod" | "paypal" | "apple" | "google" | "bank";
  name?: string;
  icon?: LucideIcon;
  description?: string;
  popular?: boolean;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
}

interface PaymentProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (pm: PaymentMethod) => void;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: () => void;
}
interface FormData {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
  email?: string;
  bankAccount?: string;
  routingNumber?: string;
  upi?: string;
}

interface InputFieldProps {
  label?: string;
  field: keyof FormData;
  // field?: string | keyof FormData;
  placeholder?: string;
  // icon?: React.ComponentType<{ size?: number }>;
  icon?: LucideIcon;
  type?: string;
  maxLength?: number;
  value?: string;
  error?: string;
  // onChange?: (field: string, value: string) => void;
  onChange?: (field: keyof FormData, value: string) => void;
  onBlur?: (field: keyof FormData) => void;
  toggleable?: boolean;
}
// interface Errors {
//   [key: string]: string;
// }
type Errors = Partial<Record<keyof FormData, string>>;

const InputField: React.FC<InputFieldProps> = ({
  label,
  field,
  value,
  maxLength,
  icon: Icon,
  onChange,
  placeholder,
  error,
  type = "text",
  onBlur,
  toggleable = false,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className=" w-full">
      {/* {label && <label><Icon />{label}</label>} */}
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
        {Icon && <Icon className="size-5" />}
        {label}
      </label>
      <div className="relative">
        <input
          type={toggleable ? (show ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onChange={(e) => onChange?.(field, e.target.value)}
          onBlur={() => onBlur?.(field)}
          className={`w-full text-sm p-1.5 px-3 md:px-4  md:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {toggleable && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

const Payments: React.FC<PaymentProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod["type"]>("card");

  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    email: "",
    bankAccount: "",
    routingNumber: "",
    upi: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    console.log(
      "card length",
      paymentMethod.cardNumber?.length,
      "  ",
      paymentMethod.cardNumber
    );
    console.log(
      "card date",
      paymentMethod.expiryDate?.length,
      "  ",
      paymentMethod.expiryDate
    );

    if (paymentMethod?.type) {
      setSelectedPaymentMethod(paymentMethod.type);
    }
  }, [paymentMethod]);

  // const handleInputChange = (field: string, val: string) => {
  //   setFormData((prev) => ({ ...prev, [field]: val }));
  // };
  const handleInputChange = (field: keyof FormData, value: string): void => {
    let formated = value;

    switch (field) {
      case "cardNumber":
        formated = value
          .replace(/\D/g, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
        break;

      case "expiryDate":
        formated = value.replace(/\D/g, "").slice(0, 4);
        if (formated.length > 3) {
          formated = formated.slice(0, 2) + "/" + formated.slice(2);
        }
        break;

      case "cvv":
        formated = value.replace(/\D/g, "").slice(0, 4);
        break;

      case "bankAccount":
        formated = value.replace(/\D/g, ""); // digits only
        break;

      case "routingNumber":
        formated = value.replace(/\D/g, ""); // digits only
        break;

      default:
        formated = value;
    }

    setFormData((prev) => ({ ...prev, [field]: formated }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Errors = { ...errors };

    if (selectedPaymentMethod === "card") {
      //card number
      const digits = (formData.cardNumber || "").replace(/\s/g, "");
      if (!digits || digits.length < 16) {
        newErrors.cardNumber = "Enter a valid 16-digit card number";
      }

      //expirydate
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = "Enter expiry as MM/YY ";
      } else {
        const [mm, yy] = formData.expiryDate.split("/").map(Number);
        if (mm < 1 || mm > 12) {
          newErrors.expiryDate = "Enter valid month (01-12)";
        }
        // Optional: check expired cards
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
          newErrors.expiryDate = "Card has expired";
        }
      }

      //cvv
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = "Enter valid 3-4 digit CVV";
      }

      // Cardholder name
      if (!formData.cardName || formData.cardName.length < 2) {
        newErrors.cardName = "Enter cardholder name";
      }
    }

    if (selectedPaymentMethod === "bank") {
      if (!formData.bankAccount || formData.bankAccount.length < 8) {
        newErrors.bankAccount = "Enter a valid account number";
      }
      if (!formData.routingNumber || formData.routingNumber.length < 6) {
        newErrors.routingNumber = "Enter a valid routing number";
      }
    }

    if (selectedPaymentMethod === "upi") {
      if (!formData.upi || !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(formData.upi)) {
        newErrors.upi = "Enter a valid UPI ID (e.g. name@upi)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: keyof FormData) => {
    validate();
  };

  const PaymentsMethods: PaymentMethod[] = [
    {
      type: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      popular: true,
    },
    // {
    //   type: "paypal",
    //   name: "PayPal",
    //   icon: Wallet,
    //   description: "Pay with your PayPal account",
    //   popular: true,
    // },
    // {
    //   type: "apple",
    //   name: "Apple Pay",
    //   icon: Smartphone,
    //   description: "Touch ID or Face ID",
    // },
    // {
    //   type: "google",
    //   name: "Google Pay",
    //   icon: Smartphone,
    //   description: "Pay with Google",
    // },
    {
      type: "bank",
      name: "Bank Transfer",
      icon: Building2,
      description: "Direct bank transfer",
    },
    {
      type: "upi",
      name: "UPI",
      icon: IndianRupee,
      description: "Pay using UPI apps like GPay, PhonePe, Paytm",
      popular: true,
    },
    {
      type: "cod",
      name: "Cash on Delivery",
      icon: Package,
      description: "Pay in cash when your order arrives",
    },
  ];

  const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
    method,
    isSelected,
    onSelect,
  }) => (
    <motion.div
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
      onClick={onSelect}
      // whileHover={{ scale: 1.02 }}
      // whileTap={{ scale: 0.98 }}
      // initial={{ opacity: 0, y: 0 }}
      // animate={{ opacity: 1, y: 0 }}
    >
      {method?.popular && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          Popular
        </div>
      )}
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            isSelected ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          {method.icon && (
            <method.icon
              size={20}
              className={isSelected ? "text-blue-600" : "text-gray-600"}
            />
          )}
        </div>
        <div className=" flex-1 overflow-x-hidden">
          <div className=" font-semibold text-xs md:text-sm text-gray-900">
            {method?.name}
          </div>
          <div className=" text-xs text-gray-600 truncate ">
            {method?.description}
          </div>
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-blue-500 bg-blue-500" : "border-gray-300"
          }`}
        >
          {isSelected && <Check size={12} className="text-white" />}
        </div>
      </div>
    </motion.div>
  );

  const renderPaymentContent = () => {
    switch (selectedPaymentMethod) {
      case "card":
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6"
              // variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard size={24} />
                  <span className="font-semibold">Credit Card</span>
                </div>
                <Shield size={20} />
              </div>
              <div className="space-y-2">
                <motion.div
                  className="text-sm font-mono tracking-wider"
                  animate={{ opacity: formData.cardNumber ? 1 : 0.6 }}
                >
                  {formData.cardNumber || "•••• •••• •••• ••••"}
                </motion.div>
                <div className="flex justify-between text-sm">
                  <motion.div
                    animate={{ opacity: formData.cardName ? 1 : 0.6 }}
                  >
                    {formData.cardName || "CARDHOLDER NAME"}
                  </motion.div>
                  <motion.div
                    animate={{ opacity: formData.expiryDate ? 1 : 0.6 }}
                  >
                    {formData.expiryDate || "MM/YY"}
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <InputField
              icon={CreditCard}
              label="Card Number"
              field="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber || ""}
              maxLength={19}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.cardNumber}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                icon={Calendar}
                label="Expiry Date"
                field="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate || ""}
                maxLength={5}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.expiryDate}
              />

              <InputField
                icon={Lock}
                label="CVV"
                field="cvv"
                placeholder="123"
                value={formData.cvv || ""}
                maxLength={4}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={errors.cvv}
                toggleable // 👈 enables show/hide toggle
              />
            </div>
            <InputField
              icon={User}
              label="Cardholder Name"
              field="cardName"
              placeholder="Jhon "
              value={formData.cardName || ""}
              maxLength={20}
              error={errors.cardName}
              onBlur={handleBlur}
              onChange={handleInputChange}
            />
          </motion.div>
        );

      case "bank":
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InputField
              label="Account Number"
              field="bankAccount"
              placeholder="123456789"
              icon={Building2}
              value={formData.bankAccount || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.bankAccount}
            />
            <InputField
              label="Routing Number"
              field="routingNumber"
              placeholder="021000021"
              icon={Building2}
              value={formData.routingNumber || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.routingNumber}
            />
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Shield size={16} className="text-amber-600 mt-1" />
                <div className="text-xs md:text-sm text-amber-800">
                  <p className="font-medium mb-1">Bank Transfer Information</p>
                  <p>
                    Processing time: 1-3 business days. You will receive a
                    confirmation email once the transfer is complete.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case "upi":
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InputField
              icon={IndianRupee}
              label="UPI ID"
              field="upi"
              placeholder="example@upi"
              value={formData.upi || ""}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.upi}
            />
          </motion.div>
        );

      case "cod":
        return (
          <motion.div
            className="px-4 text-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            You can pay in cash when your order is delivered.
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 py-2">
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <CreditCard className="w-6 h-6" />
        Payment Information
      </h2>

      <div className="space-y-2 px-2">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          Choose Payment Method
        </h2>
        {PaymentsMethods.map((method) => (
          <div className="" key={method.type}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeIn", type: "spring" }}
            >
              <PaymentMethodCard
                key={method.type}
                method={method}
                isSelected={selectedPaymentMethod === method.type}
                onSelect={() => {
                  setSelectedPaymentMethod(method.type);
                  setPaymentMethod(method);
                }}
              />
            </motion.div>
            {selectedPaymentMethod === method.type && (
              <div className="py-4 px-2">{renderPaymentContent()}</div>
            )}
          </div>
        ))}
      </div>
      {/* Security Notice */}
      <div
        className="bg-gray-50 rounded-xl p-4"
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Shield size={16} className="text-green-600" />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};

export default Payments;
