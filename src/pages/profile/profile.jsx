import useToken from "../../hooks/useToken";
import {AgencyProfile} from "./agency-profile";
import {TravelerProfile} from "./traveler-profile";
import {Navbar} from "../../components/Navbar/Navbar";

export const Profile = () => {

    const {getUserType} = useToken();

    return (
        <>
            <Navbar/>
            {
                getUserType() === 'agency' ? <AgencyProfile/> : <TravelerProfile/>
            }
        </>
    );
}