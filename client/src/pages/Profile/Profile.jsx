import React, { useState, useEffect } from "react";
import { timeZones } from "../../components/timezones";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { LockKeyholeOpen, MoonIcon, Sun } from "lucide-react";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import { ProfileDesignCard } from "../../components/svgIcons/svgIcon";

const Profile = () => {
  const [completion, setCompletion] = useState(0);
  const [loadingPage, setLoadingPage] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    mobile: "",
    email: "",
    timeZone: "",
    password: "",
    profilePic: null,
  });

  const [originalProfile, setOriginalProfile] = useState({});

  const { loading, auth } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    let filled = 0;
    if (profile.profilePic) filled++;
    if (profile.name.trim()) filled++;
    if (profile.dob) filled++;
    if (profile.mobile) filled++;
    if (profile.timeZone) filled++;
    const totalFields = 5;
    setCompletion(Math.round((filled / totalFields) * 100));
  }, [
    profile.profilePic,
    profile.name,
    profile.dob,
    profile.mobile,
    profile.timeZone,
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 200 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePic: reader.result }));
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
    if (newPassword != confirmNewPassword) {
      return toast.error("Password doesn't match !!");
    }
    setProfile({ ...profile, password: confirmNewPassword });
    setShowModal(false);
    return toast.success("Password matches");
  };

  const getProfileDetails = async () => {
    try {
      setLoadingPage(true);
      const res = await axios.get(
        "http://localhost:7000/api/auth/get-profile",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (res && res.data) {
        const data = res.data;
        setProfile({
          name: data.name || "",
          dob: data.dob || "",
          mobile: data.mobile || "",
          email: data.email || "",
          timeZone: data.timeZone || "",
          password: "",
          profilePic: data.profileImage || null,
        });
        setOriginalProfile(res.data);
        console.log("Profile: ", profile);
        console.log("Original Profile: ", originalProfile);
      }
      setLoadingPage(false);
    } catch (error) {
      setLoadingPage(false);
      console.error(error);
      toast.error("Error ar fetching profile details");
    }
  };

  useEffect(() => {
    if (!loading && auth.token) {
      getProfileDetails();
    }
  }, [loading, auth?.token]);

  const updateProfileDetails = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append changed fields only
      if (profile.name !== originalProfile.name)
        formData.append("name", profile.name);
      if (profile.dob !== originalProfile.dob)
        formData.append("dob", profile.dob);
      if (profile.mobile !== originalProfile.mobile)
        formData.append("mobile", profile.mobile);
      if (profile.email !== originalProfile.email)
        formData.append("email", profile.email);
      if (profile.password) formData.append("password", profile.password);
      if (profile.timeZone !== originalProfile.timeZone)
        formData.append("timeZone", profile.timeZone);

      // Handle image
      if (
        profile.profilePic !== originalProfile.profilePic &&
        profile.profilePic?.startsWith("data:")
      ) {
        const blob = await fetch(profile.profilePic).then((res) => res.blob());
        formData.append("profileImage", blob, "profile.jpg");
      }

      // Send request
      setLoadingPage(true);
      const res = await axios.put(
        "http://localhost:7000/api/auth/updateProfile",
        formData
      );
      console.log(res);
      setLoadingPage(false);
      return toast.success("Profile Updated");
    } catch (error) {
      setLoadingPage(false);
      console.log(error);
      toast.error("Profile not updated");
    }
    console.log(profile);
  };

  return (
    <div
      className={`min-h-screen text-gray-800 dark:text-white relative overflow-hidden pb-28 ${
        showModal && "bg-gray-500 bg-opacity-100"
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-[230px] overflow-hidden z-0">
        <div className="w-[300%] h-full">
          <ProfileDesignCard />
        </div>
      </div>

      <div className="relative z-10 max-w-xl mx-auto mt-[40px] px-4">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-8 border-white dark:border-gray-700 bg-white shadow-xl overflow-hidden z-10">
            {profile.profilePic ? (
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>

          <svg
            className="absolute inset-0 w-full h-full z-0 transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#ccc"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#0ea5e9"
              strokeWidth="8"
              fill="none"
              strokeDasharray="282.6"
              strokeDashoffset={`${282.6 * (1 - completion / 100)}`}
            />
          </svg>
        </div>

        {/* Progress bar */}
        <div className="my-4 text-white">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium ">Profile Completion</span>
            <span>{completion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-2xl h-3 dark:bg-gray-700">
            <div
              className="bg-green-500 h-3 rounded-md transition-all duration-300 ease-in-out"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>

        <form
          onSubmit={updateProfileDetails}
          className="space-y-5 mt-10 bg-opacity-60 dark:bg-opacity-60 p-6 rounded-md shadow-xl backdrop-blur"
        >
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-700 dark:text-gray-300"
            />
          </div>

          {loadingPage ? (
            <SkeletonLoader lightTheme={"gray-300"} darkTheme={"gray-500"} />
          ) : (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={profile.name || ""}
              onChange={(e) =>
                setProfile({ ...profile, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          {/* <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name || ""}
            onChange={(e) =>
              setProfile({ ...profile, [e.target.name]: e.target.value })
            }
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}

          {loadingPage ? (
            <SkeletonLoader lightTheme={"gray-300"} darkTheme={"gray-500"} />
          ) : (
            <input
              type="date"
              name="dob"
              value={profile.dob}
              onChange={(e) =>
                setProfile({ ...profile, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}

          {loadingPage ? (
            <SkeletonLoader lightTheme={"gray-300"} darkTheme={"gray-500"} />
          ) : (
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 rounded-md bg-gray-200 dark:bg-gray-600 cursor-not-allowed text-gray-400"
            />
          )}

          {loadingPage ? (
            <div className="flex gap-2">
              <SkeletonLoader lightTheme={"gray-300"} darkTheme={"gray-500"} />
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Verify
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={profile.mobile}
                onChange={(e) =>
                  setProfile({ ...profile, [e.target.name]: e.target.value })
                }
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
              />

              <button
                type="button"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Verify
              </button>
            </div>
          )}
          {loadingPage ? (
            <SkeletonLoader lightTheme={"gray-300"} darkTheme={"gray-500"} />
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-md border border-gray-300 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <span>
                {newPassword
                  ? "Password updated, Click on Save Changes"
                  : "Change Password"}
              </span>
              <LockKeyholeOpen />
            </button>
          )}

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center dark:hover:text-black">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Change Password
                </h2>

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mb-3 px-4 py-2 border rounded-lg outline-none border-none"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full mb-4 px-4 py-2 border rounded-lg outline-none border-none"
                />

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-md border border-gray-400 text-white hover:bg-gray-200 dark:hover:text-black"
                  >
                    Cancel
                  </button>
                  <button
                    // type="button"
                    onClick={handlePasswordChange}
                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {loadingPage ? (
            <SkeletonLoader lightTheme={"gray-300"} darkTheme={"gray-500"} />
          ) : (
            <select
              value={profile.timeZone}
              name="timeZone"
              onChange={(e) =>
                setProfile({ ...profile, [e.target.name]: e.target.value })
              }
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            >
              <option value="">
                {profile.timeZone ? profile.timeZone : "Select timezone"}
              </option>
              {timeZones.map((zone, i) => (
                <option key={i} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          )}

          {loadingPage ? (
            <SkeletonLoader lightTheme={"green-600"} darkTheme={"green-800"} />
          ) : (
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-primaryLight dark:hover:bg-primaryDark transition-colors duration-300 text-white py-3 rounded-md"
            >
              Save Changes
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
