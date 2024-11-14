import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllFriendsThunks } from "../../Redux/Slices/friendshipSlice";
import BackButton from "../../Components/BackButton";
import SearchFriend from "../../Components/Friends/SearchFriend";
import Friend from "../../Components/Friends/Friend";

function AllFriends() {
    const [friendsList, setFriendsList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const dispatch = useDispatch();

    async function fetchAllFriends(){
        const res = await dispatch(fetchAllFriendsThunks());
        setFriendsList(res?.payload?.data?.friends)
        setTotalPages(res?.payload?.data?.totalPages);
        console.log("Response of friends-list :", res);
    }

    useEffect(() => {
        fetchAllFriends();
    }, [])

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
                                imgSrc={ele?.friend?.avatar?.secure_url}
                                friendId={ele?.friend?._id}
                                friendStatus={ele?.friendshipStatus}
                                username={ele?.friend?.username}
                                email={ele?.friend?.email}
                                name={ele?.friend?.name}
                                key={ele?._id}
                            />
                            
                            )
                        }
                    </div>
                )
            }
            <div className="flex justify-center items-center mt-10 space-x-6">
                <button
                    className={`px-6 py-3 text-white font-semibold rounded-lg transition duration-300 shadow-lg transform ${
                        page === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                    }`}
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className={`px-6 py-3 text-white font-semibold rounded-lg transition duration-300 shadow-lg transform ${
                        page === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                    }`}
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
            <section className="overflow-y-scroll h-[400px] w-[90%] max-w-3xl bg-gray-200 dark:bg-gray-800 px-6 py-4 rounded-xl shadow-inner mt-10">
                <SearchFriend />
            </section>
        </div>
    );
}

export default AllFriends;
