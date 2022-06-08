import {NavLink, useNavigate} from "react-router-dom";

import './Navbar.css'
import {useEffect, useState} from "react";
import axios from "axios";
import useToken from "../../hooks/useToken";

// navbar idea from https://tailwindcss.com/docs/reusing-styles#/projects

export const Navbar = () => {

    const {token} = useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('putovanja-token');
        navigate('/login');
    }

    const [user, setUser] = useState();

    const fetchUserData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get_user`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        return response;
    }

    useEffect(() => {
        fetchUserData(token)
            .then((response) => {
                let usr = response.data[0];
                setUser(usr);
            })
            .catch((err) => {
                console.log(err);
                // setError("Error fetching data!");
            })
    }, []);

    return (
        <nav className="w-full flex sm:justify-center space-x-4">
            <div className="navbar-section">
                <img src="app-logo.png" className="app-logo"/>
                {[
                    ['Home', '/home'],
                    ['My trips', '/my-trips'],
                    ['Future trips', '/future-trips'],
                    ['About us', '/about-us']
                ].map(([title, url]) => (
                    <NavLink key={title} to={url}
                             className="m-2 bg-sky-300 dark:bg-sky-700 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">{title}</NavLink>
                ))}
            </div>
            <div className="navbar-section">
                {[
                    ['Profile', '/profile'],
                ].map(([title, url]) => (
                    <NavLink key={title} to={url}
                             className="m-2 profile-container"
                    >
                        <img className="avatar"
                             src={user?.profile_pic ? `${process.env.REACT_APP_API_URL}/media/${user?.profile_pic}`
                                 : user?.logo ? `${process.env.REACT_APP_API_URL}/media/${user?.logo}`
                                     : "https://herrmans.eu/wp-content/uploads/2019/01/765-default-avatar.png"}
                        />
                        <p className="text-sm avatar-username">{user?.username ? user.username : user?.name ? user?.name : null} </p>
                    </NavLink>
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