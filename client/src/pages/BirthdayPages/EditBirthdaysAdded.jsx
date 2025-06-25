import { useState } from "react";
import EditImage from "../../assets/EditPageImage1.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { API_URL } from "../../apiConfig";
import ToggleButtonGroup from "../../components/ToggleButtonGroup";
import { Trash } from "lucide-react";
import { fetchAllBirthdays } from "../../app/features/Birthdays/allBirthdaysSlice";
import { useDispatch } from "react-redux";

const remainderTypes = ["Email"];
const remainderTimes = ["1 Month Before", "1 Week Before", "1 Day Before"];



const EditBirthdaysAdded = () => {
  const { state } = useLocation();
  const { auth } = useAuth();
  const dispatch = useDispatch();

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const selectedUser = state?.selectedUser || {};
  selectedUser.birthdayDate = formatDate(selectedUser.birthdayDate);

  const [form, setForm] = useState(selectedUser);

  const [loadingPage, setLoadingPage] = useState(false);
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
        setForm((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.info("Please select an image under 200KB.");
    }
  };

  const deletePhoto = () => {
    setForm((prev) => ({
      ...prev,
      profileImage: null,
    }))
    return toast.success("Photo removed, tap save to make changes.");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("birthdayDate", form.birthdayDate);
      formData.append("relationship", form.relationship);
      formData.append("notes", form.notes);
      form.remainderType.forEach((item) => {
        formData.append("remainderType[]", item);
      });
      form.remainderTime.forEach((item) => {
        formData.append("remainderTime[]", item);
      });
      formData.append("remainderTimeOfDay", form.remainderTimeOfDay);
      formData.append("repeatYearly", form.repeatYearly);
      formData.append("customMessage", form.customMessage);

      const blob = await fetch(form.profileImage).then((res) => res.blob());
      if(form.profileImage === null || form.profileImage === "") {
        formData.append("deleteProfileImage", "true");
      } else {
        formData.append("profileImage", blob, "profile.jpg");
      }
      
      setLoadingPage(true);
      const res = await axios.put(
        `${API_URL}/api/updateSpecificBirthday/${selectedUser._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoadingPage(false);
      dispatch(fetchAllBirthdays(auth?.token));
      toast.success("Birthday Edited Successfully !!");
      return navigate("/home");
    } catch (error) {
      setLoadingPage(false);
      console.log(error);
      toast.error("Birthday not Edited. Error occured !!");
    }
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-100 pb-28">
      {/* Header Section with Background and Curved Bottom */}
      <div
        className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full bg-cover bg-top rounded-b-[15px] overflow-hidden shadow-md"
        style={{
          backgroundImage: `url(${EditImage})`,
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
            Edit the Birthday Added
          </p>
        </div>
        <div className="flex flex-col absolute right-0 mt-10 m-10">
          <label htmlFor="profileImage" className="cursor-pointer">
            <button
              onClick={() => deletePhoto()}
              className="absolute bottom-2 right-5 transform translate-x-1/2 z-50 w-[30px] h-[30px] bg-red-500 flex justify-center align-middle items-center 
            rounded-full"
            >
              <Trash size={18}/>
            </button>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-400 dark:bg-gray-700">
              {form.profileImage ? (
                <img
                  src={form.profileImage}
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
            id="profileImage"
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
              options={remainderTypes}
              selected={form.remainderType}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, remainderType: selected }))
              }
            />
          </div>

          <div className="mt-6">
            <label className="block font-semibold">Reminder Time</label>
            <ToggleButtonGroup
              options={remainderTimes}
              selected={form.remainderTime}
              onChange={(selected) =>
                setForm((prev) => ({ ...prev, remainderTime: selected }))
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
                name="remainderTimeOfDay"
                value={form.remainderTimeOfDay}
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
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all dark:bg-teal-400 dark:hover:bg-teal-300 dark:text-black"
            >
              Save Edited Birthday
            </button>
            <button className="border border-teal-600 text-teal-600 dark:border-teal-300 dark:text-teal-300 font-semibold px-6 py-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-800 transition-all">
              Generate Gift Ideas (AI)
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBirthdaysAdded;
