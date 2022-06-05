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
    const [toggleFetch, setToggleFetch] = useState(false);

    const {getUserType, token} = useToken();

    const refreshData = () => {
        setToggleFetch(prevState => !prevState);
    }

    const fetchTrips = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-future-trips`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        return response;
    }

    const fetchRegistrations = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-traveler-registrations`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        return response;
    }

    useEffect(() => {
        let registeredTripIds = new Set();
        if (getUserType() == 'traveler') {
            fetchRegistrations()
                .then((response) => {
                    let registrations = response.data;
                    for (let r of registrations) {
                        registeredTripIds.add(r.tour_id)
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setError("Error fetching registrations!");
                })
        }
        fetchTrips()
            .then((response) => {
                let trips = JSON.parse(response.data);
                let tripsFields = [];
                for (let t of trips) {
                    let o = {trip_id: t.pk, ...t.fields};
                    if (getUserType() == 'traveler' && o.max_travelers) // Registrations are relevant only for traveler. Max_travelers is indicator of GroupTour.
                        o.is_registered = registeredTripIds.has(t.pk); // if current trip is among those for which user registered
                    tripsFields.push(o);
                }
                setTrips(tripsFields);
            })
            .catch((err) => {
                console.log(err);
                setError("Error fetching data!");
            })
    }, [toggleFetch]);

    return (
        <>
            <Navbar/>
            {
                getUserType() === 'traveler' ?
                    <SoloTripModal refreshData={refreshData}/>
                    : <GroupTourModal refreshData={refreshData}/>
            }

            {error ? <p className="text-red-700 m-2"> {error} </p> :
                trips && trips.length ?
                    trips.map((trip) => {
                        return <Trip key={`${trip.id}_${trip.datetime}`} trip={trip} refreshData={refreshData}/>
                    }) : <h2> No past trips </h2>
            }
        </>
    );
}