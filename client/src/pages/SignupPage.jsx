import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import NavbarComponent from "../components/NavbarComponent";
import { useDispatch, useSelector } from "react-redux";
import { reset, signup } from "../features/auth/authSlice";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    personal_id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone_number: "",
  });

  const { isLoading, isError, isSuccess, message, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success("Please check your email to activate your account");
      setFormData({
        personal_id: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone_number: "",
      });
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(signup(formData));
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-success loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-lg text-green-800 font-semibold mb-4">Sign Up</h1>
        <form className="flex flex-col gap-3 w-80" onSubmit={handleSignup}>
          <input type="text" name="personal_id" placeholder="Personal ID" value={formData.personal_id} onChange={onChange} className="border p-2 rounded-md" required />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={onChange} className="border p-2 rounded-md" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={onChange} className="border p-2 rounded-md" required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={onChange} className="border p-2 rounded-md" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={onChange} className="border p-2 rounded-md" required />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={onChange} className="border p-2 rounded-md" />
          <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={onChange} className="border p-2 rounded-md" />
          <button type="submit" className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">Sign Up</button>
        </form>
        <div className="mt-4">
          <a href="/signin" className="text-green-700 underline">Already have an account? Login</a>
        </div>
      </div>
    </>
  );
};

export default SignupPage;