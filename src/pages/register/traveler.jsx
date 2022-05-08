import {useNavigate} from "react-router-dom";

export const RegisterTraveler = () => {

    const navigate = useNavigate()

    return (
    <>
        <form style={{width:"40%"}} className="w3-container w3-indigo" action={`${process.env.REACT_APP_API_URL}/register/traveler`} method="POST">
            <label className="w3-text-white"><b>First name</b></label>
            <input className="w3-input w3-border w3-light-grey" name="first_name" type="text"/>

            <label className="w3-text-white"><b>Last name</b></label>
            <input className="w3-input w3-border w3-light-grey" name="last_name" type="text"/>

            <label className="w3-text-white"><b> Username</b></label>
            <input className="w3-input w3-border w3-light-grey" name="username" type="text"/>

            <label className="w3-text-white"><b>Email</b></label>
            <input className="w3-input w3-border w3-light-grey" name="email" type="email"/>

            <label className="w3-text-white"><b>Password</b></label>
            <input className="w3-input w3-border w3-light-grey" name="password" type="password"/>

            <label className="w3-text-white"><b>Repeat password</b></label>
            <input className="w3-input w3-border w3-light-grey" name="repeated_password" type="password"/>

            <button className="w3-btn w3-round-large w3-margin w3-black">Register</button>
        </form>

        <button
            className="w3-btn w3-round-large w3-margin w3-indigo"
            onClick={()=>navigate(-1)}
        >
            Go back
        </button>
    </>
  );
}