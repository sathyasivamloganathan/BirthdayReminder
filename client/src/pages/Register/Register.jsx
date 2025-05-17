import React, { useState } from "react";
import {PartyIcon} from "../../components/svgIcons/svgIcon";
import {
  ArrowRight,
  BellRing,
  CalendarHeart,
  Info,
  TabletSmartphone,
} from "lucide-react";
import Form from "../../components/ResusableForm/Form";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (formData.password.length < 8) {
        setLoading(false);
        return toast.error("Password must be min 8");
      }
      const res = await axios.post("http://localhost:7000/api/auth/register", {
        name: formData.name,
        dob: formData.dob,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      });

      if (res && res.data) {
        setLoading(false);
        navigate("/auth/verifyEmail");
        toast.success("Registration successful. Please check your Email to verify your account.");
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
      }
      else {
        toast.error("Error at Registration");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-0 bg-gradient-to-tr from-[#ffe3ec] via-[#fbd0f1] to-[#eb8aff] dark:from-[#1d102c] dark:via-[#3a0b52] dark:to-[#db2effd9] transition-all duration-700 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-textLight dark:text-white mb-6 transition-all mt-[0px] pt-[40px]">
        Join Now !!
      </h2>
      <p className="text-base text-center text-gray-700 dark:text-gray-300 mb-4">
        Join Birthday Buzz to never miss important <br />
        celebrations
      </p>

      <div className="min-h-screen md:min-h-[70vh] flex flex-col md:flex-row items-center justify-center ml-3">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 pl-10">
          <div className="flex flex-col items-center">
            <PartyIcon />
          </div>
          <div className="flex flex-col items-center space-y-2 mt-7">
            <div className="flex flex-row max-w-[300px] mt-3">
              <div className=" inline-flex align-middle items-center justify-center bg-red-200 w-14 h-11 rounded-[50%] mt-[10px]">
                <BellRing
                  // fill="#F0635A"
                  className="text-primaryLight"
                  size={25}
                />
              </div>

              <div className="flex flex-col ml-4 pr-4">
                <h2 className="font-bold ">Never miss a Birthday</h2>
                <h4 className="subTitleFontSize text-justify mr-4">
                  Get timely reminders for all your loved ones Birthday
                </h4>
              </div>
            </div>
            <div className="flex flex-row max-w-[300px] mt-3">
              <div className=" inline-flex align-middle items-center justify-center bg-amber-100 w-14 h-11 rounded-[50%] mt-[10px]">
                <CalendarHeart className="text-secondaryLight" size={25} />
              </div>

              <div className="flex flex-col ml-4 pr-4 min-h-[48px]">
                <h2 className="font-bold ">Easy Management</h2>
                <h4 className="subTitleFontSize text-justify  mr-4">
                  Organize Birthdays with user friendly interfaces !!
                </h4>
              </div>
            </div>
            <div className="flex flex-row max-w-[300px] mt-3">
              <div className=" inline-flex align-middle items-center justify-center bg-violet-200 w-11 h-11 rounded-[50%] mt-[10px]">
                <TabletSmartphone className="text-accentLight" size={25} />
              </div>

              <div className="flex flex-col ml-4 pr-4">
                <h2 className="font-bold ">Multiple Notification</h2>
                <h4 className="subTitleFontSize text-justify  mr-4">
                  Choose Email, SMS, or Push Notification
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Register */}
        <div className="w-full md:w-1/2 px-6 py-8">
          <h1 className="text-center font-bold text-textLight dark:text-white titleFontSize mb-[50px]">
            Create Your Account
          </h1>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 mx-auto flex flex-col align-middle 
            justify-center items-center w-[100%] bg-white dark:bg-[#2b1e3b] p-[40px]  mb-[30px]
              mt-[30px] rounded-2xl shadow-xl dark:shadow-[0_0_10px_#db2eff80] transition-all duration-500 sm:w-0
               sm:bg-none sm:dark:bg-none sm:shadow-none sm:p-0
                sm-rounded-none sm:mb-0 sm:mt-0"
          >
            <Form
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              labelClassName="text-textLight dark:text-textDark font-semibold"
              inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
            />
            <Form
              label="Email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              labelClassName="text-textLight dark:text-textDark font-semibold"
              inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
            />
            <Form
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Enter your Date of Birth"
              labelClassName="text-textLight dark:text-textDark font-semibold"
              inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
            />
            <Form
              label="Mobile"
              name="mobile"
              type="number"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your Mobile Number"
              labelClassName="text-textLight dark:text-textDark font-semibold"
              inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
            />
            <Form
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              labelClassName="text-textLight dark:text-textDark font-semibold"
              inputClassName="min-w-[300px] max-w-[450px] pl-4 pr-10 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
            />

            <button
              type="submit"
              disabled={loading}
              className={`min-w-[300px] max-w-[450px] px-4 py-3 rounded-md text-white font-bold flex justify-center items-center transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:from-[#7c3aed] hover:to-[#db2777]"
              }`}
            >
              {loading ? "Loading ..." : "Register"}
              <span className="ml-2 mt-[1px] flex align-middle justify-center">
                {loading ? "" : <ArrowRight size={23} />}
              </span>
            </button>
            <p className="text-center text-sm mt-4 w-[250px]">
              Already have an account?{" "}
              <span className="text-primaryLight dark:text-primaryDark">
                <Link to={"/auth/login"}>Sign In</Link>
              </span>
            </p>
            <p className="text-center text-sm mt-4 min-w-[200px]">
              By creating an account, you agree to our{" "}
              <span className="text-primaryLight dark:text-primaryDark">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-primaryLight dark:text-primaryDark">
                Privacy Policy
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
