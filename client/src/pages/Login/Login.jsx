import { ArrowRight } from "lucide-react";
import React from "react";
import { useState } from "react";
import Form from "../../components/ResusableForm/Form";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";

const Login = () => {

  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      if (res && res.data) {
        setLoading(false);
        setAuth({ user: res.data.user, token: res.data.jwt_token });
        navigate("/profile");
        toast.success(
          "Login Successful !!"
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error at Login");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-textLight dark:text-textDark">
          Welcome Back
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Form
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            labelClassName="text-textLight dark:text-textDark font-semibold"
            inputClassName="w-full px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
          />

          <Form
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            labelClassName="text-textLight dark:text-textDark font-semibold"
            inputClassName="w-full px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 flex justify-center items-center bg-primaryLight dark:bg-primaryDark text-white rounded-md font-semibold hover:bg-secondaryLight dark:hover:bg-secondaryDark transition-colors"
          >
            {loading ? "Loading ..." : "Sign In"}
            <span className="ml-2 mt-[1px] flex align-middle justify-center">
              {loading ? "" : <ArrowRight size={23} />}
            </span>
          </button>
        </form>
        <p className="text-sm text-center mt-6 text-textLight dark:text-textDark">
          Don’t have an account?{" "}
          <a
            href="#"
            className="text-primaryLight dark:text-primaryDark underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
