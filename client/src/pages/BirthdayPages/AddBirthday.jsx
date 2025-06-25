import { useEffect, useState } from "react";
import whiteBlue from "../../assets/whiteBlue.webp";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodayBirthdays, getTodayBirthdays } from "../../app/features/Birthdays/todayBirthdaySlice";
import { useAuth } from "../../context/auth";
import { fetchUpcomingBirthdays } from "../../app/features/Birthdays/upcomingBirthdaySlice";
import { fetchAllBirthdays } from "../../app/features/Birthdays/allBirthdaysSlice";
import { addBirthdaysApi, getAddBirthdayStatus } from "../../app/features/Birthdays/addBirthdaySlice";
import { reminderTimes, reminderTypes } from "../../utils/Reminder";


const ToggleButtonGroup = ({ options, selected = [], onChange = () => {} }) => {
  const handleToggle = (option) => {
    if (!Array.isArray(selected)) return;

    const updated = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    onChange(updated);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => handleToggle(option)}
            className={`px-4 py-2 rounded-full border transition-all duration-300
                ${
                  isSelected
                    ? "bg-accentLight text-white dark:bg-accentDark dark:text-black"
                    : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                }
              `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

const AddBirthdayPage = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const addBirthdayStatus = useSelector(getAddBirthdayStatus);

  const [form, setForm] = useState({
    name: "",
    birthdayDate: "",
    relationship: "",
    notes: "",
    reminderType: [],
    reminderTime: [],
    reminderTimeOfDay: "07:00",
    repeatYearly: true,
    customMessage: "",
    profilePic: null,
  });

  const [loadingPage, setLoadingPage] = useState(false)
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 200 * 1024) {
      // 200KB limit
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, profilePic: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.info("Please select an image under 200KB.");
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("birthdayDate", form.birthdayDate);
      formData.append("relationship", form.relationship);
      formData.append("notes", form.notes);
      form.reminderType.forEach((item) => {
        formData.append("reminderType[]", item);
      });
      form.reminderTime.forEach((item) => {
        formData.append("reminderTime[]", item);
      });
      formData.append("reminderTimeOfDay", form.reminderTimeOfDay);
      formData.append("repeatYearly", form.repeatYearly);
      formData.append("customMessage", form.customMessage);

      const blob = await fetch(form.profilePic).then((res) => res.blob());
      formData.append("profileImage", blob, "profile.jpg");
      // Send request
      setLoadingPage(true);
      
      dispatch(addBirthdaysApi(formData));
      

      setLoadingPage(false);
      toast.success("Birthday Added Successfully !!");

      const objDate = new Date(form.birthdayDate);
      objDate.setFullYear(new Date().getFullYear());

      const next30Days = new Date();
      next30Days.setDate(new Date().getDate() + 30);

      navigate("/home")
      if (objDate.getDate() === new Date().getDate() && objDate.getMonth() === new Date().getMonth()) {
        dispatch(fetchTodayBirthdays(auth?.token));
      } else if (objDate >= new Date() && objDate <= next30Days) {
        dispatch(fetchUpcomingBirthdays(auth?.token));
      } else {
        dispatch(fetchUpcomingBirthdays(auth?.token));
        dispatch(fetchAllBirthdays(auth?.token));
      }
      
    } catch (error) {
      setLoadingPage(false);
      console.log(error);
      toast.error("Birthday not added");
    }
  }

  useEffect(() => {
    setLoadingPage(addBirthdayStatus);
  }, [addBirthdayStatus]);

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-100 pb-28">
      {/* Header Section with Background and Curved Bottom */}
      <div
        className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full bg-cover bg-top rounded-b-[15px] overflow-hidden shadow-md"
        style={{
          backgroundImage: `url(${whiteBlue})`,
        }}
      >
        <div className="absolute inset-0 bottom-0 bg-black bg-opacity-25 flex flex-col items-start justify-end px-4 py-4">
          <input
            type="text"
            name="name"
            placeholder="Birthday Person's Name"
            className="text-3xl mx-3 md:text-4xl lg:text-5xl font-bold text-start bg-transparent text-white placeholder-white border-b-2 border-white focus:outline-none focus:ring-0"
            value={form.name}
            onChange={handleChange}
            required
          />
          <p className="mt-3 mx-3 mb-3 text-lg md:text-xl text-white font-medium">
            Add a Birthday
          </p>
        </div>
        <div className="flex flex-col absolute right-0 mt-10 m-10">
          <label htmlFor="profilePic" className="cursor-pointer">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-400 dark:bg-gray-700">
              {form.profilePic ? (
                <img
                  src={form.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex items-center justify-center h-full text-white">
                  Upload Image
                </span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            className="hidden"
            onChange={handleProfilePicChange}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Form Section */}
        <div className="max-w-3xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">Birthday Date</label>
              <input
                type="date"
                name="birthdayDate"
                value={form.birthdayDate}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Relationship</label>
              <input
                type="text"
                name="relationship"
                value={form.relationship}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
                placeholder="e.g. Friend, Sister"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-1">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Optional message or gift idea notes..."
              className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
            />
          </div>

          <div className="mt-6">
            <label className="block font-semibold">Reminder Type</label>
            <ToggleButtonGroup
              options={reminderTypes}
              selected={form.reminderType}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, reminderType: selected }))
              }
            />
          </div>

          <div className="mt-6">
            <label className="block font-semibold">Reminder Time</label>
            <ToggleButtonGroup
              options={reminderTimes}
              selected={form.reminderTime}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, reminderTime: selected }))
              }
            />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1">
                Reminder Time of Day
              </label>
              <input
                type="time"
                name="reminderTimeOfDay"
                value={form.reminderTimeOfDay}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex items-center mt-8 md:mt-0">
              <input
                type="checkbox"
                name="repeatYearly"
                checked={form.repeatYearly}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="font-semibold">Repeat Yearly</label>
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-semibold mb-1">
              Custom Message / Gift Idea
            </label>
            <textarea
              name="customMessage"
              value={form.customMessage}
              onChange={handleChange}
              placeholder="Optional custom message or gift suggestion..."
              className="w-full p-3 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-800"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {loadingPage==="loading" ? (
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all dark:bg-teal-400 dark:hover:bg-teal-300 dark:text-black"
              >
                Loading ...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all dark:bg-teal-400 dark:hover:bg-teal-300 dark:text-black"
              >
                Save Birthday
              </button>
            )}
            <button className="border border-teal-600 text-teal-600 dark:border-teal-300 dark:text-teal-300 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 transition-all">
              Generate Gift Ideas (AI)
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBirthdayPage;
