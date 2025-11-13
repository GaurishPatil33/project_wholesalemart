"use client";
import { useUserStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AuthPage = ({
  onClose,
  redirectTo,
}: {
  onClose: () => void;
  redirectTo?: string;
}) => {
  const [isLogin, setIsLogin] = useState(true);

  const [identifier, setIdentifier] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  
  const [name, setName] = useState(""); // signup only
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { login, signup } = useUserStore();
  const router = useRouter();

  const handleLogin = async() => {
    if (!identifier || !password) return alert("Enter details");

    const res = await login(identifier, password);
    if (!res.success) return alert(res.message);

    onClose();
    // if (redirectTo) router.push(redirectTo);
    // else router.push("/");

    router.push(redirectTo || "/");
  };

  const handleSignUp = () => {
    if (!name || !email || !password)
      return alert("Please fill all required fields");

    const res = signup({
      id: Date.now().toString(),
      name,
      email,
      phone,
      password,
    });

    if (!res.success) return alert(res.message);
    alert("Account created! You can login now.");
    setIsLogin(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 relative space-y-4">
        {/* Header */}
        <h2 className="text-xl font-semibold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Login Form */}
        {isLogin && (
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Email or Phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={handleLogin}
              className="bg-blue-600 text-white py-2 rounded-lg"
            >
              Login
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}

        {/* Signup Form */}
        {!isLogin && (
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email (required)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Phone (optional)"
              value={phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,10}$/.test(val)) {
                  setPhone(val);
                }
              }}
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={handleSignUp}
              className="bg-green-600 text-white py-2 rounded-lg"
            >
              Sign Up
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600"
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
