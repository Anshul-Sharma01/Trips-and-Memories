import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "../Components/ThemeToggle";
import { logoutUserAccount } from "../Redux/Slices/authSlice";
import { IoMdTimer } from "react-icons/io";

function NavigationLayout({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    async function handleLogout() {
        const res = await dispatch(logoutUserAccount());
        console.log("Successfully logged-out: ", res);
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Navigation Bar */}
            <nav className="bg-blue-600 dark:bg-gray-800 text-white flex items-center justify-between p-4 relative z-20 shadow-md">
                {/* Logo & Drawer Toggle */}
                <div className="flex items-center space-x-4">
                    <button onClick={toggleDrawer} className="focus:outline-none transition-transform transform hover:scale-110">
                        <FiMenu size={"32px"} className="text-white" />
                    </button>
                    <Link to="/" className="text-2xl font-bold hover:text-teal-300 transition-colors">
                        Trips & Memories
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex justify-center items-center space-x-6">
                    {/* General Links */}
                    <li><Link to="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
                    <li><Link to="/memory/all" className="hover:text-teal-300 transition-colors">Explore</Link></li>
                    
                    {isLoggedIn ? (
                        <>
                            {/* User-Specific Links */}
                            <li><Link to="/create-journal" className="hover:text-teal-300 transition-colors">Create Journal</Link></li>
                            <li><Link to="/my-bucket-list" className="hover:text-teal-300 transition-colors">My Bucket List</Link></li>
                            <li><Link to="/my-journals" className="hover:text-teal-300 transition-colors">My Journals</Link></li>
                            <li><Link to="/user/me/profile" className="hover:text-teal-300 transition-colors">Profile</Link></li>
                            <li><Link to="/users/friends-list" className="hover:text-teal-300 transition-colors">Friends</Link></li>
                            <li><button onClick={handleLogout} className="hover:text-red-500 transition-colors">Log Out</button></li>
                        </>
                    ) : (
                        <>
                            {/* Auth Links */}
                            <li><Link to="/auth/login" className="hover:text-teal-300 transition-colors">Log In</Link></li>
                            <li><Link to="/auth/register" className="hover:text-teal-300 transition-colors">Sign Up</Link></li>
                        </>
                    )}
                    <li>
                        <ThemeToggle />
                    </li>
                </ul>

                {/* Drawer Navigation */}
                {isDrawerOpen && (
                    <div className="fixed inset-0 bg-gray-700 bg-opacity-80 z-30 text-lg">
                        <div className="absolute left-0 top-0 bg-gray-800 text-white p-4 w-64 h-full shadow-lg dark:bg-gray-900">
                            {/* Close Drawer Button */}
                            <button onClick={toggleDrawer} className="mb-10 hover:text-teal-300 transition-colors absolute right-4">
                                <ImCross />
                            </button>
                            <ul className="space-y-4 mt-6 flex flex-col justify-start items-start">
                                {/* General Links */}
                                <li><Link to="/" className="hover:text-teal-300 transition-colors">Home</Link></li>
                                <li><Link to="/memory/all" className="hover:text-teal-300 transition-colors">Explore</Link></li>
                                
                                {isLoggedIn ? (
                                    <>
                                        {/* User-Specific Links */}
                                        <li><Link to="/create-journal" className="hover:text-teal-300 transition-colors">Create Journal</Link></li>
                                        <li><Link to="/memory/create-memory" className="hover:text-teal-300 transition-colors">Create Memory</Link></li>
                                        <li><Link to="/time-capsules/create" className="hover:text-teal-300 transition-colors flex items-center gap-2">
                                            Create Time Capsule <IoMdTimer className="text-lg" />
                                        </Link></li>
                                        <li><Link to="/my-bucket-list" className="hover:text-teal-300 transition-colors">Bucket List</Link></li>
                                        <li><Link to="/user/me/profile" className="hover:text-teal-300 transition-colors">Profile</Link></li>
                                        <li><Link to="/users/friends-list" className="hover:text-teal-300 transition-colors">Friends</Link></li>
                                        <li><Link to="/get-recomm" className="hover:text-teal-300 transition-colors">Recommendations</Link></li>
                                        <li><button onClick={handleLogout} className="hover:text-red-500 transition-colors">Log Out</button></li>
                                    </>
                                ) : (
                                    <>
                                        {/* Auth Links */}
                                        <li><Link to="/auth/login" className="hover:text-teal-300 transition-colors">Log In</Link></li>
                                        <li><Link to="/auth/register" className="hover:text-teal-300 transition-colors">Sign Up</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <div className="">
                {children}
            </div>
        </div>
    );
}

export default NavigationLayout;
