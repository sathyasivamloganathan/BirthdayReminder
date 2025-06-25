import { useLocation } from "react-router-dom";
import BirthdayCard from "../../components/BirthdayCards/BirthdayCard";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BirthdayProfileView from "../../components/BirthdayCards/BirthdayProfileView";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useDispatch, useSelector } from "react-redux"
import { deleteBirthdayApi } from "../../app/features/Birthdays/addBirthdaySlice";
import { fetchUpcomingBirthdays, getUpcomingBirthdays } from "../../app/features/Birthdays/upcomingBirthdaySlice";
import { fetchAllBirthdays } from "../../app/features/Birthdays/allBirthdaysSlice";

const SeeAllBirthdays = () => {
  const { auth } = useAuth();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const upcomingBirthdays = useSelector(getUpcomingBirthdays);
  
  const allBirthdays = state?.groupedByMonth || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const navigate = useNavigate();


  const handleCardClick = (person) => {
    setSelectedUser(person)
    setShowModal(true);
  };


  const handleDelete = (id) => {
    try {
      dispatch(deleteBirthdayApi({id, token: auth?.token}));
      dispatch(fetchUpcomingBirthdays(auth?.token));
      dispatch(fetchAllBirthdays(auth?.token));
      navigate("/home")
    } catch (error) {
      return toast.error("Error in deleting the details")
    }
  };

  const handleEditNavigate = () => {
    if(selectedUser.length === 0) {
      return toast.error("Error Occured");
    }
    navigate("/editbirthdays", {state: {selectedUser}});
  }

  
  return (
    <div className="min-h-screen w-full pb-32">
      <h2 className="flex flex-row justify-between text-2xl font-bold text-gray-900 dark:text-white pt-12 ml-4 drop-shadow-md">
        <div>Birthdays</div>
        <button
          onClick={() => navigate("/home")}
          className="mr-4 flex items-center align-middle"
        >
          {<X size={32} />}
        </button>
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 12 }).map((_, index) => {
          const monthName = new Date(0, index).toLocaleString("default", {
            month: "long",
          });
          const monthBirthdays = allBirthdays[index] || [];

          if (monthBirthdays.length === 0) {
            return null;
          }

          return (
            <div
              key={index}
              className="mt-2 bg-transparent text-gray-800 dark:text-gray-200 py-4 px-4 rounded-xl shadow-xl"
            >
              <h2 className="text-xl font-bold drop-shadow-md tracking-wide text-gray-900 dark:text-gray-100 mb-6 ml-2">
                {monthName}
              </h2>

              {monthBirthdays.map((person, personIndex) => {
                return (
                  <div key={personIndex} className="mt-4">
                    <BirthdayCard
                      key={person._id}
                      birthday={person}
                      index={personIndex}
                      isToday={false}
                      onClick={() => handleCardClick(person)}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>

      {showModal && (
        <BirthdayProfileView selectedUser={selectedUser} setShowModal={setShowModal} onDelete={handleDelete} onEdit={handleEditNavigate}/>
      )}
    </div>
  );
};

export default SeeAllBirthdays;
