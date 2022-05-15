import {NavLink, useNavigate} from "react-router-dom";

import './Navbar.css'

// navbar idea from https://tailwindcss.com/docs/reusing-styles#/projects

export const Navbar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('putovanja-token');
        navigate('/login');
    }

    return (
        <nav className="w-full flex sm:justify-center space-x-4">
            <div className="navbar-section">
                {[
                    ['Home', '/home'],
                    ['My trips', '/my-trips'],
                    ['About us', '/about-us']
                ].map(([title, url]) => (
                    <NavLink to={url}
                             className="m-2 bg-sky-300 dark:bg-sky-700 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">{title}</NavLink>
                ))}
            </div>
            <div className="navbar-section">
                {[
                    ['Sign up', '/register'],
                    ['Log in', '/login'],
                ].map(([title, url]) => (
                    <NavLink to={url}
                             className="m-2 bg-sky-300 dark:bg-sky-700 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">{title}</NavLink>
                ))}

                <a // a tag instead of button only to match style of Navlink
                    className="m-2 bg-sky-300 dark:bg-sky-700 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black"
                    onClick={handleLogout}
                >
                    Log out
                </a>
            </div>
        </nav>
    );
}