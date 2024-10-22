import React from 'react';
import { Link } from 'react-router-dom';

function MemoryCard({ memory }) {
    return (
        <div className="memory-card bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer">
            <img src={memory.thumbnail?.secure_url} alt={memory.title} className="memory-thumbnail w-full h-48 object-cover" />

            <div className="p-4">

                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {memory.title}
                </h3>


                <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {memory.content}
                </p>


                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {memory.likes} {memory.likes === 1 ? 'Like' : 'Likes'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(memory.tripDate).toLocaleDateString()}
                    </span>
                </div>

                <Link
                    to={`/memory/${memory._id}`}
                    className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    View Memory
                </Link>
            </div>
        </div>
    );
}

export default MemoryCard;
