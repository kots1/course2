import React, { useState } from 'react';
import './css/style.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
            <header>
                <nav>
                    <ul className="left-nav">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Courses</a>
                        </li>
                    </ul>
                    <ul className="right-nav">
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <a href="#">Profile</a>
                                </li>
                                <li>
                                    <button className="logout-btn" onClick={handleLogout}>
                                        Log out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button className="accent auth" onClick={handleLogin}>
                                        Log in
                                    </button>
                                </li>
                                <li>
                                    <button className="danger auth">Register</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
    );
}

export default Header;