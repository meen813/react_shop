import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const WeatherComponent = () => {
    const { data, isLoading, isError, error, refetch } = useQuery('weather', async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=e4b1c39e341c56c2d577a97978a5b29a`);
        return response.data;
    });

    const [zipcode, setZipcode] = useState('90638'); // city state 추가

    useEffect(() => {
        // Define refetch function to avoid ESLint error
        const fetchData = async () => {
            if (refetch) { // Check if refetch is defined before calling it
                await refetch();
            }
        };
        fetchData();
    }, [zipcode, refetch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const { name, main, weather: weatherInfo } = data;
    const { temp, humidity } = main;
    const { description } = weatherInfo[0];
    const tempFahrenheit = Math.round((temp - 273.15) * 9/5 + 32);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }} >
            <p style={{ marginRight: '16px' }}> {name}</p>
            <p style={{ marginRight: '16px' }}>{description}</p>
            <p style={{ marginRight: '16px' }}>Temp: {tempFahrenheit}°F</p>
            <p style={{ marginRight: '16px' }}>Humidity: {humidity}%</p>
            <label style={{ marginRight: '5px' }}>City:</label>
            <div >
                <select value={zipcode} onChange={(e) => setZipcode(e.target.value)}> {/* city state와 onChange 이벤트 추가 */}
                    <option value="90638">La Mirada</option>
                    <option value="90035">Los Angeles</option>
                    <option value="94088">Sunnyvale</option>
                </select>
            </div>
        </div>
    );
};

export default WeatherComponent;
