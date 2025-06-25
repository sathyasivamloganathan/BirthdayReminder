import "./App.css";
import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Profile from "./pages/Profile/Profile";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { useAuth } from "./context/auth";
import { Moon, Sun } from "lucide-react";
import AddBirthday from "./pages/BirthdayPages/AddBirthday";
import ListAllBirthdays from "./pages/BirthdayPages/ListAllBirthdays";
import SeeAllBirthdays from "./pages/BirthdayPages/SeeAllBirthdays";
import EditBirthdaysAdded from "./pages/BirthdayPages/EditBirthdaysAdded";
function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { auth } = useAuth();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-[#e0f7fa] via-[#e8f5e9] to-[#f1f8e9] 
    dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] transition-colors duration-300"
    >
      <ToastContainer />
      {auth?.token ? <Navbar /> : ""}
      <Routes>
        <Route path="/" element={<Navigate to="/auth/register" replace />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/verifyEmail" element={<VerifyEmail />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/addbirthday" element={<AddBirthday />} />
          <Route path="/home" element={<ListAllBirthdays />} />
          <Route path="/editbirthdays" element={<EditBirthdaysAdded />} />
          <Route path="/allbirthdays" element={<SeeAllBirthdays />} />
        </Route>
        <Route path="/*" element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;
