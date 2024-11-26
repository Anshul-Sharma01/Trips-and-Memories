import React from "react";
import { Link } from "react-router-dom";
import CloseJournal from "./CloseJournal";

function TripJournal({ journalTitle, journalDesc, journalEntries, journalId, journalOpen }) {
    return (
        <div className="relative m-20">
            <Link to={`/view-journal/${journalId}`}>
                <div className="relative max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-xl font-caveat">

                    {/* Decorative Side Bar */}
                    <div className="absolute top-4 left-0 h-[calc(100%-2rem)] w-2 bg-yellow-600 rounded-md"></div>

                    {/* Journal Title */}
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-4">
                        {journalTitle || "My Journal"}
                    </h1>

                    {/* Journal Description */}
                    <p className="text-lg italic text-gray-600 dark:text-gray-300 text-center mb-4">
                        {journalDesc || "A fascinating story of adventures and memories"}
                    </p>

                    {/* Journal Entries */}
                    <div className="flex justify-center items-center text-gray-700 dark:text-gray-200">
                        <span className="text-lg">Entries:</span>
                        <span className="ml-2 text-xl font-semibold">{journalEntries || 0}</span>
                    </div>
                </div>
            </Link>

            {
                journalOpen ? (
                    <div className="absolute flex gap-10 left-[50%] transform -translate-x-1/2">
                        <Link to={`/add-entry/${journalId}`}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-bl-xl rounded-br-xl font-semibold hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 transition-all shadow-md">
                                Add Entry
                            </button>
                        </Link>
                        <CloseJournal journalId={journalId} />
                    </div>
                ) : (
                    <div className="absolute flex flex-col justify-center items-center left-[50%] transform -translate-x-1/2">
                        <span className="text-red-500">Journal Closed</span>
                        <p className="text-gray-600">You can still view all its entries</p>
                    </div>
                )
            }

        </div>
    );
}

export default TripJournal;
