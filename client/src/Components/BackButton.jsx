import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="fixed top-4 left-4">
            <button
                onClick={handleBackClick}
                className="flex items-center px-6 py-2 space-x-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all"
            >
                <FaArrowLeft className="text-lg" />
                <span className="hidden sm:inline">Back</span>
            </button>
        </div>
    );
}

export default BackButton;
