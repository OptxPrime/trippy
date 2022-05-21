import {useState} from "react";

import {Trip} from "../../components/Trip/Trip";
import {Navbar} from "../../components/Navbar/Navbar";
import {SoloTripModal} from "../../components/Modals/SoloTripModal/SoloTripModal";
import useToken from "../../hooks/useToken";

const mockTrips = [
    {
        variant: 'solo',
        status: 'accepted',
        checkedIn: true,
        title: 'Summer in Sarajevo 2021',
        // image: '',
        description: 'Visit Sarajevo in June 2021 and have the best experience in your life.',
        date: new Date(2022, 11, 4),
        transport: ['plane', 'bus'],
    },
    {
        variant: 'group',
        capacity: 100,
        checkedIn: false,
        currentTravelers: 26,
        // status: 'rejected',
        title: 'Tomorrowland in Berlin 2022',
        // image: '',
        description: 'Enjoy in largest music festivale in Europe',
        date: new Date(2021, 5, 4),
        transport: ['plane'],
    },
    {
        variant: 'group',
        capacity: 100,
        checkedIn: false,
        currentTravelers: 99,
        // status: 'canceled',
        title: 'Africa tour 2020',
        // image: '',
        description: 'Three-month tour in Africa',
        date: new Date(2020, 11, 3),
        transport: ['plane', 'bus', 'ship'],
    }
]

export const FutureTrips = () => {
    const [trips, setTrips] = useState(mockTrips);
    const {getUserType} = useToken();

    return (
        <>
            <Navbar/>
            {
                getUserType() === 'traveler' ? <SoloTripModal/> : null
            }

            {
                trips.map((trip) => {
                    return <Trip trip={trip}/>
                })
            }
        </>
    );
}