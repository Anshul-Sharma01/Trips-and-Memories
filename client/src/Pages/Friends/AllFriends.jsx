import { useState } from "react";

function AllFriends() {
    const [friendsList, setFriendsList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    return (
        <div className="all-friends-container flex flex-col justify-center items-center h-screen p-6 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-serif tracking-widest text-gray-800 dark:text-white mb-4">
                All Friends
            </h1>
            {
                friendsList.length === 0 ? (
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        You haven't added any friends yet
                    </p>
                ) : (
                    <div className="friends-list w-full max-w-2xl mt-6 space-y-4">
                        {/* Friend components would be rendered here */}
                    </div>
                )
            }
            <div className="flex justify-center items-center mt-10 space-x-4">
                    <button
                        className={`px-6 py-2 text-white rounded-md shadow-md ${
                            page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                    >
                        Previous
                    </button>
                    <button

                        className={`px-6 py-2 text-white rounded-md shadow-md ${
                            page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
                        }`}
                    >
                        Next
                    </button>
            </div>
        </div>
    );
}

export default AllFriends;
