import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BackButton from '../../Components/BackButton.jsx';
import { viewMemoryThunk } from '../../Redux/Slices/memorySlice.js';
import NavigationLayout from '../../Layouts/NavigationLayout.jsx';
import { FaCalendarAlt } from 'react-icons/fa';

function ViewMemory() {
    const { memoryId } = useParams();
    const dispatch = useDispatch();
    const [memoryData, setMemoryData] = useState("");

    async function viewMemory() {
        const res = await dispatch(viewMemoryThunk({ memoryId }));
        setMemoryData(res?.payload?.data);
    }

    useEffect(() => {
        viewMemory();
    }, [dispatch, memoryId]);

    return (
        <NavigationLayout>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300 flex flex-col items-center p-4">


                <div className="self-start mb-4">
                    <BackButton />
                </div>

                <div className="max-w-3xl w-full text-center">

                    <div className="overflow-hidden rounded-md mb-6 shadow-lg transform hover:scale-105 transition duration-300">
                        <img
                            src={memoryData?.thumbnail?.secure_url || '/placeholder-image.png'}
                            alt={memoryData?.title}
                            className="w-full h-80 object-cover"
                        />
                    </div>

 
                    <div className="mb-4">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
                            {memoryData?.title}
                        </h1>
                        <span className="flex justify-center p-4 items-center font-mono tracking-widest text-gray-500 dark:text-gray-400">
                            <FaCalendarAlt className="mr-1  text-blue-500" /> {new Date(memoryData?.tripDate).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Content */}
                    <p className="text-lg leading-relaxed mb-8">
                        {memoryData?.content}
                    </p>

                    {/* Tags and Likes */}
                    <div className="flex justify-between items-center mt-8 space-x-4 border-t pt-6 border-gray-300 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">Tags:</h4>
                            <div className="flex flex-wrap gap-2">
                                {memoryData?.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-sm font-medium">
                            <span className="font-semibold">{memoryData?.likes}</span> {memoryData?.likes === 1 ? 'Like' : 'Likes'}
                        </div>
                    </div>

                    {/* Back to Memories Button */}
                    <div className="mt-10">
                        <Link
                            to="/memory/all"
                            className="inline-block px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-md transition-all duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Back to Memories
                        </Link>
                    </div>
                </div>
            </div>
        </NavigationLayout>
    );
}

export default ViewMemory;
