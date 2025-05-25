import React, { useEffect } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { UnauthorizedError } from "../svgIcons/svgIcon";

const Unauthorized = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (auth?.token) {
  //     // navigate("/home");
  //   }
  // }, [auth, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center  
      text-gray-800 dark:text-white p-4"
    >
      <UnauthorizedError className="w-32 h-32 mb-6 text-blue-600 dark:text-blue-300" />

      <h1 className="text-4xl font-bold mb-2 text-center">Unauthorized Access</h1>

      <p className="text-lg text-center max-w-xl">
        You are not authorized to view this page. Please click {auth?.token ? "Home" : "login"} to continue.
      </p>

      {auth?.token ? (
        <button
          onClick={() => navigate("/home")}
          className="mt-6 px-6 py-2 bg-successLight text-white rounded-md hover:bg-secondaryLight transition-all dark:bg-successDark dark:hover:bg-secondaryDark"
        >
          Go to Home
        </button>
      ) : (
        <button
          onClick={() => navigate("/auth/login")}
          className="mt-6 px-6 py-2 bg-successLight text-white rounded-md hover:bg-secondaryLight transition-all dark:bg-successDark dark:hover:bg-secondaryDark"
        >
          Go to Login
        </button>
      )}
    </div>
  );
};

export default Unauthorized;
