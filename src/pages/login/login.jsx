import {NavLink} from "react-router-dom";

export const Login = () => {
    return (
    <main style={{ padding: "1rem 0" }}>
        <h2 className="text-black dark:text-white"> Do you want to log in as an agency or a traveler? </h2>
        <div style={{display:"flex", flexDirection:"column"}}>
            <NavLink to='agency'>
                <button style={{width:"100%"}} className="w3-btn w3-margin w3-round-large w3-indigo">
                    Agency
                </button>
            </NavLink>

            <NavLink to='traveler'>
                <button style={{width:"100%"}} className="w3-btn w3-margin w3-round-large w3-indigo">
                    Traveler
                </button>
            </NavLink>

            <h4 className="text-black dark:text-white"> Don't have an account?</h4>
            <NavLink to='/register'>
                <button style={{width:"100%"}} className="w3-btn w3-margin w3-round-large w3-indigo">
                    Go to register page
                </button>
            </NavLink>

        </div>

    </main>
  );
}

