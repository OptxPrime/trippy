import {useEffect, useState} from "react";
import axios from "axios";

import {Trip} from "../../components/Trip/Trip";
import {Navbar} from "../../components/Navbar/Navbar";
import {SoloTripModal} from "../../components/Modals/SoloTripModal/SoloTripModal";
import useToken from "../../hooks/useToken";
import {GroupTourModal} from "../../components/Modals/GruopTourModal/GroupTourModal";


export const FutureTrips = () => {

    const [trips, setTrips] = useState([]);
    const [error, setError] = useState('');
    const {getUserType, token} = useToken();


    const fetchTrips = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-future-trips`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        return response;
    }

    useEffect(() => {
        fetchTrips()
            .then((response) => {
                let trips = JSON.parse(response.data);
                let tripsFields = [];
                for (let t of trips) {
                    tripsFields.push(t.fields);
                }
                setTrips(tripsFields);
            })
            .catch((err) => {
                console.log(err);
                setError("Error fetching data!");
            })
    }, []);

    return (
        <>
            <Navbar/>
            {
                getUserType() === 'traveler' ? <SoloTripModal/> : <GroupTourModal/>
            }

            {error ? <p className="text-red-700 m-2"> {error} </p> :
                trips && trips.length ?
                    trips.map((trip) => {
                        return <Trip trip={trip}/>
                    }) : <h2> No past trips </h2>
            }
        </>
    );
}