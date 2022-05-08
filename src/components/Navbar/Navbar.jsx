import {NavLink} from "react-router-dom";

// navbar idea from https://tailwindcss.com/docs/reusing-styles#/projects

export const Navbar = () => {
    return (
       <nav className="w-full flex sm:justify-center space-x-4">
      {[
        ['Home', '/home'],
        ['My trips', '/my-trips'],
        ['Register', '/register'],
        ['Login', '/login'],
      ].map(([title, url]) => (
        <NavLink to={url}
                 className="m-2 bg-sky-300 dark:bg-sky-700 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">{title}</NavLink>
      ))}
       </nav>
    );
}