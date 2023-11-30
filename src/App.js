import { useState } from 'react';

import './App.css';

import WeatherForecast from './WeatherForecast';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(undefined);
  const [selectedLocationWeather, setSelectedLocationWeather] = useState(undefined);
  const [newLocationLatitude, setNewLocationLatitude] = useState('');
  const [newLocationLongitude, setNewLocationLongitude] = useState('');
  const [newLocationName, setNewLocationName] = useState('');
  const [locations, setLocations] = useState ([
    {
      name: 'Tallinn',
      latitude: 59.4370,
      longitude: 24.7536,
    },
    {
      name: 'Bali',
      latitude: -8.4095,
      longitude: 115.1889,
    },
  ]);

  const selectLocation = (location) => {
    setSelectedLocation(location);
    getLocationData(location);
  }

  const getLocationData = async (location) => {
    setIsLoading(true);
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,wind_speed_10m_max&timezone=auto`);
    const dataJson = await data.json();
    setIsLoading(false);
    setSelectedLocationWeather(dataJson);
  }
  const addNewLocation = () => {
    const newLocation = {
      name: newLocationName,
      latitude: parseFloat(newLocationLatitude),
      longitude: parseFloat(newLocationLongitude),
    };
    setLocations([...locations, newLocation]);
    setNewLocationName('');
    setNewLocationLatitude('');
    setNewLocationLongitude('');
  }
  const handleInputChange = (event) => {
    setNewLocationName(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header" style={{ display: 'flex', flexDirection: 'row', gap: 24, padding: 24 }}>
        <div style={{ borderRight: '1px solid gray', padding: '0 24px 0 0' }}>
          <h3>Locations</h3>
          {locations.map((location) => (
            <div key={location.name}>
              <a onClick={() => selectLocation(location)}>{location.name}</a>
            </div>
          ))}
          <h3>New location</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
            type='text'
              placeholder='Name'
              value={newLocationName}
              onChange={handleInputChange}
            />
            <input
              placeholder='Longitude'
              value={newLocationLongitude}
              onChange={(e) => setNewLocationLongitude(e.target.value)}
            />
            <input
              placeholder='Latitude'
              value={newLocationLatitude}
              onChange={(e) => setNewLocationLatitude(e.target.value)}
            />
            <button onClick={addNewLocation}>Add location</button>
          </div>
        </div>
        <div style={{ textAlign: 'left' }}>
          {selectedLocation ? (
            <>
              <h3>Weather forecast {selectedLocation.name}</h3>
              {isLoading ?
                'Laen...' :
                <WeatherForecast weather={selectedLocationWeather} />}
            </>
          ) : (
            <>
              <h3>No weather forecast available</h3>
              <div>Please select a location!</div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
