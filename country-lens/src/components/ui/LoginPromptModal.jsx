import React from "react";
import { Link } from "react-router-dom";

const LoginPromptModal = ({ onClose }) => {
  return (
    <div
      className="bg-white dark:bg-[#213448] rounded-lg p-6 max-w-sm w-full"
      // Prevent clicks inside the modal from closing it
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-end mb-4">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <h2 className="text-xl font-bold text-[#213448] dark:text-[#ECEFCA] mb-4">
        Please Log In
      </h2>
      <p className="text-[#547792] dark:text-[#94B4C1] mb-6">
        You need to be logged in to add countries to your favorites.
      </p>
      <div className="flex justify-between space-x-4">
        <Link
          to="/login"
          className="flex-1 bg-[#547792] text-[#ECEFCA] py-2 px-4 rounded-lg text-center"
          onClick={onClose} // Close modal when navigating to login
        >
          Log In
        </Link>
        <button
          onClick={onClose}
          className="flex-1 bg-[#ECEFCA] text-[#213448] py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPromptModal;
