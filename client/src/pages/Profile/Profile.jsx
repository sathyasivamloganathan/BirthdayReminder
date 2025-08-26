// import { useState, useEffect, useContext } from "react";
// import { timeZones } from "../../components/Timezones";
// import { toast } from "react-toastify";
// import { useAuth } from "../../context/auth";
// import {
//   Cake,
//   Earth,
//   Edit,
//   LockKeyholeOpen,
//   LogOut,
//   MailCheck,
//   Moon,
//   PhoneCall,
//   Sun,
//   Trash,
//   User,
// } from "lucide-react";
// import { SkeletonLoader } from "../../components/SkeletonLoader";
// import { ProfileDesignCard } from "../../components/svgIcons/svgIcon";
// import { ThemeContext } from "../../context/ThemeContext";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearProfile,
//   fetchProfileDetails,
//   getProfileDetails,
//   getProfileStatus,
//   updateDOB,
//   updateProfileDetailsApi,
// } from "../../app/features/Profile/profileSlice";

// const Profile = () => {
//   const dispatch = useDispatch();

//   const [completion, setCompletion] = useState(0);
//   const [loadingPage, setLoadingPage] = useState(false);

//   const profile = useSelector(getProfileDetails);
//   const [modifyProfile, setModifyProfile] = useState(null);
//   const profileStatus = useSelector(getProfileStatus);

//   const { auth, setAuth } = useAuth();
//   const navigate = useNavigate();

//   const [showModal, setShowModal] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");

//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     if (auth?.token && profileStatus === "idle") {
//       dispatch(fetchProfileDetails(auth?.token));
//     }
//   }, [auth?.token, profileStatus]);

//   useEffect(() => {
//     if (auth?.token) {
//       if (profileStatus === "loading") {
//         setLoadingPage(true);
//       } else {
//         setLoadingPage(false);
//       }
//     }
//   }, [profileStatus]);

//   useEffect(() => {
//     if (profileStatus === "succeeded") {
//       setModifyProfile(profile);
//     }
//   }, [profileStatus, profile]);

//   useEffect(() => {
//     let filled = 0;
//     if (modifyProfile?.profileImage) filled++;
//     if (modifyProfile?.name) filled++;
//     if (modifyProfile?.dob) filled++;
//     if (modifyProfile?.mobile) filled++;
//     if (modifyProfile?.timeZone) filled++;
//     const totalFields = 5;
//     setCompletion(Math.round((filled / totalFields) * 100));
//   }, [
//     modifyProfile?.profileImage,
//     modifyProfile?.name,
//     modifyProfile?.dob,
//     modifyProfile?.mobile,
//     modifyProfile?.timeZone,
//   ]);

//   const deletePhoto = () => {
//     setModifyProfile((prev) => ({
//       ...prev,
//       profileImage: null,
//     }));
//     return toast.success("Photo removed, tap save to make changes.");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size <= 200 * 1024) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setModifyProfile((prev) => ({ ...prev, profileImage: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     } else {
//       toast.info("Image must be under 200KB");
//     }
//   };

//   const handlePasswordChange = (e) => {
//     e.preventDefault();
//     if (!newPassword.trim() || !confirmNewPassword.trim()) {
//       return toast.error("Password cannot be empty !!");
//     }
//     if (newPassword != confirmNewPassword) {
//       return toast.error("Password doesn't match !!");
//     }
//     console.log(
//       "New password: ",
//       newPassword,
//       ", Confirm Password: ",
//       confirmNewPassword
//     ); //////////////////
//     setModifyProfile({ ...modifyProfile, password: confirmNewPassword }); ///////////////////////////////
//     setShowModal(false);
//     return toast.success("Password matches");
//   };

//   const updateProfileDetails = async () => {
//     try {
//       const formData = new FormData();

//       if (profile.name !== modifyProfile?.name)
//         formData.append("name", modifyProfile?.name);
//       if (profile.dob !== modifyProfile?.dob)
//         formData.append("dob", modifyProfile?.dob);
//       if (profile.mobile !== modifyProfile?.mobile)
//         formData.append("mobile", modifyProfile?.mobile);
//       if (profile.email !== modifyProfile?.email)
//         formData.append("email", modifyProfile?.email);
//       if (profile.password !== modifyProfile?.password)
//         formData.append("password", modifyProfile?.password);
//       if (profile.timeZone !== modifyProfile?.timeZone)
//         formData.append("timeZone", modifyProfile?.timeZone);

//       if (
//         modifyProfile?.profileImage?.startsWith("data:") &&
//         profile?.profileImage !== modifyProfile?.profileImage
//       ) {
//         const blob = await fetch(modifyProfile?.profileImage).then((res) =>
//           res.blob()
//         );
//         formData.append("profileImage", blob, "profile.jpg");
//       } else if (
//         modifyProfile?.profileImage === null ||
//         modifyProfile?.profileImage === ""
//       ) {
//         formData.append("deleteProfileImage", "true");
//       }

//       setLoadingPage(true);

      
//       dispatch(updateProfileDetailsApi({ formData, token: auth?.token }));
      
//       setLoadingPage(false);
//       setIsEditing(false);
//       return toast.success("Profile Updated");
//     } catch (error) {
//       setLoadingPage(false);
//       if (profileStatus === "rejected")
//         return toast.error("Profile not updated");
//     }
//   };


//   const signout = () => {
//     try {
//       dispatch(clearProfile());
//       localStorage.removeItem("auth");
//       navigate("/auth/login");
//       return toast.success("Logout successful.");
//     } catch (error) {
//       toast.error("Cannot logout");
//       console.log(error);
//     }
//   };

//   const { toggleTheme } = useContext(ThemeContext);

//   return (
//     <div
//       className={`min-h-screen text-gray-800 dark:text-white relative overflow-hidden pb-28 ${
//         showModal && "bg-black/60 backdrop-blur-md z-30 bg-opacity-100"
//       }`}
//     >
//       <div
//         className={`absolute top-0 left-0 w-full h-[230px] overflow-hidden z-0 ${
//           showModal ? "blur-sm opacity-30" : ""
//         }`}
//       >
//         <div className="w-[300%] h-full">
//           <ProfileDesignCard />
//         </div>
//       </div>

//       <div className="relative z-10 max-w-xl mx-auto mt-[40px] px-4">
//         <div className="relative w-40 h-40 mx-auto mb-4">
//           {isEditing && (
//             <button
//               onClick={() => deletePhoto()}
//               className="absolute bottom-2 right-5 transform translate-x-1/2 z-50 w-[35px] h-[35px] bg-red-500 flex justify-center align-middle items-center 
//             rounded-full"
//             >
//               <Trash />
//             </button>
//           )}
//           <div
//             className={`absolute inset-0 rounded-full border-4 border-white dark:border-gray-700 bg-white shadow-xl 
//             overflow-hidden z-10 ${showModal ? "blur-sm" : ""}`}
//           >
//             {modifyProfile?.profileImage ? (
//               <div className="w-full h-full">
//                 <img
//                   src={modifyProfile?.profileImage}
//                   alt="Profile"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full text-gray-400 text-sm">
//                 No Image
//               </div>
//             )}
//           </div>

//           <svg
//             className="absolute inset-0 w-full h-full z-0 transform -rotate-90"
//             viewBox="0 0 100 100"
//           >
//             <circle
//               cx="50"
//               cy="50"
//               r="45"
//               stroke="#ccc"
//               strokeWidth="8"
//               fill="none"
//             />
//             <circle
//               cx="50"
//               cy="50"
//               r="45"
//               stroke="#0ea5e9"
//               strokeWidth="8"
//               fill="none"
//               strokeDasharray="282.6"
//               strokeDashoffset={`${282.6 * (1 - completion / 100)}`}
//             />
//           </svg>
//         </div>

//         {/* Progress bar */}

//         <div className="mt-12 my-8 font-bold">
//           <div className="flex justify-between text-sm mb-1">
//             <span>Profile Completion</span>
//             <span>{completion}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-2xl h-4 dark:bg-gray-700">
//             <div
//               className="bg-green-500 h-4 rounded-md transition-all duration-700 ease-in-out"
//               style={{ width: `${completion}%` }}
//             ></div>
//           </div>
//         </div>

//         {!isEditing && (
//           <section className="mt-10 max-w-xl mx-auto px-6 bg-transparent text-[#2C3E50] dark:text-[#D0E8FF] transition-colors duration-300 select-text">
//             <div className="flex justify-between mb-4">
//               <h2 className="text-3xl font-extrabold mb-10 text-[#1E2A78] dark:text-[#7FDBFF] tracking-tight">
//                 Profile Details
//               </h2>

//               <button
//                 onClick={toggleTheme}
//                 className="relative w-14 h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300 hover:scale-105"
//               >
//                 <span className="transition-transform duration-300 transform scale-100 dark:scale-0">
//                   <Sun className="text-yellow-500" />
//                 </span>
//                 <span className="absolute transition-transform duration-300 transform scale-0 dark:scale-100">
//                   <Moon className="text-gray-300" />
//                 </span>
//               </button>
//             </div>

//             <div className="space-y-10">
//               {[
//                 {
//                   label: "Name",
//                   value: modifyProfile?.name,
//                   icon: (
//                     <User className="w-8 h-8 text-[#3298DC] dark:text-[#80daff] rounded-full" />
//                   ),
//                 },
//                 {
//                   label: "Date of Birth",
//                   value: modifyProfile?.dob,
//                   icon: (
//                     <Cake className="w-8 h-8 text-[#3298DC] dark:text-[#80daff] rounded-full" />
//                   ),
//                 },
//                 {
//                   label: "Email",
//                   value: modifyProfile?.email,
//                   icon: (
//                     <MailCheck className="w-8 h-8 text-[#3298DC] dark:text-[#80daff] rounded-full" />
//                   ),
//                 },
//                 {
//                   label: "Mobile",
//                   value: modifyProfile?.mobile,
//                   icon: (
//                     <PhoneCall className="w-8 h-8 text-[#3298DC] dark:text-[#80daff] rounded-full" />
//                   ),
//                 },
//                 {
//                   label: "Timezone",
//                   value: modifyProfile?.timeZone,
//                   icon: (
//                     <Earth className="w-8 h-8 text-[#3298DC] dark:text-[#80daff] rounded-full" />
//                   ),
//                 },
//               ].map(({ label, value, icon }) => (
//                 <div
//                   key={label}
//                   className="flex items-center gap-6 border-b border-[#a8c4d9] dark:border-[#375a8d] pb-6"
//                 >
//                   <div className="flex-shrink-0 flex items-center justify-center bg-[#D6E8FA] dark:bg-[#19375B] rounded-full p-3">
//                     {icon}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#1E2A78] dark:text-[#7FDBFF]">
//                       {label}
//                     </h3>
//                     <section className="w-44">
//                       {loadingPage || !modifyProfile ? (
//                         <SkeletonLoader
//                           lightTheme={"gray-300"}
//                           darkTheme={"gray-500"}
//                         />
//                       ) : (
//                         <p className="mt-1 text-lg font-light text-[#2C3E50] dark:text-[#C4DBFF] truncate max-w-sm">
//                           {value}
//                         </p>
//                       )}
//                     </section>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex flex-col md:flex-row justify-center items-center gap-3">
//               <div className="mt-10 text-center w-full">
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   className="flex items-center justify-center gap-2
//                 px-12 py-4 w-full
//                 bg-gradient-to-r from-[#3B82F6] to-[#2563EB]
//                 dark:from-[#2563EB] dark:to-[#1E40AF]
//                 text-white font-semibold rounded-full shadow-lg
//                 hover:brightness-110
//                 transition-all duration-300
//                 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#3B82F6]
//               "
//                 >
//                   <span>
//                     <Edit />
//                   </span>
//                   Edit Profile
//                 </button>
//               </div>
//               <div className="mt-2 lg:mt-10 text-center w-full">
//                 <button
//                   onClick={() => {
//                     signout();
//                   }}
//                   className="flex items-center justify-center gap-2
//                 px-12 py-4 w-full
//                 bg-gradient-to-r from-[rgb(246,72,59)] to-[#ebba25]
//                 dark:from-[rgb(199,58,48)] dark:to-[#f0c135]
//                 text-white font-semibold rounded-full shadow-lg
//                 hover:brightness-110
//                 transition-all duration-300
//                 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-[#3B82F6]
//               "
//                 >
//                   <span>
//                     <LogOut />
//                   </span>
//                   Sign Out
//                 </button>
//               </div>
//             </div>
//           </section>
//         )}

//         {isEditing && (
//           <div>
//             <form
//               onSubmit={updateProfileDetails}
//               className="space-y-5 mt-10 bg-opacity-60 dark:bg-opacity-60 p-6 rounded-md shadow-xl backdrop-blur"
//             >
//               <div className="flex justify-center">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="text-sm text-gray-700 dark:text-gray-300"
//                 />
//               </div>

//               {loadingPage || !modifyProfile ? (
//                 <SkeletonLoader
//                   lightTheme={"gray-300"}
//                   darkTheme={"gray-500"}
//                 />
//               ) : (
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   value={modifyProfile?.name || ""}
//                   onChange={(e) =>
//                     setModifyProfile({
//                       ...modifyProfile,
//                       [e.target.name]: e.target.value,
//                     })
//                   }
//                   className={`${
//                     showModal ? "blur-[2px] opacity-50" : ""
//                   } w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
//                 />
//               )}

//               {loadingPage || !modifyProfile ? (
//                 <SkeletonLoader
//                   lightTheme={"gray-300"}
//                   darkTheme={"gray-500"}
//                 />
//               ) : (
//                 <input
//                   type="date"
//                   name="dob"
//                   value={modifyProfile?.dob}
//                   onChange={(e) =>
//                     setModifyProfile({
//                       ...modifyProfile,
//                       [e.target.name]: e.target.value,
//                     })
//                   }
//                   className={`${
//                     showModal ? "blur-[2px] opacity-50" : ""
//                   } w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
//                 />
//               )}

//               {loadingPage || !modifyProfile ? (
//                 <SkeletonLoader
//                   lightTheme={"gray-300"}
//                   darkTheme={"gray-500"}
//                 />
//               ) : (
//                 <input
//                   type="email"
//                   name="email"
//                   value={modifyProfile?.email}
//                   disabled
//                   className={`${
//                     showModal ? "blur-[2px] opacity-50" : ""
//                   } w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
//                 />
//               )}

//               {loadingPage || !modifyProfile ? (
//                 <div className="flex gap-2">
//                   <SkeletonLoader
//                     lightTheme={"gray-300"}
//                     darkTheme={"gray-500"}
//                   />
//                   <button
//                     type="button"
//                     className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Verify
//                   </button>
//                 </div>
//               ) : (
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     name="mobile"
//                     placeholder="Mobile"
//                     value={modifyProfile?.mobile}
//                     onChange={(e) =>
//                       setModifyProfile({
//                         ...modifyProfile,
//                         [e.target.name]: e.target.value,
//                       })
//                     }
//                     className={`${
//                       showModal ? "blur-[2px] opacity-50" : ""
//                     } w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
//                   />

//                   <button
//                     type="button"
//                     className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
//                   >
//                     Verify
//                   </button>
//                 </div>
//               )}
//               {loadingPage || !modifyProfile ? (
//                 <SkeletonLoader
//                   lightTheme={"gray-300"}
//                   darkTheme={"gray-500"}
//                 />
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(true)}
//                   className="flex items-center justify-between w-full px-4 py-3 rounded-md border border-gray-300 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                 >
//                   <span>
//                     {newPassword
//                       ? "Password updated, Click on Save Changes"
//                       : "Change Password"}
//                   </span>
//                   <LockKeyholeOpen />
//                 </button>
//               )}

//               {showModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center dark:hover:text-black">
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
//                     <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
//                       Change Password
//                     </h2>

//                     <input
//                       type="password"
//                       placeholder="New Password"
//                       value={newPassword}
//                       onChange={(e) => setNewPassword(e.target.value)}
//                       className="w-full mb-3 px-4 py-2 border border-gray-600 rounded-md outline-none"
//                     />
//                     <input
//                       type="password"
//                       placeholder="Confirm Password"
//                       value={confirmNewPassword}
//                       onChange={(e) => setConfirmNewPassword(e.target.value)}
//                       className="w-full mb-4 px-4 py-2 border border-gray-600 rounded-md outline-none"
//                     />

//                     <div className="flex justify-end space-x-3">
//                       <button
//                         type="button"
//                         onClick={() => setShowModal(false)}
//                         className="px-4 py-2 rounded-md border border-gray-400 text-black dark:text-white hover:bg-gray-200 dark:hover:text-black"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         // type="button"
//                         onClick={handlePasswordChange}
//                         className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {loadingPage || !modifyProfile ? (
//                 <SkeletonLoader
//                   lightTheme={"gray-300"}
//                   darkTheme={"gray-500"}
//                 />
//               ) : (
//                 <select
//                   value={modifyProfile?.timeZone}
//                   name="timeZone"
//                   onChange={(e) =>
//                     setModifyProfile({
//                       ...modifyProfile,
//                       [e.target.name]: e.target.value,
//                     })
//                   }
//                   className={`${
//                     showModal ? "blur-[2px] opacity-50" : ""
//                   } w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400`}
//                 >
//                   <option value="">
//                     {modifyProfile?.timeZone
//                       ? modifyProfile?.timeZone
//                       : "Select timezone"}
//                   </option>
//                   {timeZones.map((zone, i) => (
//                     <option key={i} value={zone}>
//                       {zone}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {loadingPage || !modifyProfile ? (
//                 <SkeletonLoader
//                   lightTheme={"green-600"}
//                   darkTheme={"green-800"}
//                 />
//               ) : (
//                 <div className="">
//                   <button
//                     onClick={(prev) => setIsEditing(!prev)}
//                     className={`${
//                       showModal ? "blur-[2px]" : ""
//                     } w-[47%] mr-[6%] bg-primaryLight hover:bg-secondaryLight dark:bg-primaryDark dark:hover:bg-secondaryDark transition-colors duration-300 text-white py-3 rounded-md`}
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     className={`${
//                       showModal ? "blur-[2px]" : ""
//                     } w-[47%] bg-green-600 hover:bg-primaryLight dark:hover:bg-primaryDark transition-colors duration-300 text-white py-3 rounded-md`}
//                   >
//                     Save Changes
//                   </button>
//                 </div>
//               )}
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;






import { useState, useEffect, useContext } from "react";
import { timeZones } from "../../components/Timezones";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import {
  Cake,
  Earth,
  Edit,
  LockKeyholeOpen,
  LogOut,
  MailCheck,
  Moon,
  PhoneCall,
  Sun,
  Trash,
  User,
} from "lucide-react";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import { ProfileDesignCard } from "../../components/svgIcons/svgIcon";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearProfile,
  fetchProfileDetails,
  getProfileDetails,
  getProfileStatus,
  updateProfileDetailsApi,
} from "../../app/features/Profile/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [completion, setCompletion] = useState(0);
  const [loadingPage, setLoadingPage] = useState(false);

  const profile = useSelector(getProfileDetails);
  const [modifyProfile, setModifyProfile] = useState(null);
  const profileStatus = useSelector(getProfileStatus);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (auth?.token && profileStatus === "idle") {
      dispatch(fetchProfileDetails(auth?.token));
    }
  }, [auth?.token, profileStatus]);

  useEffect(() => {
    if (auth?.token) {
      setLoadingPage(profileStatus === "loading");
    }
  }, [profileStatus]);

  useEffect(() => {
    if (profileStatus === "succeeded") {
      setModifyProfile(profile);
    }
  }, [profileStatus, profile]);

  useEffect(() => {
    let filled = 0;
    if (modifyProfile?.profileImage) filled++;
    if (modifyProfile?.name) filled++;
    if (modifyProfile?.dob) filled++;
    if (modifyProfile?.mobile) filled++;
    if (modifyProfile?.timeZone) filled++;
    const totalFields = 5;
    setCompletion(Math.round((filled / totalFields) * 100));
  }, [
    modifyProfile?.profileImage,
    modifyProfile?.name,
    modifyProfile?.dob,
    modifyProfile?.mobile,
    modifyProfile?.timeZone,
  ]);

  const deletePhoto = () => {
    setModifyProfile((prev) => ({
      ...prev,
      profileImage: null,
    }));
    return toast.success("Photo removed, tap save to make changes.");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 200 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModifyProfile((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.info("Image must be under 200KB");
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!newPassword.trim() || !confirmNewPassword.trim()) {
      return toast.error("Password cannot be empty !!");
    }
    if (newPassword !== confirmNewPassword) {
      return toast.error("Password doesn't match !!");
    }
    setModifyProfile({ ...modifyProfile, password: confirmNewPassword });
    setShowModal(false);
    return toast.success("Password matches");
  };

  const updateProfileDetails = async () => {
    try {
      const formData = new FormData();

      if (profile.name !== modifyProfile?.name)
        formData.append("name", modifyProfile?.name);
      if (profile.dob !== modifyProfile?.dob)
        formData.append("dob", modifyProfile?.dob);
      if (profile.mobile !== modifyProfile?.mobile)
        formData.append("mobile", modifyProfile?.mobile);
      if (profile.email !== modifyProfile?.email)
        formData.append("email", modifyProfile?.email);
      if (profile.password !== modifyProfile?.password)
        formData.append("password", modifyProfile?.password);
      if (profile.timeZone !== modifyProfile?.timeZone)
        formData.append("timeZone", modifyProfile?.timeZone);

      if (
        modifyProfile?.profileImage?.startsWith("data:") &&
        profile?.profileImage !== modifyProfile?.profileImage
      ) {
        const blob = await fetch(modifyProfile?.profileImage).then((res) =>
          res.blob()
        );
        formData.append("profileImage", blob, "profile.jpg");
      } else if (
        modifyProfile?.profileImage === null ||
        modifyProfile?.profileImage === ""
      ) {
        formData.append("deleteProfileImage", "true");
      }

      setLoadingPage(true);

      dispatch(updateProfileDetailsApi({ formData, token: auth?.token }));

      setLoadingPage(false);
      setIsEditing(false);
      return toast.success("Profile Updated");
    } catch (error) {
      setLoadingPage(false);
      return toast.error("Profile not updated");
    }
  };

  const signout = () => {
    try {
      dispatch(clearProfile());
      localStorage.removeItem("auth");
      navigate("/auth/login");
      return toast.success("Logout successful.");
    } catch (error) {
      toast.error("Cannot logout");
      console.log(error);
    }
  };

  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e8f5e9] to-[#f1f8e9] dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] text-gray-800 dark:text-white pb-28">
      {/* Header */}
      <div className="relative w-full h-[220px] overflow-hidden flex items-center justify-center">
        {/* <ProfileDesignCard /> */}
      </div>

      {/* Profile Card */}
      <div className="relative max-w-3xl mx-auto -mt-32 z-20">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl rounded-3xl p-10">
          {/* Profile Image + Progress */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            {isEditing && (
              <button
                onClick={() => deletePhoto()}
                className="absolute bottom-2 right-2 z-50 bg-red-500 p-2 rounded-full shadow-md"
              >
                <Trash className="text-white" />
              </button>
            )}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-teal-500 shadow-md">
              {modifyProfile?.profileImage ? (
                <img
                  src={modifyProfile?.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#ccc"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#14b8a6"
                strokeWidth="6"
                fill="none"
                strokeDasharray="282.6"
                strokeDashoffset={`${282.6 * (1 - completion / 100)}`}
                className="transition-all duration-700 ease-in-out"
              />
            </svg>
          </div>

          {/* Progress */}
          <div className="text-center mb-8">
            <p className="font-semibold">Profile Completion</p>
            <p className="text-lg font-bold text-teal-600">{completion}%</p>
          </div>

          {/* Details or Edit */}
          {!isEditing ? (
            <div className="space-y-6">
              {/* Toggle Theme */}
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Profile Details</h2>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 shadow-md"
                >
                  <Sun className="text-yellow-500 dark:hidden" />
                  <Moon className="text-gray-300 hidden dark:block" />
                </button>
              </div>

              {/* Info List */}
              {[
                { label: "Name", value: modifyProfile?.name, icon: <User /> },
                { label: "DOB", value: modifyProfile?.dob, icon: <Cake /> },
                {
                  label: "Email",
                  value: modifyProfile?.email,
                  icon: <MailCheck />,
                },
                {
                  label: "Mobile",
                  value: modifyProfile?.mobile,
                  icon: <PhoneCall />,
                },
                {
                  label: "Timezone",
                  value: modifyProfile?.timeZone,
                  icon: <Earth />,
                },
              ].map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl shadow-sm"
                >
                  <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-full">
                    {icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{label}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {loadingPage ? (
                        <SkeletonLoader
                          lightTheme={"gray-300"}
                          darkTheme={"gray-500"}
                        />
                      ) : (
                        value
                      )}
                    </p>
                  </div>
                </div>
              ))}

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold shadow-md hover:brightness-110"
                >
                  <Edit /> Edit
                </button>
                <button
                  onClick={signout}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold shadow-md hover:brightness-110"
                >
                  <LogOut /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            // FORM
            <form onSubmit={updateProfileDetails} className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block text-sm"
              />
              <input
                type="text"
                name="name"
                value={modifyProfile?.name || ""}
                onChange={(e) =>
                  setModifyProfile({
                    ...modifyProfile,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700"
              />
              <input
                type="date"
                name="dob"
                value={modifyProfile?.dob}
                onChange={(e) =>
                  setModifyProfile({
                    ...modifyProfile,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700"
              />
              <input
                type="email"
                name="email"
                value={modifyProfile?.email}
                disabled
                className="w-full px-4 py-3 rounded-lg border bg-gray-200 dark:bg-gray-600"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  name="mobile"
                  value={modifyProfile?.mobile}
                  onChange={(e) =>
                    setModifyProfile({
                      ...modifyProfile,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Mobile"
                  className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700"
                />
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Verify
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700 flex justify-between"
              >
                <span>
                  {newPassword
                    ? "Password updated, Click Save"
                    : "Change Password"}
                </span>
                <LockKeyholeOpen />
              </button>

              <select
                value={modifyProfile?.timeZone}
                name="timeZone"
                onChange={(e) =>
                  setModifyProfile({
                    ...modifyProfile,
                    [e.target.name]: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-700"
              >
                <option value="">
                  {modifyProfile?.timeZone || "Select timezone"}
                </option>
                {timeZones.map((zone, i) => (
                  <option key={i} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 py-3 rounded-lg bg-gray-400 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-lg bg-green-600 text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-3 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
