import { useUserStore } from "@/lib/store/userStore";
import React, { useState } from "react";

const AuthForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // for signup
  const [phone, setPhone] = useState("");

  const { login } = useUserStore();

  const handleSignUp = () => {
    if (!name || !email) return alert("Enter name and email");
    login({
      id: Date.now().toString(),
      name,
      email,
      phone,
    });
    onClose();
  };
  return (
    <div className=" fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 relative">
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number" max={10}
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleSignUp}
            className="bg-green-600 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
