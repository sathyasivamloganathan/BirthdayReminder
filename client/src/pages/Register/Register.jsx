// import React, { useEffect, useState } from "react";
// import { PartyIcon } from "../../components/svgIcons/svgIcon";
// import {
//   ArrowRight,
//   BellRing,
//   CalendarHeart,
//   Info,
//   TabletSmartphone,
// } from "lucide-react";
// import Form from "../../components/ResusableForm/Form";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getRegisterStatus,
//   registerApi,
// } from "../../app/features/Profile/RegisterSlice";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     dob: "",
//     mobile: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const registerStatus = useSelector(getRegisterStatus);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       if (formData.password.length < 8) {
//         setLoading(false);
//         return toast.error("Password must be min 8");
//       }

//       dispatch(registerApi(formData));
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (registerStatus === "rejected") {
//       toast.error("Error in registering user.");
//     }
//     if (registerStatus === "succeeded") {
//       toast.success(
//         "Registration successful. Please check your Email to verify your account."
//       );
//       navigate("/auth/verifyEmail");
//       setLoading(false);
//     } else if (registerStatus === "rejected") {
//       toast.error("User already exists or registration failed.");
//       setLoading(false);
//     }
//   }, [registerStatus, navigate]);

//   return (
//     <div className="z-0 bg-gradient-to-tr from-[#ffe3ec] via-[#fbd0f1] to-[#eb8aff] dark:from-[#1d102c] dark:via-[#3a0b52] dark:to-[#db2effd9] transition-all duration-700 min-h-screen">
//       <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-textLight dark:text-white mb-6 transition-all mt-[0px] pt-[40px]">
//         Join Now !!
//       </h2>
//       <p className="text-base text-center text-gray-700 dark:text-gray-300 mb-4">
//         Join DayMora to never miss important <br />
//         celebrations
//       </p>

//       <div className="min-h-screen md:min-h-[70vh] flex flex-col md:flex-row items-center justify-center ml-3">
//         <div className="w-full md:w-1/2 flex flex-col justify-center p-6 pl-10">
//           <div className="flex flex-col items-center">
//             <PartyIcon />
//           </div>
//           <div className="flex flex-col items-center space-y-2 mt-7">
//             <div className="flex flex-row max-w-[300px] mt-3">
//               <div className=" inline-flex align-middle items-center justify-center bg-red-200 w-14 h-11 rounded-[50%] mt-[10px]">
//                 <BellRing
//                   // fill="#F0635A"
//                   className="text-primaryLight"
//                   size={25}
//                 />
//               </div>

//               <div className="flex flex-col ml-4 pr-4">
//                 <h2 className="font-bold ">Never miss a Birthday</h2>
//                 <h4 className="subTitleFontSize text-justify mr-4">
//                   Get timely reminders for all your loved ones Birthday
//                 </h4>
//               </div>
//             </div>
//             <div className="flex flex-row max-w-[300px] mt-3">
//               <div className=" inline-flex align-middle items-center justify-center bg-amber-100 w-14 h-11 rounded-[50%] mt-[10px]">
//                 <CalendarHeart className="text-secondaryLight" size={25} />
//               </div>

//               <div className="flex flex-col ml-4 pr-4 min-h-[48px]">
//                 <h2 className="font-bold ">Easy Management</h2>
//                 <h4 className="subTitleFontSize text-justify  mr-4">
//                   Organize Birthdays with user friendly interfaces !!
//                 </h4>
//               </div>
//             </div>
//             <div className="flex flex-row max-w-[300px] mt-3">
//               <div className=" inline-flex align-middle items-center justify-center bg-violet-200 w-11 h-11 rounded-[50%] mt-[10px]">
//                 <TabletSmartphone className="text-accentLight" size={25} />
//               </div>

//               <div className="flex flex-col ml-4 pr-4">
//                 <h2 className="font-bold ">Multiple Notification</h2>
//                 <h4 className="subTitleFontSize text-justify  mr-4">
//                   Choose Email
//                 </h4>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Register */}
//         <div className="w-full md:w-1/2 px-6 py-8">
//           <h1 className="text-center font-bold text-textLight dark:text-white titleFontSize mb-[50px]">
//             Create Your Account
//           </h1>
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4 mx-auto flex flex-col align-middle 
//             justify-center items-center w-[100%] bg-white dark:bg-[#2b1e3b] p-[40px]  mb-[30px]
//               mt-[30px] rounded-2xl shadow-xl dark:shadow-[0_0_10px_#db2eff80] transition-all duration-500 sm:w-0
//                sm:bg-none sm:dark:bg-none sm:shadow-none sm:p-0
//                 sm-rounded-none sm:mb-0 sm:mt-0"
//           >
//             <Form
//               label="Full Name"
//               name="name"
//               type="text"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//               labelClassName="text-textLight dark:text-textDark font-semibold"
//               inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
//             />
//             <Form
//               label="Email"
//               name="email"
//               type="text"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your Email"
//               labelClassName="text-textLight dark:text-textDark font-semibold"
//               inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
//             />
//             <Form
//               label="Date of Birth"
//               name="dob"
//               type="date"
//               value={formData.dob}
//               onChange={handleChange}
//               placeholder="Enter your Date of Birth"
//               labelClassName="text-textLight dark:text-textDark font-semibold"
//               inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
//             />
//             <Form
//               label="Mobile"
//               name="mobile"
//               type="number"
//               value={formData.mobile}
//               onChange={handleChange}
//               placeholder="Enter your Mobile Number"
//               labelClassName="text-textLight dark:text-textDark font-semibold"
//               inputClassName="min-w-[300px] max-w-[450px] px-4 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
//             />
//             <Form
//               label="Password"
//               name="password"
//               type="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your Password"
//               labelClassName="text-textLight dark:text-textDark font-semibold"
//               inputClassName="min-w-[300px] max-w-[450px] pl-4 pr-10 py-2 border-none outline-none rounded-md text-textLight dark:text-[#445D7A] font-bold placeholder-gray-300"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className={`min-w-[300px] max-w-[450px] px-4 py-3 rounded-md text-white font-bold flex justify-center items-center transition-colors ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:from-[#7c3aed] hover:to-[#db2777]"
//               }`}
//             >
//               {loading ? "Loading ..." : "Register"}
//               <span className="ml-2 mt-[1px] flex align-middle justify-center">
//                 {loading ? "" : <ArrowRight size={23} />}
//               </span>
//             </button>
//             <p className="text-center text-sm mt-4 w-[250px]">
//               Already have an account?{" "}
//               <span className="text-primaryLight dark:text-primaryDark">
//                 <Link to={"/auth/login"}>Sign In</Link>
//               </span>
//             </p>
//             <p className="text-center text-sm mt-4 min-w-[200px]">
//               By creating an account, you agree to our{" "}
//               <span className="text-primaryLight dark:text-primaryDark">
//                 Terms of Service
//               </span>{" "}
//               and{" "}
//               <span className="text-primaryLight dark:text-primaryDark">
//                 Privacy Policy
//               </span>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  BellRing,
  CalendarHeart,
  Smartphone,
  Gift,
  PartyPopper,
  Users,
  ShieldCheck,
  Mail,
} from "lucide-react";
import Form from "../../components/ResusableForm/Form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisterStatus,
  registerApi,
} from "../../app/features/Profile/RegisterSlice";
import { motion } from "framer-motion";

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
  const dispatch = useDispatch();
  const registerStatus = useSelector(getRegisterStatus);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.password.length < 8) {
        setLoading(false);
        return toast.error("Password must be at least 8 characters");
      }
      dispatch(registerApi(formData));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (registerStatus === "succeeded") {
      toast.success("Registration successful. Check your email to verify.");
      navigate("/auth/verifyEmail");
      setLoading(false);
    } else if (registerStatus === "rejected") {
      toast.error("User already exists or registration failed.");
      setLoading(false);
    }
  }, [registerStatus, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#e0f7fa] via-[#e8f5e9] to-[#f1f8e9] dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] text-gray-800 dark:text-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg shadow-md">
        <h1 className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          <PartyPopper className="text-teal-500" />
          DayMora
        </h1>
        <Link
          to="/auth/login"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold shadow hover:scale-105 transition"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 md:py-24 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            🎉{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              Celebrate
            </span>{" "}
            Every Birthday in Style!
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-xl">
            Never forget a special day again. With{" "}
            <span className="font-bold text-teal-500">DayMora</span>,
            you’ll get smart reminders, personalized greetings, and tools to
            manage all birthdays in one place.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <BellRing className="text-teal-500" />
              <span>Timely Birthday Notifications</span>
            </li>
            <li className="flex items-center gap-3">
              <CalendarHeart className="text-teal-500" />
              <span>Easy Birthday Management</span>
            </li>
            <li className="flex items-center gap-3">
              <Smartphone className="text-teal-500" />
              <span>Email</span>
            </li>
          </ul>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-md w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            Create Account
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Form
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              inputClassName="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <Form
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              inputClassName="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <Form
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              inputClassName="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <Form
              label="Mobile"
              name="mobile"
              type="number"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              inputClassName="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <Form
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              inputClassName="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-bold flex justify-center items-center gap-2 transition-all duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] shadow-lg"
              }`}
            >
              {loading ? "Registering..." : "Register"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-teal-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-10 py-20 text-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg">
        <h3 className="text-4xl font-bold mb-12">
          ✨ Why Choose DayMora?
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Gift size={40} />,
              title: "Never Miss a Birthday",
              desc: "Smart reminders ensure you always remember your loved ones’ special days.",
            },
            {
              icon: <Users size={40} />,
              title: "Connect with Friends",
              desc: "Easily add and manage birthdays for family, friends, and colleagues.",
            },
            {
              icon: <ShieldCheck size={40} />,
              title: "Secure & Private",
              desc: "Your data is safe with us — privacy and security are our top priorities.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-800/80 space-y-4"
            >
              <div className="text-teal-500 flex justify-center">{f.icon}</div>
              <h4 className="font-semibold text-xl">{f.title}</h4>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-20 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-extrabold mb-6"
        >
          Ready to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
            Celebrate Smarter?
          </span>
        </motion.h3>
        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <Link
            to="/auth/register"
            className="px-8 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:opacity-90 transition"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} DayMora. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Register;
