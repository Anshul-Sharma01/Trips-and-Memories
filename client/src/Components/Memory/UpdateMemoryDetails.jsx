import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMemoryDetailsThunk } from "../../Redux/Slices/memorySlice";

function UpdateMemoryDetails({ memoryData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [updatedMemoryData, setUpdatedMemoryData] = useState({
        title: memoryData?.title,
        content: memoryData?.content,
        category: memoryData?.category,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    function handleDataUpdation(e) {
        const { name, value } = e.target;
        setUpdatedMemoryData({ ...updatedMemoryData, [name]: value });
    }

    async function handleMemoryUpdation(){
        toast.dismiss();
        if(!memoryData.title && !memoryData.category && !memoryData.content){

            toast.error("At least one field is required !!");
            return;
        }

        const formData = new FormData();
        formData.append("title", updatedMemoryData.title);
        formData.append("category", updatedMemoryData.category);
        formData.append("content", updatedMemoryData.content);

        const memoryId = memoryData._id;

        await dispatch(updateMemoryDetailsThunk({ memoryId, formData }));
        navigate("/memory/my");
        closeModal();
        
    }

    return (
        <div className="text-right p-4">
            <button
                onClick={openModal}
                className="px-5 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
            >
                Update Memory
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-8 transform duration-300 hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                                Update Memory
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-600 dark:text-gray-400 text-2xl hover:text-gray-900 dark:hover:text-white transition"
                            >
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleMemoryUpdation} className="space-y-6">
                            <div className="flex flex-col">
                                <label htmlFor="title" className="text-lg font-medium text-gray-800 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={updatedMemoryData.title}
                                    onChange={handleDataUpdation}
                                    id="title"
                                    className="w-full mt-1 p-3 border rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="category" className="text-lg font-medium text-gray-800 dark:text-gray-300">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={updatedMemoryData.category}
                                    onChange={handleDataUpdation}
                                    id="category"
                                    className="w-full mt-1 p-3 border rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="content" className="text-lg font-medium text-gray-800 dark:text-gray-300">
                                    Content
                                </label>
                                <textarea
                                    name="content"
                                    value={updatedMemoryData.content}
                                    onChange={handleDataUpdation}
                                    id="content"
                                    rows="5"
                                    className="w-full mt-1 p-3 border rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-lg font-semibold"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateMemoryDetails;
