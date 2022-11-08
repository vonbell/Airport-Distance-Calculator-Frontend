import React from 'react';
import { useState, useEffect } from 'react';
import SearchTable from '../components/search-table';
import SearchTable2 from '../components/search-table-2';
import SearchAutocomplete from '../components/search-autocomplete';
import SearchAutocomplete2 from '../components/search-autocomplete-2';
import { getAmadeusData } from '../api/amadeus.api';
import axios from 'axios';
import SearchCheckboxes from '../components/search-checkboxes';
import SearchCheckboxes2 from '../components/search-checkboxes-2';
import { getDistance } from '../components/distance-form';
import Distance from '../components/distance-form';

// Main component 
const SearchRoot = () => {

    /* 
        With new React API we can define state in functional component like this *React.useState*
        1. first element in destructured array - state itself
        2. second element - dispatch func, that allows us to change state
        3. we can create as many states as we need
    */

    const [search, setSearch] = useState({
        keyword: "a",
        city: true,
        airport: true,
        page: 0
    });

    const [search2, setSearch2] = useState({
        keyword: "a",
        city: true,
        airport: true,
        page: 0
    });
  
    const [dataSource, setDataSource] = useState({
        meta: { count: 0 },
        data: []
    });

    const [dataSource2, setDataSource2] = useState({
        meta: { count: 0 },
        data: []
    });
  
    const [loading, setLoading] = useState(false)
  
    /* 
        Also React has lifecycle methods. On of them is *useEffect* - the same as ComponentDidMount | ComponentDidUpdate | ComponentWillUnmount in class components 
        1. First argument is callback func, we define there all logic we need to execute when component mounts
        2. Second argument - array of dependencies. If one of them changing - we executing callback func again
        ** If Array is empty - callback will execute only once, when mount
        ** If you not including second argument - callback will execute each time, when component will change
        3. We can create as many *useEffect* funcs, as we need
    */
   
    useEffect(() => {
        // Turn on loader animation
        setLoading(true);

        /* Getting data from amadeus api.
            out - our data that coming from backend.
            source - token for cancelation request.
        */

        const { out, source } = getAmadeusData(search);

        out.then(res => {
            // If we send too many request to the api per second - we will get an error and app will break
            // Therefore we implemented simple check to prevent error on client side.
            if (!res.data.code) {
                setDataSource(res.data); // dispatching data to components state
            }
            setLoading(false)
        }).catch(err => {
            axios.isCancel(err);
            setLoading(false)
        });

        // If we returning function from *useEffect* - then this func will execute, when component will unmount
        return () => {
            source.cancel()
        };
    }, [search]);

    useEffect(() => {
        setLoading(true);
        const { out2, source2 } = getAmadeusData(search2);

        out2.then(res => {
            if (!res.data.code) {
                setDataSource2(res.data); // dispatching data to components state
            }
            setLoading(false)
        }).catch(err => {
            axios.isCancel(err);
            setLoading(false)
        });

        return () => {
            source2.cancel()
        };
    }, [search2]);

    const getDistance = (lat1, lon1, lat2, lon2) => {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        } else {
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
        <div className="container">

            <div className="search-panel">
                <SearchAutocomplete search={search} setSearch={setSearch} />
                <SearchAutocomplete2 search2={search2} setSearch2={setSearch2} />
                {/* <SearchCheckboxes search={search} setSearch={setSearch} /> */}
            </div>

            <div className="search-panel">
                <SearchTable dataSource={dataSource} search={search} setSearch={setSearch} loading={loading} />
                <SearchTable2 dataSource2={dataSource2} search2={search2} setSearch2={setSearch2} loading={loading} />
            </div>

            <Distance dataSource={dataSource} dataSource2={dataSource2} />
        </div>
    );
};
  
export default SearchRoot;