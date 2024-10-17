import React from 'react';

function MemoryCard({ memory }) {
    return (
        <div className="memory-card bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <img src={memory.thumbnail?.secure_url} alt={memory.title} className="memory-thumbnail w-full h-48 object-cover" />
            
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{memory.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{memory.content}</p>
                
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {memory.likes} {memory.likes === 1 ? 'Like' : 'Likes'}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(memory.tripDate).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MemoryCard;
