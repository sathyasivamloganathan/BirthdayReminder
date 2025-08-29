import { configureStore } from "@reduxjs/toolkit";
import todayBirthdaysReducer from "../features/Birthdays/todayBirthdaySlice";
import upcomingBirthdaysReducer from "../features/Birthdays/upcomingBirthdaySlice";
import allBirthdaysReducer from  "../features/Birthdays/allBirthdaysSlice";
import profileReducer from "../features/Profile/profileSlice";
import birthdayActionsReducer from "../features/Birthdays/addBirthdaySlice";
import registerReducer from "../features/Profile/RegisterSlice";

export const store = configureStore({
  reducer: {
    todayBirthdays: todayBirthdaysReducer,
    upcomingBirthdays: upcomingBirthdaysReducer,
    allBirthdays: allBirthdaysReducer,
    profile: profileReducer,
    birthdayActions: birthdayActionsReducer,

    register: registerReducer,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare(),
});