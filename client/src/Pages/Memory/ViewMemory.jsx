import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../Components/BackButton.jsx';
import { viewMemoryThunk } from '../../Redux/Slices/memorySlice.js';

function ViewMemory() {
    const { memoryId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ memoryData, setMemoryData ] = useState("");
    const memory = null;

    async function viewMemory(){
        const res = await dispatch(viewMemoryThunk({ memoryId }));
        setMemoryData(res?.payload?.data);
    }

    useEffect(() => {
        viewMemory();
    }, [])


    return (
        <div className="container h-screen bg-white dark:bg-gray-900 ">
            <BackButton  />

            <div className="memory-view m-[146px] bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform duration-300 hover:scale-105">


                <img
                    src={memoryData?.thumbnail?.secure_url || '/placeholder-image.png'}
                    alt={memoryData?.title}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">
                    <div className="mb-4">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                            {memoryData?.title}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                            {new Date(memoryData?.tripDate).toLocaleDateString()}
                        </p>
                    </div>

                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                        {memoryData?.content}
                    </p>

                    <div className="flex justify-between items-center mt-6">
                        <div>
                            <h4 className="font-bold text-gray-700 dark:text-gray-300">Tags:</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {memoryData?.tags?.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">{memoryData?.likes}</span> {memoryData?.likes === 1 ? 'Like' : 'Likes'}
                        </div>
                    </div>


                    <div className="mt-8 flex justify-end">
                        <Link
                            to="/memory/all"
                            className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition-all duration-300 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            Back to Memories
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewMemory;
