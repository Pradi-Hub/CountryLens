import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Login Required
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
                    You need to log in to add this country to your favorites.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Login
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPromptModal;