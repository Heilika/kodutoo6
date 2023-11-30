
import piltSunrise from './sunrise.png';
import piltSunset from './sunset.png';



const WeatherForecast = ({ weather }) => {
    if (!weather || !weather.daily || !weather.daily.time) {
        return <div>No weather data available</div>;
    }
    const convertKmphToMps = (speedKmph) => {
        const speedMps = speedKmph * 1000 / (60 * 60);
        return speedMps.toFixed(1);
    };

    const convertDateStringToHoursAndMinutes = (dateString) => {
        return `${(new Date(dateString)).getHours()}.${(new Date(dateString)).getMinutes()}`;
    };


    <table cellSpacing={24}>
        <thead>
            <tr>
                <th>Prognoos</th>
                <th><img style={{ width: '75px' }} src={piltSunrise} alt="Sunrise" /></th>
                <th><img style={{ width: '75px' }} src={piltSunset} alt="Sunset" /></th>
                <th>Max/Min °C</th>
                <th>Sademed %</th>
                <th>Tuul m/s</th>

            </tr>
        </thead>
        <tbody>
            {weather.daily.time.map((_, i) => (
                <tr>
                    <td>{weather.daily.time[i]}</td>
                    <td>{convertDateStringToHoursAndMinutes(weather.daily.sunrise[i])}/{convertDateStringToHoursAndMinutes(weather.daily.sunset[i])}</td>
                    <td>{weather.daily.temperature_2m_min[i]}/{weather.daily.temperature_2m_max[i]}</td>
                    <td>{weather.daily.precipitation_sum[i]}mm</td>
                    <td>{convertKmphToMps(weather.daily.wind_speed_10m_max[i])}m/s</td>
                </tr>
            ))}
        </tbody>
    </table>

};

export default WeatherForecast;

