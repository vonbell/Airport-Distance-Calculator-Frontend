import axios from 'axios';
const CancelToken = axios.CancelToken;

// Function allows ability to make GET request to backend with params we need
// async getAmadeusData(params) {
export const getAmadeusData = params => {
 
    // Destructuring params
    const { keyword = "", page = 0, city = true, airport = true, countryCode = 'US', locationId = "" } = params;

    // Checking for proper subType 
    const subTypeCheck = city && airport ? "CITY,AIRPORT" : city ? "CITY" : airport ? "AIRPORT" : "";

    // Amadeus API require at least 1 character, so with this we can be sure that we can make this request
    const searchQuery = keyword ? keyword : "";

    // This is extra tool for cancelation request, to avoid overload API 
    const source = CancelToken.source();
    const source2 = CancelToken.source();

    // GET request with all params we need
    const out = axios.get(
        `/airports/?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}&countryCode=${countryCode}`,
        {
            cancelToken: source.token
        }
    );

    const out2 = axios.get(
        `/airports/?keyword=${searchQuery}&page=${page}&subType=${subTypeCheck}&countryCode=${countryCode}`,
        {
            cancelToken2: source2.token
        }
    );

    return { out, source, out2, source2 };
};
