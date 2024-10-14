import NavigationLayout from "../Layouts/NavigationLayout.jsx";
import { useState } from "react";

function LandingPage() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Navigation */}
            <NavigationLayout />

            {/* Hero Section */}
            <section className="bg-blue-600 dark:bg-blue-800 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Trips & Memories</h1>
                    <p className="text-xl">Capture, share, and cherish your travel memories with friends.</p>
                    <button className="mt-6 px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors">
                        Get Started
                    </button>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Each feature box */}
                        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-teal-400 mb-4">Trip Journals</h3>
                            <p className="text-gray-600 dark:text-gray-300">Create detailed trip journals with photos, locations, and notes.</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-teal-400 mb-4">Virtual Memory Box</h3>
                            <p className="text-gray-600 dark:text-gray-300">Store your favorite memories in a virtual time capsule to revisit later.</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-blue-600 dark:text-teal-400 mb-4">Collaborative Journals</h3>
                            <p className="text-gray-600 dark:text-gray-300">Invite friends to contribute and share memories in collaborative journals.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-gray-200 dark:bg-gray-700">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">Our Impact in Numbers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-5xl font-bold text-blue-600 dark:text-teal-400">10K+</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Memories Shared</p>
                        </div>
                        <div>
                            <h3 className="text-5xl font-bold text-blue-600 dark:text-teal-400">5K+</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Active Users</p>
                        </div>
                        <div>
                            <h3 className="text-5xl font-bold text-blue-600 dark:text-teal-400">1K+</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300">Journals Created</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                            <button
                                onClick={() => toggleFAQ(1)}
                                className="w-full text-left flex justify-between items-center focus:outline-none"
                            >
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-teal-400">
                                    How do I create a new trip journal?
                                </h3>
                                <span>{openFAQ === 1 ? "-" : "+"}</span>
                            </button>
                            {openFAQ === 1 && (
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    To create a new trip journal, simply head to the 'My Journals' section, click on 'Create New Journal', and start
                                    documenting your adventure!
                                </p>
                            )}
                        </div>

                        {/* FAQ Item 2 */}
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                            <button
                                onClick={() => toggleFAQ(2)}
                                className="w-full text-left flex justify-between items-center focus:outline-none"
                            >
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-teal-400">
                                    Can I invite friends to my journals?
                                </h3>
                                <span>{openFAQ === 2 ? "-" : "+"}</span>
                            </button>
                            {openFAQ === 2 && (
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Yes! You can invite friends to contribute to your journal by adding them in the 'Contributors' section while
                                    editing your journal.
                                </p>
                            )}
                        </div>

                        {/* FAQ Item 3 */}
                        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                            <button
                                onClick={() => toggleFAQ(3)}
                                className="w-full text-left flex justify-between items-center focus:outline-none"
                            >
                                <h3 className="text-xl font-semibold text-blue-600 dark:text-teal-400">
                                    How do I reset my password?
                                </h3>
                                <span>{openFAQ === 3 ? "-" : "+"}</span>
                            </button>
                            {openFAQ === 3 && (
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    If you forgot your password, go to the 'Log In' page, click 'Forgot Password', and follow the instructions sent
                                    to your email.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white text-center">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-lg mb-6">Join us today and begin capturing unforgettable memories with Trips & Memories.</p>
                    <button className="px-6 py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors">
                        Get Started
                    </button>
                </div>
            </section>
            <footer className="bg-gray-900 text-white py-6 text-center">
                <p>&copy; 2024 Trips & Memories. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default LandingPage;
