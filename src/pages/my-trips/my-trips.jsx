import {useState, useEffect} from "react";
import axios from "axios";

import {Trip} from "../../components/Trip/Trip";
import {Navbar} from "../../components/Navbar/Navbar";
import {SearchInput} from "../../components/SearchInput/SearchInput";
import useToken from "../../hooks/useToken";


export const MyTrips = () => {

    const [trips, setTrips] = useState([]);
    const [allTrips, setAllTrips] = useState([]);
    const [error, setError] = useState('');
    const {token} = useToken();

    const fetchTrips = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-my-trips`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        return response;
    }

    const handleSearch = (query) => {
        if (!query) {
            setTrips(allTrips);
            return;
        }
        let newTrips = allTrips.filter((trip) => {
            return (
                (trip.title + trip.description) // // search in title and description
                    .toString()
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) > -1
            );
        });
        setTrips(newTrips);
    }

    useEffect(() => {
        fetchTrips()
            .then((response) => {
                let trips = JSON.parse(response.data);
                let tripsFields = [];
                for (let t of trips) {
                    tripsFields.push({id: t.pk, ...t.fields});
                }
                setTrips(tripsFields);
                setAllTrips(tripsFields);
            })
            .catch((err) => {
                console.log(err);
                setError("Error fetching data!");
            })
    }, []);

    return (
        <>
            <Navbar/>
            <SearchInput handleSearch={handleSearch}/>
            {error ? <p className="text-red-700 m-2"> {error} </p> :
                trips && trips.length ?
                    trips.map((trip) => {
                        return <Trip key={`${trip.id}_${trip.datetime}`} trip={trip}/>
                    }) : <h2> No past trips </h2>
            }
        </>
    );
}