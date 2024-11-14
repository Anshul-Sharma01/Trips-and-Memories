import { useDispatch, useSelector } from "react-redux";
import SendRequest from "./SendRequest.jsx";
import CancelRequest from "./CancelRequest.jsx";
import { acceptFriendRequestThunk, declineFriendRequestThunk } from "../../Redux/Slices/friendshipSlice.js";

// Friend Component
function Friend({ imgSrc, username, email, friendStatus, friendId, requestId }) {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state?.auth?.userData);
    if(userData.username === username){
        return;
    }

    const handleAcceptRequest = () => {
        dispatch(acceptFriendRequestThunk({requestId}));
    };

    const handleDeclineRequest = () => {
        dispatch(declineFriendRequestThunk({requestId}));
    };
    
    return (
        <div className="friend-card flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800">
            <div className="avatar-container flex justify-center items-center w-[60px] h-[60px] overflow-hidden rounded-full border border-gray-300">
                <img
                    src={imgSrc || "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="ml-4 flex-grow mr-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{username || "John Doe"}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{email || "someone@example.com"}</p>
            </div>
            <div className="flex space-x-2 gap-4 ml-auto">
                {friendStatus === "requestReceived" && (
                    <>
                        <button
                            onClick={handleAcceptRequest}
                            className="accept-button px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleDeclineRequest}
                            className="decline-button px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Decline
                        </button>
                    </>
                )}
                {friendStatus === "requestSent" && (
                    <CancelRequest requestId={requestId} />
                )}
                {friendStatus === "friend" && (
                    <button className="remove-button px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200">
                        Remove Friend
                    </button>
                )}
                {friendStatus === "none" && (
                    <SendRequest friendId={friendId} />
                )}
            </div>
        </div>
    );
}

export default Friend;
