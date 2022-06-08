import './MapDropdown.css';

import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

import {useMap} from "react-leaflet";

export const MapDropdown = ({options, trips}) => {

    const map = useMap(); // important: https://stackoverflow.com/questions/65171337/how-to-get-map-properties-and-handle-events-in-leaflet-v3-with-react-redux

    const handleChange = (e) => {
    trips.map(({id, lat, lng}) => {
        if (id === e.value) {
            map.flyTo([lat, lng], 12);
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