import React, { useEffect, useState } from 'react';
import AllFriends from '../../Pages/Friends/AllFriends';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFriendsThunks } from '../../Redux/Slices/friendshipSlice';
import Friend from '../Friends/Friend';
import { Link, useParams } from 'react-router-dom';
import { fetchJournalContributorsThunk } from '../../Redux/Slices/tripJournalSlice';

function ManageContributors() {

    const { journalId } = useParams();
    const dispatch = useDispatch();
    let friendsList = useSelector((state) => state?.friendship?.friendsList) || []
    let contributors = useSelector((state) => state?.tripJournal?.contributors) || [];
    const userData = useSelector((state) => state?.auth?.userData);

    async function fetchAllFriends(){
        const res = await dispatch(fetchAllFriendsThunks());
        console.log("Friends : ", res);
    }

    const handleContributorRemoval = async(e) => {
        const id = e.target.id;
        const updatedContributors = contributors.filter((ele) => ele._id != id);
        const contributors1 = updatedContributors.map((ele) => ele._id);
        console.log("Contributors-upda : ", contributors1);
    }

    async function fetchContributors(){
        const res = await dispatch(fetchJournalContributorsThunk({ journalId }));
        console.log("Contributors : ", res);
    }

    useEffect(() => {
        // fetchAllFriends();
        // fetchContributors();
        console.log("Friendslist:",friendsList);
        console.log("contributors-redux : ", contributors);
    }, [])

    return (
        <section>
            <h1 className="text-center font-sans text-4xl font-bold my-6 text-blue-600">
                Manage Contributors
            </h1>
            {
                friendsList.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">
                        You don't have any friends yet! 🥲
                    </p>
                ) : (
                    <section className="flex flex-wrap justify-center items-center gap-4 mb-8">
                        {
                            friendsList.map((ele) => {
                                return (
                                    <div
                                        className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg transform hover:scale-105 transition duration-300"
                                        key={ele?.friend?._id}
                                    >
                                        <Friend
                                            imgSrc={ele?.friend?.avatar?.secure_url}
                                            email={ele?.friend?.email}
                                            username={ele?.friend?.username}
                                            friendId={ele?.friend?._id}
                                            requestId={ele?.friend?._id}
                                            disableLink={true}
                                        />
                                    </div>
                                );
                            })
                        }
                    </section>
                )
            }
            <section>
                <form className="contributor-form bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-8 mx-auto max-w-md">
                    <h2 className="text-lg font-semibold text-center mb-4 text-gray-800 dark:text-gray-200">
                        Add Contributor
                    </h2>
                    <div className="mb-4">
                        <label
                            htmlFor="friend-unique-id"
                            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
                        >
                            Friend ID
                        </label>
                        <input
                            type="text"
                            id="friend-unique-id"
                            placeholder="Enter friend ID to add as a contributor"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
                    >
                        Add Contributor
                    </button>
                    <p className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
                        * To add someone outside of your friends list, first add them as a friend from <Link to="/manage-friends" className="text-blue-500 hover:underline">Manage Friends</Link>.
                    </p>
                </form>
            </section>
            <section className="mt-10">
                <h1 className="text-center text-3xl font-serif text-gray-800 dark:text-white mb-6">
                    Current Contributors
                </h1>
                {
                    contributors.length === 0 ? (
                        <p className="text-center text-gray-600 text-lg">
                            No contributors yet! Add some to get started. 🚀
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-6 justify-center">
                            {
                                contributors.map((ele) => (
                                    <div
                                        key={ele?._id}
                                        id={ele?._id}
                                        className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-lg transform hover:scale-105 transition duration-300"
                                    >
                                        <img
                                            src={ele?.avatar?.secure_url}
                                            alt="contributor-avatar"
                                            className="h-10 w-10 rounded-full border border-gray-300"
                                        />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                                {ele?.username}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                {ele?.email}
                                            </p>
                                        </div>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition duration-200"
                                            onClick={handleContributorRemoval}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </section>
        </section>

    );
}

export default ManageContributors;
