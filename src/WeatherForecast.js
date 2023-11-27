import React from 'react';
import piltSunrise from './sunrise.png';
import piltSunset from './sunset.png';

function WeatherForecast({ selectedLocationWeather }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.`;
        return formattedDate;
    };

if (selectedLocationWeather && selectedLocationWeather.daily && selectedLocationWeather.daily.length) {
    const startDate = new Date('2023-11-24'); // Date object for November 24th
    const endDate = new Date('2023-11-30'); // Date object for November 30th

    const filteredData = selectedLocationWeather.daily.filter((day) => {
      const dayDate = new Date(day.date);
      return dayDate >= startDate && dayDate <= endDate;
    });
   
    return (
        <table>
            <thead>
                <tr>
                    <td>Prognoos</td>
                    <td><img style={{ width: '75px' }} src={piltSunrise} alt="Sunrise" /></td>
                    <td><img style={{ width: '75px' }} src={piltSunset} alt="Sunset" /></td>
                    <td>Max/Min °C</td>
                    <td>Sademed %</td>
                    <td>Tuul m/s</td>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((day, index) => (
                    <tr key={index}>
                        <td>{formatDate(day.date, 'dddd D. MMM')}</td>
                        <td>{formatDate(day.sunrise, 'HH:mm')}</td>
                        <td>{formatDate(day.sunset, 'HH:mm')}</td>
                        <td align="right">{day.temperature_2m_max} / {day.temperature_2m_min}</td>
                        <td align="right">{day.precipitation_probability_max}</td>
                        <td align="right">{parseFloat(day.wind_speed_10m_max * 1000 / 3600).toFixed(1)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
} else {
    return <div>Ei leitud prognoosi valitud asukohale.</div>;
}
}

export default WeatherForecast;

