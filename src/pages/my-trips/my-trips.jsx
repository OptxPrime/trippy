import {useNavigate} from "react-router-dom";
import {useState} from "react";

import {Trip} from "../../components/Trip/Trip";
import {Navbar} from "../../components/Navbar/Navbar";

const mockTrips = [
        {
            title:'Summer in Sarajevo 2021',
            // image: '',
            description: 'Visit Sarajevo in June 2021 and have the best experience in your life.',
            date: new Date(2022,11,4),
            transport: ['plane','bus'],
        },
        {
            title:'Tomorrowland in Berlin 2022',
            // image: '',
            description: 'Enjoy in largest music festivale in Europe',
            date: new Date(2021,5,4),
            transport: ['plane'],
        },
        {
            title:'Africa tour 2020',
            // image: '',
            description: 'Three-month tour in Africa',
            date: new Date(2020,11,3),
            transport: ['plane','bus','ship'],
        }
    ]

export const MyTrips = () => {
    const [trips,setTrips] = useState(mockTrips);

    return (
    <>
        <Navbar/>
        {
            trips.map((trip)=>{
                return <Trip trip={trip}/>
            })
        }
    </>
    );
}