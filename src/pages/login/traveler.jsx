import {useNavigate} from "react-router-dom";

export const LoginTraveler = () => {

    const navigate = useNavigate()

    return (
    <>
        <form className="w3-container w3-indigo" action={`${process.env.REACT_APP_API_URL}/login/traveler`} method="POST">
            <label className="w3-text-white"><b>Email</b></label>
            <input className="w3-input w3-border w3-light-grey" name="email" type="email" required/>

            <label className="w3-text-white"><b>Password</b></label>
            <input className="w3-input w3-border w3-light-grey" name="password" type="password" required/>

            <button type="submit" className="w3-btn w3-round-large w3-margin w3-black">Login</button>
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