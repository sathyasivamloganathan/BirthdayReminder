import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import CakeAnimation from "../../assets/CakeAnimation.webm";
import { SkeletonLoader } from "../../components/SkeletonLoader";
import BirthdayCard from "../../components/BirthdayCards/BirthdayCard";
import {
  getAge,
  getNextUpcomingBirthdays,
  groupBirthdaysByMonth,
} from "../../utils/BirthdayUtils";
import { darkColors, lightColors } from "../../utils/colorThemes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodayBirthdays,
  getTodayBirthdays,
  getTodayBirthdaysStatus,
} from "../../app/features/Birthdays/todayBirthdaySlice";
import {
  fetchUpcomingBirthdays,
  getUpcomingBirthdays,
  getUpcomingBirthdaysStatus,
} from "../../app/features/Birthdays/upcomingBirthdaySlice";
import {
  fetchAllBirthdays,
  getAllBirthdays,
  getAllBirthdaysStatus,
} from "../../app/features/Birthdays/allBirthdaysSlice";
import { getProfileDetails } from "../../app/features/Profile/profileSlice";
import DefaultUser from "../../assets/DefaultUser.jpg";

const ListAllBirthdays = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();

  // Today birthdays get api reducer
  const todayBirthdays = useSelector(getTodayBirthdays);
  const todayBirthdayStatus = useSelector(getTodayBirthdaysStatus);

  // Upcoming birthdays get api reducer
  const upcomingBirthdays = useSelector(getUpcomingBirthdays);
  const upcomingBirthdaysStatus = useSelector(getUpcomingBirthdaysStatus);

  // All birthdays
  const futureBirthdays = useSelector(getAllBirthdays);
  const allBirthdaysStatus = useSelector(getAllBirthdaysStatus);

  // Profile state
  const profileState = useSelector(getProfileDetails);

  const [nextUpcomoingBirthdays, setNextUpcomingBirthdays] = useState([]);
  const [groupedByMonth, setGroupedByMonth] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (todayBirthdayStatus === "rejected") {
      toast.error(
        "Error in getting today's birthdays. Check your internet connection."
      );
    }

    if (upcomingBirthdaysStatus === "rejected") {
      toast.error(
        "Error at Upcoming Birthdays. Check your internet connection."
      );
    }

    if (allBirthdaysStatus === "rejected") {
      toast.error("Error at Birthdays added. Check your internet connection.");
    }
  }, [todayBirthdayStatus, upcomingBirthdaysStatus, allBirthdaysStatus]);

  useEffect(() => {
    if (auth?.token) {
      if (todayBirthdayStatus === "idle") {
        dispatch(fetchTodayBirthdays(auth.token));
        dispatch(fetchUpcomingBirthdays(auth.token));
        dispatch(fetchAllBirthdays(auth?.token));
      }
      if (upcomingBirthdaysStatus === "idle") {
        dispatch(fetchUpcomingBirthdays(auth.token));
        dispatch(fetchAllBirthdays(auth?.token));
      }
      if (allBirthdaysStatus === "idle") {
        dispatch(fetchAllBirthdays(auth?.token));
      }
    }
    // getAllBirthdays();
  }, [dispatch, auth?.token]);

  useEffect(() => {
    setGroupedByMonth(groupBirthdaysByMonth(futureBirthdays));
    setNextUpcomingBirthdays(
      groupBirthdaysByMonth(getNextUpcomingBirthdays(futureBirthdays))
    );
  }, [futureBirthdays]);

  const handleNavigate = () => {
    if (futureBirthdays.length === 0) {
      return toast.info("No Birthdays Added");
    }
    navigate("/allbirthdays", { state: { groupedByMonth } });
  };

  return (
    <div className="min-h-screen p-6 pb-32">
      {/* Greeting */}
      <div className="max-w-3xl mx-auto">
        <section className="flex justify-between items-center mb-7 px-4">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white drop-shadow-md">
            {`Hello, ${auth?.user.name}!`}
          </h1>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
            <img
              src={profileState.profileImage || DefaultUser}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Birthday Section */}
        <div className="bg-gradient-to-br from-[#f1f8e9] via-[#e8f5e9] to-[#e0f7fa] dark:from-[#2c5364] dark:via-[#203a43] dark:to-[#0f2027] shadow-2xl rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white tracking-wide drop-shadow-md">
            Today Birthdays
          </h2>

          <div className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-start gap-3 leading-relaxed">
            {todayBirthdayStatus === "succeeded" ? (
              todayBirthdays.length > 0 ? (
                <p className="flex items-center gap-4">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-[100px] h-[100px]"
                  >
                    <source src={CakeAnimation} />
                  </video>
                  <span>
                    Today{" "}
                    {todayBirthdays
                      .map((b) => b.name)
                      .join(", ")
                      .replace(/, ([^,]*)$/, " and $1")}{" "}
                    {todayBirthdays.length === 1 ? "is" : "are"} celebrating
                    their{" "}
                    {todayBirthdays.length === 1 ? "birthday" : "birthdays"}.
                  </span>
                </p>
              ) : (
                <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                  No birthdays to celebrate today.
                </p>
              )
            ) : (
              <SkeletonLoader lightTheme="gray-300" darkTheme="gray-500" />
            )}
          </div>
        </div>
      </div>

      {todayBirthdays.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {todayBirthdays.map((b, index) => {
            return (
              <BirthdayCard
                key={b._id}
                birthday={b}
                index={index}
                isToday={true}
              />
            );
          })}
        </div>
      )}

      {/* Upcoming Birthdays */}
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-12 mb-6 drop-shadow-md">
        Upcoming Birthdays in 30 Days :
      </h2>

      {upcomingBirthdays.length > 0 ? (
        <section>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
            {upcomingBirthdays.map((b, index) => {
              return (
                <BirthdayCard
                  key={b._id}
                  birthday={b}
                  index={index}
                  isToday={false}
                />
              );
            })}
          </div>
        </section>
      ) : (
        <div className="mt-6 px-4 py-6 text-center text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-[#1e293b]/50 rounded-xl shadow-inner">
          <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
            Looks like everyone has had their cake! No upcoming birthdays for
            now.
          </p>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Keep checking — surprises may come!
          </p>
        </div>
      )}

      <section className="w-full flex flex-row justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-12 mb-6 drop-shadow-md">
          Future Birthdays
        </h2>
        <button
          onClick={handleNavigate}
          className="text-center mt-12 mb-6 text-primaryLight dark:text-primaryDark font-semibold text-[18px] drop-shadow-md"
        >
          See All
        </button>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: 12 }).map((_, index) => {
          const monthName = new Date(0, index).toLocaleString("default", {
            month: "long",
          });
          const monthBirthdays = nextUpcomoingBirthdays[index] || [];

          if (monthBirthdays.length === 0) {
            return null;
          }

          return (
            <div
              key={index}
              className="mt-2 bg-transparent text-gray-800 dark:text-gray-200 py-4 px-4 rounded-xl shadow-xl border border-gray-300 dark:border-gray-700 backdrop-blur-md"
            >
              <h2 className="text-xl font-bold drop-shadow-md tracking-wide text-gray-900 dark:text-gray-100 mb-6 ml-2">
                {monthName}
              </h2>

              {monthBirthdays.map((person, personIndex) => {
                const date = new Date(person.birthdayDate).getDate();
                {
                  /* const color = lightColors[personIndex % lightColors.length];
                const darkColor = darkColors[personIndex % darkColors.length]; */
                }
                const randomIndex = Math.floor(
                  Math.random() * lightColors.length
                );
                const color = lightColors[randomIndex];
                const darkColor = darkColors[randomIndex];

                return (
                  <div
                    key={personIndex}
                    className="flex flex-row items-center justify-between ml-2 mr-2 mb-4 pb-2 border-b-2 border-gray-300 dark:border-gray-600"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${color.from} ${color.to} dark:${darkColor.from} dark:${darkColor.to} flex items-center justify-center text-white font-bold text-md shadow-md`}
                    >
                      {date}
                    </div>
                    <div className="flex flex-col ml-4 flex-grow">
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {person.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                        {person.relationship}
                      </p>
                    </div>
                    <div className="text-base font-semibold text-emerald-700 dark:text-emerald-400">
                      {getAge(person.birthdayDate)} Years
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ListAllBirthdays;
