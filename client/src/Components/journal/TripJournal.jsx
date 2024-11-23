import React from "react";
import { Link } from "react-router-dom";

function TripJournal({ journalTitle, journalDesc, journalEntries, journalId }) {
    return (

        <Link to={`/view-journal/${journalId}`}>
            <div className="relative max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-xl font-caveat">

                <div className="absolute top-4 left-0 h-[calc(100%-2rem)] w-2 bg-yellow-600 rounded-md"></div>

                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4 ">
                    {journalTitle || "My Journal"}
                </h1>


                <p className="text-lg italic text-gray-600 dark:text-gray-300 text-center mb-4">
                    {journalDesc || "A fascinating story of adventures and memories"}
                </p>

                <div className="flex justify-center items-center text-gray-700 dark:text-gray-200">
                    <span className="text-lg">Entries:</span>
                    <span className="ml-2 text-xl font-semibold">{journalEntries || 0}</span>
                </div>
            </div>
        </Link>
    );
}

export default TripJournal;
