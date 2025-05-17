// import { Bell, CalendarDays, Gift, Home, Plus, User2 } from "lucide-react";
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const navItems = [
//     { label: "Home", icon: Home, path: "/home" },
//     { label: "Calendar", icon: CalendarDays, path: "/calendar" },
//     { label: "Gifts", icon: Gift, path: "/gifts" },
//     { label: "Notifications", icon: Bell, path: "/notifications" },
//     { label: "Profile", icon: User2, path: "/profile" },
//   ];

//   const isActive = (path) => pathname === path;

//   return (
//     <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md z-50">
//       <div className="relative backdrop-blur-md bg-white/30 dark:bg-[#1C1C1E]/50 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl flex justify-between items-center px-5 py-3">
//         {navItems.map((item, index) => {
//           const Icon = item.icon;
//           const isCenter = index === 2; // middle item
//           return (
//             <div
//               key={item.label}
//               className={`relative flex flex-col items-center ${
//                 isCenter ? "translate-y-[-30%]" : ""
//               }`}
//             >
//               <button
//                 onClick={() => navigate(item.path)}
//                 className={`relative z-20 p-3 rounded-full transition-all duration-300 flex items-center justify-center
//                   ${
//                     isActive(item.path)
//                       ? "bg-primaryLight dark:bg-primaryDark text-white shadow-lg scale-110"
//                       : "bg-transparent text-textLight dark:text-textDark"
//                   }
//                   ${
//                     isCenter
//                       ? "w-14 h-14 bg-gradient-to-br from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark text-white shadow-xl hover:scale-110"
//                       : "w-10 h-10"
//                   }
//                 `}
//               >
//                 <Icon className="w-6 h-6" />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { Bell, CalendarDays, Gift, Home, Plus, User2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { label: "Home", icon: Home, path: "/home" },
    { label: "Calendar", icon: CalendarDays, path: "/calendar" },
    { label: "Add", icon: Plus, path: "/addbirthday", center: true },
    { label: "Gifts", icon: Gift, path: "/gifts" },
    { label: "Profile", icon: User2, path: "/profile" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="relative bg-white/30 dark:bg-[#141414]/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-2xl rounded-full px-5 py-1.5 flex justify-between items-center">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const center = item.center;

          return (
            <div
              key={item.label}
              className={`relative flex flex-col items-center justify-center ${
                center ? "translate-y-[-50%]" : ""
              }`}
            >
              <button
                onClick={() => navigate(item.path)}
                className={`transition-all duration-300 flex items-center justify-center
                  ${
                    center
                      ? "bg-gradient-to-tr from-primaryLight to-secondaryLight dark:from-primaryDark dark:to-secondaryDark w-14 h-14 rounded-full  text-white shadow-xl"
                      : "w-10 h-10"
                  }
                  ${
                    active && !center
                      ? "text-primaryLight dark:text-primaryDark"
                      : "text-textLight dark:text-textDark"
                  }
                `}
              >
                <Icon className="w-6 h-6" />
              </button>
              {!center && (
                <div
                  className={`mt-[2px] w-1.5 h-1.5 rounded-full transition-all ${
                    active
                      ? "bg-primaryLight dark:bg-primaryDark"
                      : "bg-transparent"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;