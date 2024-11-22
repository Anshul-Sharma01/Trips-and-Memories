import { useState } from "react";

function CreateJournal() {
    const [journalData, setJournalData] = useState({
        title: "",
        description: ""
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-12 px-6 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-8">
                <h1 className="text-center font-bold text-4xl text-gray-900 dark:text-white mb-8">
                    Create Your Journal
                </h1>
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                        >
                            Journal Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={journalData.title}
                            onChange={(e) => setJournalData({ ...journalData, title: e.target.value })}
                            placeholder="Enter your journal title..."
                            className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-3 px-4 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-lg font-medium text-gray-700 dark:text-gray-200"
                        >
                            Journal Description
                        </label>
                        <textarea
                            id="description"
                            value={journalData.description}
                            onChange={(e) =>
                                setJournalData({ ...journalData, description: e.target.value })
                            }
                            placeholder="Write about your journal..."
                            rows="5"
                            className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-3 px-4 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        ></textarea>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="button"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all"
                        >
                            Save Journal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateJournal;
