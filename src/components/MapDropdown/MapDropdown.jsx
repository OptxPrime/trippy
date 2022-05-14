import './MapDropdown.css';

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

import {useMap} from "react-leaflet";


export const MapDropdown = ({options, trips}) => {

    const map = useMap();

    const handleChange = (e) => {
    trips.map(({id,city})=>{
        if(id===e.value){
            map.flyTo([city.lat, city.lng], 12);
        }
    });
    }

    return (
    <>
        <Dropdown
            className="dropdown"
            options={options}
            onChange={(e)=>handleChange(e)}
            value={options[0]}
        />
    </>
    );
}