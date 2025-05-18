import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Cake } from "lucide-react";
import DefaultUser from "../../assets/defaultUser.png";
import CakeAnimation from "../../assets/CakeAnimation.webm";
import Ribbon from "../../assets/ribbon.png";
import { lightColors, darkColors } from "../../utils/colorThemes";


const ListAllBirthdays = () => {
  const { auth } = useAuth();
  const [todayBirthdays, setTodayBirthdays] = useState([
    { _id: 1, name: "Raghul", relationShip: "Friend" },
    { _id: 2, name: "Ramkumar", relationShip: "Friend" },
    { _id: 3, name: "Shree", relationShip: "Sister" },
    { _id: 4, name: "Ramkumar", relationShip: "Friend" },
    { _id: 5, name: "Ramkumar", relationShip: "Friend" },
    { _id: 6, name: "Ramkumar", relationShip: "Friend" },
  ]);

  const [upcomingBirthdays, setUpcomingBirthdays] = useState([
    { _id: 1, name: "Raghul", relationShip: "Friend" },
    { _id: 2, name: "Ramkumar", relationShip: "Friend" },
    { _id: 3, name: "Shree", relationShip: "Sister" },
  ]);

  const getTodayBirthdays = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/todayBirthdays", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (res) {
        return setTodayBirthdays(res?.data?.todayBirthdays || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting today's birthdays");
    }
  };

  // useEffect(() => {
  //   getTodayBirthdays();
  // }, []);

  
  return (
    <div className="min-h-screen p-6 pb-28">
      {/* Greeting */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 drop-shadow-md">
          {`Hello, ${auth.user.name}!`}
        </h1>

        {/* Birthday Section */}
        <div className="bg-gradient-to-br from-[#f1f8e9] via-[#e8f5e9] to-[#e0f7fa] dark:from-[#2c5364] dark:via-[#203a43] dark:to-[#0f2027] shadow-2xl rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white tracking-wide drop-shadow-md">
            Today Birthdays
          </h2>

          <div className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-start gap-3 leading-relaxed">
            {todayBirthdays.length > 0 ? (
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
                  {todayBirthdays.length === 1 ? "is" : "are"} celebrating their{" "}
                  {todayBirthdays.length === 1 ? "birthday" : "birthdays"}.
                </span>
              </p>
            ) : (
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                No birthdays to celebrate today.
              </p>
            )}
          </div>
        </div>
      </div>

      {todayBirthdays.length > 0 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
          {todayBirthdays.map((b, index) => {
            const color = lightColors[index % lightColors.length];
              const darkColor = darkColors[index % darkColors.length];
              return (
                <div
                  key={index}
                  className={`relative flex flex-row gap-4 h-[150px] rounded-xl bg-white/80 dark:bg-[#1e293b]/80 border-l-4 ${color.border} dark:${darkColor.border} shadow-lg dark:shadow-md backdrop-blur-md p-4`}
                >
                  <img
                    src={Ribbon}
                    alt="ribbon"
                    className="absolute top-[-10px] right-[-15px] w-16 rotate-[45deg] drop-shadow-lg"
                  />
                  <div className="w-full">
                    <div className="flex flex-row gap-4">
                      <img
                        src={DefaultUser}
                        alt="User"
                        className={`w-16 h-16 rounded-full border-2 ${color.border} dark:${darkColor.border} shadow-lg`}
                      />
                      <div className="flex flex-row justify-between w-full items-center">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-lg truncate w-44 drop-shadow-sm">
                            {b.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                            {b.relationShip}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${color.from} ${color.to} dark:${darkColor.from} dark:${darkColor.to} text-white shadow-md font-semibold sparkle`}
                        >
                          0 days
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between mt-4 px-1">
                      <div>
                        <p className="text-xs ml-1 text-gray-600 dark:text-gray-400 font-semibold">
                          Birthday
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white font-bold drop-shadow-sm">
                          May 18, 2025
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                          Turning
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white font-bold drop-shadow-sm">
                          30 years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );})}
        </div>
      )}

      {/* Upcoming Birthdays */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6 drop-shadow-md">
        Upcoming Birthdays
      </h2>

      {upcomingBirthdays.length > 0 ? (
        <section>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
            {upcomingBirthdays.map((b, index) => {

              const color = lightColors[index % lightColors.length];
              const darkColor = darkColors[index % darkColors.length];

              return (
                <div
                  key={index}
                  className={`flex flex-row gap-4 h-[150px] rounded-xl bg-white/80 dark:bg-[#1e293b]/80 shadow-xl dark:shadow-md backdrop-blur-md p-4 border-l-[6px] ${color.border} dark:${darkColor.border} relative`}
                >
                  <div className="w-full">
                    <div className="flex flex-row gap-4">
                      <img
                        src={DefaultUser}
                        alt="User"
                        className={`w-16 h-16 rounded-full border-2 ${color.border} dark:${darkColor.border} shadow-lg`}
                      />
                      <div className="flex flex-row justify-between w-full items-center">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-lg truncate w-44 drop-shadow-sm">
                            {b.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                            {b.relationShip}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${color.from} ${color.to} dark:${darkColor.from} dark:${darkColor.to} text-white shadow-md font-semibold sparkle`}
                        >
                          5 days
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between mt-4 px-1">
                      <div>
                        <p className="text-xs ml-1 text-gray-600 dark:text-gray-400 font-semibold">
                          Birthday
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white font-bold drop-shadow-sm">
                          May 30, 2025
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
                          Turning
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white font-bold drop-shadow-sm">
                          22 years
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        <div className="mt-6 px-4 py-6 text-center text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-[#1e293b]/50 rounded-xl shadow-inner">
          <p className="text-lg font-semibold">
            Looks like everyone has had their cake! No upcoming birthdays for
            now.
          </p>
          <p className="text-sm mt-2">Keep checking — surprises may come!</p>
        </div>
      )}
    </div>
  );
};

export default ListAllBirthdays;
