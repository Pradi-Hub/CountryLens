import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptModal = ({ isOpen, onClose, message }) => {
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-[#213448] dark:text-[#ECEFCA] mb-4">Login Required</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-[#547792] hover:bg-[#213448] text-[#ECEFCA] px-4 py-2 rounded-md order-2 sm:order-1"
                    >
                        Login
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-[#547792] hover:bg-gray-100 dark:hover:bg-gray-700 text-[#547792] px-4 py-2 rounded-md order-1 sm:order-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPromptModal;