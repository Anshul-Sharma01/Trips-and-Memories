import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Helpers/axiosInstance.js';
import MemoryCard from '../../Components/Memory/MemoryCard.jsx';
import NavigationLayout from '../../Layouts/NavigationLayout.jsx';

const BucketList = () => {
    const [bucketList, setBucketList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBucketList = async (page = 1) => {
        try {
        const response = await axiosInstance.get(`/bucketlist?page=${page}`);
        setBucketList(response.data.memories);
        setTotalPages(response.data.totalPages);
        setCurrentPage(page);
        } catch (error) {
        console.error('Error fetching bucket list memories:', error);
        }
    };

    useEffect(() => {
        fetchBucketList();
    }, []);


    const handleNextPage = () => {
        if (currentPage < totalPages) {
        fetchBucketList(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        fetchBucketList(currentPage - 1);
        }
    };

    return (
        <NavigationLayout>
            <div className="min-h-screen flex flex-col items-center bg-white dark:bg-gray-900 p-6">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8">Bucket List Memories</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {bucketList.length > 0 ? (
                    bucketList.map((memory) => (
                        <MemoryCard key={memory.id} memory={memory} />
                    ))
                    ) : (
                    <p className="text-gray-600 text-center dark:text-gray-400">No memories in your bucket list yet.</p>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-8 space-x-4">
                    <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 dark:bg-blue-400 dark:hover:bg-blue-300"
                    >
                    Previous
                    </button>
                    <span className="text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                    </span>
                    <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages} 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 dark:bg-blue-400 dark:hover:bg-blue-300"
                    >
                    Next
                    </button>
                </div>
            </div>
        </NavigationLayout>
    );
};

export default BucketList;
