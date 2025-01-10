import { useState } from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "../../Components/Dashboard/AdminDashboard";
import ManageUsers from "../../Components/Dashboard/ManageUsers";
import Analytics from "../../Components/Dashboard/Analytics";

function Dashboard() {
    const [currentView, setCurrentView] = useState("Dashboard");

    const userData = useSelector((state) => state?.auth?.userData);

    const renderContent = () => {
        switch (currentView) {
        case "Dashboard":
            return <AdminDashboard/>
        case "Users":
            return <ManageUsers/>
        case "Memory":
            return <h1 className="text-2xl font-bold text-center">Memory Usage Section</h1>;
        case "Analytics":
            return <Analytics/>
        default:
            return <h1 className="text-2xl font-bold text-center">Select a Section</h1>;
        }
    };

    return (
        <div className="h-[100vh] flex dark:bg-gray-900">

            <aside className="w-1/4 h-full bg-gray-100 dark:bg-gray-800 p-4">
                <h2 className=" px-4 py-2 mb-2 flex flex-col justify-center items-center dark:text-white text-xl dark:bg-black rounded-lg"> 
                    Welcome<span className="text-blue-600 font-bold">{userData.username}</span></h2>
                <nav className="flex flex-col gap-4">
                    <button
                        className={`p-2 text-left rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${
                        currentView === "Dashboard" ? "bg-gray-300 dark:bg-gray-700" : ""
                        }`}
                        onClick={() => setCurrentView("Dashboard")}
                    >
                        Dashboard
                    </button>
                    <button
                        className={`p-2 text-left rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${
                        currentView === "Users" ? "bg-gray-300 dark:bg-gray-700" : ""
                        }`}
                        onClick={() => setCurrentView("Users")}
                    >
                        Users
                    </button>
                    <button
                        className={`p-2 text-left rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${
                        currentView === "Memory" ? "bg-gray-300 dark:bg-gray-700" : ""
                        }`}
                        onClick={() => setCurrentView("Memory")}
                    >
                        Memory
                    </button>
                    <button
                        className={`p-2 text-left rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 ${
                        currentView === "Analytics" ? "bg-gray-300 dark:bg-gray-700" : ""
                        }`}
                        onClick={() => setCurrentView("Analytics")}
                    >
                        Analytics
                    </button>
                </nav>
            </aside>

            <main className="w-3/4 h-full flex justify-center items-center p-4">
                {renderContent()}
            </main>
        </div>
    );
}

export default Dashboard;
