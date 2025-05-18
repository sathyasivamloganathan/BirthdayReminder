import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Cake } from "lucide-react";

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

  console.log(todayBirthdays);

  return (
    <div className="min-h-screen p-6">
      {/* Greeting */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          {`Hello, ${auth.user.name}!`}
        </h1>

        {/* Birthday Section */}
        <div className="bg-gradient-to-br from-[#f1f8e9] via-[#e8f5e9] to-[#e0f7fa] dark:from-[#2c5364] dark:via-[#203a43] dark:to-[#0f2027] shadow-2xl rounded-2xl p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white tracking-wide">
            Today Birthdays
          </h2>

          <div className="text-md font-medium text-gray-700 dark:text-gray-200 flex items-start gap-2">
            {todayBirthdays.length > 0 ? (
              <p className="flex items-center gap-2">
                <Cake
                  className="text-pink-500 dark:text-yellow-300"
                  size={64}
                />
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
              <p>No birthdays to celebrate today.</p>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
        {todayBirthdays.map((b, index) => {
          return (
            <div className="flex flex-row gap-4 h-[100px] bg-gray-400 scroll-m-0">
              <div>{b.name}</div>
              <div>{b.relationShip}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAllBirthdays;
