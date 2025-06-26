import { PencilLine, Trash2, X } from "lucide-react";
import DefaultUser from "../../assets/DefaultUser.jpg";
import { reminderTimes, reminderTypes } from "../../utils/Reminder";
const BirthdayProfileView = ({ selectedUser, setShowModal, onDelete, onEdit }) => {
  const Detail = ({ label, value }) => (
    <p>
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {label}:
      </span>{" "}
      <span className="text-gray-900 dark:text-gray-100">{value}</span>
    </p>
  );

  

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl overflow-y-auto bg-white dark:bg-[#1d263b] text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold tracking-tight leading-snug">
            Birthday Details
          </h3>
          <button
            className="text-gray-500 hover:text-red-500 transition"
            onClick={() => setShowModal(false)}
          >
            <X size={26} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col sm:flex-row gap-6 px-6 py-5">
          <img
            src={
              selectedUser.profileImage?.startsWith("data:image")
                ? selectedUser.profileImage
                : DefaultUser
            }
            alt={selectedUser.name}
            className="w-32 h-32 rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover shadow-md mx-auto sm:mx-0"
          />
          <div className="flex-1 space-y-3 text-base leading-relaxed">
            <Detail label="Name" value={selectedUser.name} />
            <Detail
              label="Birthday"
              value={new Date(selectedUser.birthdayDate).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            />
            <Detail label="Relationship" value={selectedUser.relationship} />
            <Detail
              label="Repeat Yearly"
              value={selectedUser.repeatYearly ? "Yes" : "No"}
            />

            <div>
              <p className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Reminder Time
              </p>
              <div className="flex flex-wrap gap-2">
                {reminderTimes.map((time) => (
                  <span
                    key={time}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                    ${
                      selectedUser.reminderTime?.includes(time)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {time}
                  </span>
                ))}
              </div>
              <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Time of Day: {selectedUser.reminderTimeOfDay}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Reminder Type
              </p>
              <div className="flex flex-wrap gap-2">
                {reminderTypes.map((type) => (
                  <span
                    key={type}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition
                    ${
                      selectedUser.reminderType?.includes(type)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {selectedUser.customMessage && (
              <Detail
                label="Custom Message / Gift Idea"
                value={selectedUser.customMessage}
              />
            )}
            {selectedUser.notes && (
              <Detail label="Notes" value={selectedUser.notes} />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onEdit()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
          >
            <PencilLine size={18} />
            Edit
          </button>
          <button
            onClick={() => onDelete(selectedUser._id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BirthdayProfileView;
