// SearchFriend Component
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearUsersData, fetchSearchedUserThunk } from "../../Redux/Slices/friendshipSlice";
import Friend from "./Friend.jsx";

function SearchFriend() {
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const dispatch = useDispatch();
    const usersData = useSelector((state) => state?.friendship?.usersData) || [];
    const totalPages = useSelector((state) => state?.friendship?.totalPages);

    const handleChangeInQuery = (e) => {
        const val = e.target.value;
        setQuery(val);

        if (!val) {
            dispatch(clearUsersData());
        }
    };

    async function handleSearchUser(e) {
        e.preventDefault();
        toast.dismiss();

        if (!query) {
            toast.error("Search query not provided!!");
            return;
        }
        

        const res = await dispatch(fetchSearchedUserThunk({ page, limit, query }));
        console.log(res);
    }


    return (
        <section className="flex flex-col justify-center items-center gap-4">
            <div className="relative mt-10 w-[350px]" id="input">
                <form onSubmit={handleSearchUser}>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChangeInQuery}
                        placeholder="Enter username to search for user..."
                        className="block w-full text-sm h-[50px] px-4 text-slate-900 bg-white rounded-[8px] border border-slate-200 appearance-none focus:border-transparent focus:outline focus:outline-2 focus:outline-primary focus:ring-0 hover:border-brand-500-secondary"
                    />
                    <button className="absolute top-3 right-3">
                        <MdOutlineSearch className="text-3xl dark:text-black" />
                    </button>
                </form>
            </div>
            <div className="flex flex-row flex-wrap justify-center items-center p-4 gap-2">
                {usersData?.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    usersData?.map((ele) => (
                        <Friend
                            key={ele?.user?._id}
                            friendId={ele?.user?._id}
                            imgSrc={ele?.user?.avatar?.secure_url}
                            username={ele?.user?.username}
                            email={ele?.user?.email}
                            friendStatus={ele?.friendshipStatus}
                            requestId={ele?.requestId || "not-available"}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default SearchFriend;
