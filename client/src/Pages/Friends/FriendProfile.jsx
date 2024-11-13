

function FriendProfile({ imgSrc, username, email, name, onRemoveFriend, isFriend }) {
    return (
        <main className="friend-profile-container max-w-md mx-auto my-8 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
            <section className="flex flex-col items-center text-center">
                <div className="avatar-container flex justify-center items-center w-[100px] h-[100px] overflow-hidden rounded-full border-4 border-gray-300 mb-4">
                    <img
                        src={imgSrc || "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png"}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{name || "John Doe"}</h1>
                <p className="text-gray-600 dark:text-gray-300">{username || "@johndoe"}</p>
                <p className="text-gray-500 dark:text-gray-400">{email || "someone@example.com"}</p>
                
                <div className="flex justify-center items-center ">
                    {
                        isFriend ? (
                            <button
                                onClick={onRemoveFriend}
                                className="remove-friend-btn mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none"
                            >
                                Remove Friend
                            </button>
                        ) : (
                                <button
                                    onClick={onRemoveFriend}
                                    className="remove-friend-btn mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none"
                                >
                                    Add Friend
                                </button>
                        )
                    } 
                    

                </div>

            </section>

            <section className="memories-section mt-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Memories</h2>
                <div className="memories-placeholder p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    <p>No Memories available yet. Check back soon!</p>
                </div>
            </section>
        </main>
    );
}

export default FriendProfile;
