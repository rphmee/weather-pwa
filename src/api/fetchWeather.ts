import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async (query: string) => {
    return axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log('err', err)
        throw Error(err.message);
    })
}