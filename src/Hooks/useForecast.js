import {useState} from 'react';
import axios from 'axios';

import getCurrentDayForecast from '../helpers/getCurrentDayForecast'
import getDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast'
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast'


const BASE_URL = 'https://www.metaweather.com/api/location'
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com'
const REQUEST_URL = CROSS_DOMAIN+'/'+BASE_URL;

//using "use", react knows it will be a hook
const useForecast = () => {
    const [isError,setError] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [forecast,setForecast] = useState(null)

    const getWoeid = async (location) => {
        //get woe id
        const data = await axios(REQUEST_URL+'/search', { params:{ query: location } });
        // get weather
        console.log(data)

        if(!data || data.data.length === 0){
            setError('There is no such location');  
            setLoading(false);
            return;  
        }

        return data.data[0];
    }

    const getForecastData = async (woeid) => {
        // console.log(data.data[0].woeid)
        const response = await axios(REQUEST_URL+"/"+woeid);
        if(!response || response.length ===0){
            setError('Something went wrong'); 
            setLoading(false);
            return;  
        }

        return response.data;
    }

    const gatherForcastData = (data) => {
        // data formatters
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title);
        const currentDayDetails = getDayDetailedForecast(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

        setForecast({currentDay, currentDayDetails, upcomingDays});
        setLoading(false);

    }

    //api call (MetaWeather)
    const submitRequest = async location => {
        setLoading(true);
        setError(false);

        const response = await getWoeid(location);
        if(!response?.woeid) return;

        const data = await getForecastData(response.woeid);
        if(!data) return;

        gatherForcastData(data);

    };


    return{
        isError, isLoading, forecast, submitRequest 
    }


};

export default useForecast;