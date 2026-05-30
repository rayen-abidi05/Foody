"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

function Signin() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "client"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
        credentials: "include"
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setSuccess("User registered successfully");

        
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col md:flex-row">

      <div className="w-full md:w-1/2 flex items-center justify-center p-12 bg-white">
        <div className="w-full max-w-md">

          <h2 className="text-5xl font-bold text-slate-800 mb-10">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit} className="space-y-7">

            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
              className="w-full p-4 text-lg border-2 rounded-xl text-black"
            />

            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
              className="w-full p-4 text-lg border-2 rounded-xl text-black"
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              className="w-full p-4 text-lg border-2 rounded-xl text-black"
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              onChange={handleChange}
              className="w-full p-4 text-lg border-2 rounded-xl text-black"
            />

            {error && <p className="text-red-500 text-lg">{error}</p>}
            {success && <p className="text-green-600 text-lg">{success}</p>}

            <button className="w-full bg-[#008645] text-white py-4 rounded-2xl text-xl font-semibold">
              Sign Up
            </button>

          </form>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="/images/imagev.png"
          alt="Fresh Greens"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
}

export default Signin;