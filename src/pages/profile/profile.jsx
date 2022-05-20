import useToken from "../../hooks/useToken";
import {AgencyProfile} from "./agency-profile";
import {TravelerProfile} from "./traveler-profile";

export const Profile = () => {

    const {getUserType} = useToken();
    const userType = getUserType();

    return (
        <>
            {
                userType === 'agency' ? <AgencyProfile/> : <TravelerProfile/>
            }
        </>
    );
}