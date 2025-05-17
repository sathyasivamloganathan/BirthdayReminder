import { BookmarkCheck } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#e8f5e9] to-[#f1f8e9] dark:from-[#0f2027] dark:via-[#203a43] dark:to-[#2c5364] px-4 py-8">
      <div className="bg-white dark:bg-[#1e1e2f] shadow-2xl rounded-2xl p-10 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-4">
          <BookmarkCheck className="w-14 h-14 text-[#00ff37] drop-shadow-lg" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Verify Your Email
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          A verification link has been sent to your email address. Please check
          your inbox, spam and follow the instructions to activate your account.
        </p>
        <button
          onClick={() => navigate("/auth/login")}
          className="bg-[#00c853] hover:bg-[#00b248] text-white font-semibold px-6 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-xl"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
