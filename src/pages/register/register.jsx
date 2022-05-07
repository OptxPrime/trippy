import {NavLink} from "react-router-dom";

export const Register = () => {
    return (
    <main style={{ padding: "1rem 0" }}>
        <h2> Do you want to register as an agency or a traveler? </h2>
        <div style={{display:"flex", flexDirection:"column"}}>
            <NavLink to='agency'>
            {/*<Button text="Agency"/>*/}
                <button className="w3-btn w3-margin w3-round-large w3-indigo">
                    Agency
                </button>
            </NavLink>

            <NavLink to='traveler'>
                <button className="w3-btn w3-margin w3-round-large w3-indigo">
                    Traveler
                </button>
            </NavLink>

            <h4> Already have an account?</h4>
            <NavLink to='/login'>
                <button className="w3-btn w3-margin w3-round-large w3-indigo">
                    Go to login page
                </button>
            </NavLink>

        </div>

    </main>
  );
}

