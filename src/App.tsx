import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

export const App = () => {
    const [inputVal, setInputVal] = useState<string>('');
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState<any>();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function getWeather() {
            try {
                setWeather(await fetchWeather(query));
            } catch (err: any) {
                setError('Error retrieving the weather');
            }
            setInputVal('');
            setLoading(false);
        }

        if (query) {
            getWeather();
        }
    }, [query])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (error) setError('');
        setInputVal(event.target.value);
    }

    const handleSearch = () => {
        if (error) setError('');
        setLoading(true);
        setQuery(inputVal);
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query !== inputVal) handleSearch(); 
    }

    return (
        <div className='main-container'>
            <input type="text" className='search' placeholder='location' value={inputVal} onChange={handleInputChange} onKeyPress={handleKeyPress} />
            <button type='button' onClick={handleSearch} disabled={loading || inputVal === query}>Search</button>
            {loading && <h1>loading</h1>}
            {error && <h1>{error}</h1>}
            {weather?.main && (
                <div className='city'>
                    <h2 className='city-name'>
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className='city-temp'>
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="city-info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}