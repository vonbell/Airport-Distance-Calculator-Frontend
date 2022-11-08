import React from "react";
import SearchTable from '../components/search-table';
import SearchTable2 from '../components/search-table-2';
import { useState, useEffect } from 'react';

const Distance = (props) => {
    const { data, meta } = props.dataSource;
    const { data2, meta2 } = props.dataSource2;

    const [formState, setFormState] = useState({
        lat1: 0.0,
        lon1: 0.0,
        lat2: 0.0,
        lon2: 0.0
    });

    // const handleChangeLat1 = (evt) => {
    //     setFormState({ lat1: evt.target.value });
    // };

    // const handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     getDistance(formState.lat1, formState.lon1, formState.lat2, formState.lon2);
    //     console.log(getDistance());
    // };

    const getDistance = (lat1, lon1, lat2, lon2) => {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            // if (unit=="K") { dist = dist * 1.609344 }
            // if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    };

    return (
        <div>
            {/* {data2.slice(0, 1).map((row, idx) => (
                <h1 key={row.name + idx}>
                    {row.geoCode.latitude}, {row.geoCode.longitude}
                </h1>
            ))} */}
            
            {/* {data2.slice(0, 1).map((row2, idx2) => (
                <h1 key={row2.name + idx2}>
                    {row2.geoCode.latitude}, {row2.geoCode.longitude}
                </h1>
            ))} */}

            {/* {getDistance(row.geoCode.latitude, row.geoCode.longitude, row2.geoCode.latitude, row2.geoCode.longitude)} */}

            {/* <h1>
                {data.geoCode.latitude}
            </h1> */}
        </div>
    );
};

export default Distance;