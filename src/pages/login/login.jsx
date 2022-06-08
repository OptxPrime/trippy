import {NavLink} from "react-router-dom";

export const Login = () => {
    return (
    <main style={{ padding: "1rem 0" }}>
        <img src="app-logo.png" className="app-logo-pic"/>
        <h2 className="text-black dark:text-white"> Do you want to log in as an agency or a traveler? </h2>
        <div style={{display:"flex", flexDirection:"column"}}>
            <NavLink to='agency'>
                <button style={{width: "100%"}}
                        className="m-2 bg-sky-300 dark:bg-sky-600 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">
                    Agency
                </button>
            </NavLink>

            <NavLink to='traveler'>
                <button style={{width: "100%"}}
                        className="m-2 bg-sky-300 dark:bg-sky-600 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">
                    Traveler
                </button>
            </NavLink>

            <h4 className="text-black dark:text-white"> Don't have an account?</h4>
            <NavLink to='/register'>
                <button style={{width: "100%"}}
                        className="m-2 bg-sky-300 dark:bg-sky-600 rounded-lg px-3 py-2 font-medium hover:bg-sky-700 dark:hover:bg-sky-300 hover:text-white dark:hover:text-black">
                    Go to register page
                </button>
            </NavLink>

        </div>

    </main>
  );
}

