import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../Components/ThemeToggle";
import { logoutUserAccount } from "../Redux/Slices/authSlice";

function NavigationLayout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    async function handleLogout() {
        const res = await dispatch(logoutUserAccount());
        console.log("Successfully logged-out : ", res);
    }

    return (
        <nav className="bg-blue-600 dark:bg-gray-800 text-white flex items-center justify-between p-4 relative z-20 shadow-md">
            <div className="flex items-center space-x-4">
                <button onClick={toggleDrawer} className="focus:outline-none transition-transform transform hover:scale-110">
                    <FiMenu size={"32px"} className="text-white" />
                </button>
                <Link to="/" className="text-2xl font-bold hover:text-teal-300 transition-colors">Trips & Memories</Link>
            </div>


            <ul className="hidden md:flex justify-center items-center space-x-6">
                <li><Link to="/explore" className="hover:text-teal-300 transition-colors">Explore</Link></li>
                {isLoggedIn ? (
                    <>
                        <li><Link to="/my-journals" className="hover:text-teal-300 transition-colors">My Journals</Link></li>
                        <li><Link to="/my-bucket-list" className="hover:text-teal-300 transition-colors">My Bucket List</Link></li>
                        <li><Link to="/user/me/profile" className="hover:text-teal-300 transition-colors">My Profile</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/auth/login" className="hover:text-teal-300 transition-colors">Log In</Link></li>
                        <li><Link to="/auth/register" className="hover:text-teal-300 transition-colors">Sign Up</Link></li>
                    </>
                )}
                <li>
                    <ThemeToggle />
                </li>
            </ul>


            {isDrawerOpen && (
                <div className="fixed inset-0 bg-gray-700 bg-opacity-80 z-30 text-lg">
                    <div className="absolute left-0 top-0 bg-gray-800 text-white p-4 w-64 h-full shadow-lg dark:bg-gray-900">
                        <button onClick={toggleDrawer} className="mb-10 hover:text-teal-300 transition-colors absolute right-4">
                            <ImCross />
                        </button>
                        <ul className="space-y-2 mt-6 flex flex-col justify-start items-center gap-2">
                            <li><Link to="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
                            <li><Link to="/memory/create-memory" className="hover:text-teal-300 transition-colors">Create Memory</Link></li>
                            {isLoggedIn ? (
                                <>
                                    <li><Link to="/time-capsules" className="hover:text-teal-300 transition-colors">Time Capsules</Link></li>
                                    <li><Link to="/memory/my" className="hover:text-teal-300 transition-colors">My Memories</Link></li>
                                    <li><Link to="/my-friends" className="hover:text-teal-300 transition-colors">Friends List</Link></li>
                                    <li><Link to="/recom" className="hover:text-teal-300 transition-colors">Recommendations</Link></li>
                                    <li><button onClick={handleLogout} className="hover:text-red-500 transition-colors">Log Out</button></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/auth/login" className="hover:text-teal-300 transition-colors">Log In</Link></li>
                                    <li><Link to="/auth/register" className="hover:text-teal-300 transition-colors">Sign Up</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavigationLayout;
