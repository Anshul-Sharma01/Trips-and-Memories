import React, { useState } from 'react';
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isEntering, setIsEntering] = useState(false);

    const toggleTheme = () => {
        setIsEntering(true);
        setIsDarkMode(prev => !prev);

        document.getElementsByTagName("html")[0].setAttribute("class",isDarkMode ? "dark" : "light");

        setTimeout(() => {
            setIsEntering(false);
        }, 300); 
    };

    return (
        <label
            className="flex items-center cursor-pointer"
            style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
        >
            <input type="checkbox" className="hidden" onChange={toggleTheme} />
            <div className="relative flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
                {/* Sun Icon */}
                <div
                    className={`icon transition-all duration-300 absolute ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                    style={{
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        opacity: isDarkMode ? 0 : 1,
                        transform: isDarkMode ? 'scale(0.5)' : 'scale(1)', // Optional scaling
                    }}
                >
                    <FiSun size={30} />
                </div>

                {/* Moon Icon */}
                <div
                    className={`icon transition-all duration-300 absolute ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        opacity: isDarkMode ? 1 : 0,
                        transform: isDarkMode ? 'scale(1)' : 'scale(0.5)', // Optional scaling
                    }}
                >
                    <FiMoon size={30} />
                </div>
            </div>
        </label>
    );
}

export default ThemeToggle;
