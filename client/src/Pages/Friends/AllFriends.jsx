import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFriendsThunks } from "../../Redux/Slices/friendshipSlice";
import BackButton from "../../Components/BackButton";
import SearchFriend from "../../Components/Friends/SearchFriend";
import Friend from "../../Components/Friends/Friend";
import PendingRequests from "../../Components/Friends/PendingRequests";

function AllFriends() {

    const dispatch = useDispatch();
    const friendsList = useSelector((state) => state?.friendship?.friendsList) || []
    const refreshKey = useSelector((state) => state?.friendship?.refreshKey);

    async function fetchAllFriends(){
        const res = await dispatch(fetchAllFriendsThunks());
    }

    useEffect(() => {
        fetchAllFriends();
    }, [refreshKey])

    return (
        <div className="all-friends-container flex flex-col justify-center items-center h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
            <BackButton />
            <h1 className="text-5xl font-extrabold tracking-wide text-center mb-6 text-gray-800 dark:text-white">
                All Friends
            </h1>
            {
                friendsList.length === 0 ? (
                    <p className="text-lg bg-gray-200 dark:bg-gray-700 rounded-md p-4 shadow-md mb-4">
                        You haven't added any friends yet
                    </p>
                ) : (
                    <div className="friends-list w-full max-w-2xl mt-6 space-y-4">
                        {
                            friendsList.map((ele) => 
                            <Friend
                                key={ele?._id}
                                imgSrc={ele?.friend?.avatar?.secure_url}
                                friendId={ele?.friend?._id}
                                friendStatus={ele?.friendshipStatus}
                                username={ele?.friend?.username}
                                email={ele?.friend?.email}
                                name={ele?.friend?.name}
                            />
                            
                            )
                        }
                    </div>
                )
            }
            <section className="flex justify-center items-center gap-10">
                <section className="flex justify-center items-center w-1/2 bg-slate-300 min-w-[50%]  h-[400px]  px-6 py-4 rounded-xl shadow-inner overflow-y-scroll mt-10">
                    <PendingRequests/>
                </section>
                
                <section className="overflow-y-scroll min-w-[50%] h-[400px] w-1/2 bg-gray-200 dark:bg-gray-800 px-6 py-4 rounded-xl shadow-inner mt-10">
                    <SearchFriend />
                </section>

            </section>
        </div>
    );
}

export default AllFriends;
