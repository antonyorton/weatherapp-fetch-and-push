//function to extract weather data from weatherapi.com

import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

//get API key from environment variable
const API_KEY = process.env.WEATHERAPI_API_KEY

//a list of 42 international cities including Sydney with their respective latitude and longitude
export const cities = [
  { name: 'Sydney', lat: -33.865143, lon: 151.2099 },
  { name: 'Melbourne', lat: -37.814, lon: 144.96332 },
  { name: 'Brisbane', lat: -27.470125, lon: 153.021072 },
  { name: 'Perth', lat: -31.950527, lon: 115.860457 },
  { name: 'Adelaide', lat: -34.92818, lon: 138.59993 },
  { name: 'Gold Coast', lat: -28.00029, lon: 153.43088 },
  { name: 'Newcastle', lat: -32.92667, lon: 151.77647 },
  { name: 'Canberra', lat: -35.28346, lon: 149.12807 },
  { name: 'Wollongong', lat: -34.424, lon: 150.893 },
  { name: 'Geelong', lat: -38.14711, lon: 144.36069 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Berlin', lat: 52.52, lon: 13.405 },
  { name: 'Rome', lat: 41.9028, lon: 12.4964 },
  { name: 'Madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Amsterdam', lat: 52.3702, lon: 4.8952 },
  { name: 'Vienna', lat: 48.2082, lon: 16.3738 },
  { name: 'Athens', lat: 37.9838, lon: 23.7275 },
  { name: 'Stockholm', lat: 59.3293, lon: 18.0686 },
  { name: 'Oslo', lat: 59.9139, lon: 10.7522 },
  { name: 'Copenhagen', lat: 55.6761, lon: 12.5683 },
  { name: 'Moscow', lat: 55.7558, lon: 37.6176 },
  { name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
  { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { name: 'Seoul', lat: 37.5665, lon: 126.978 },
  { name: 'Bangkok', lat: 13.7563, lon: 100.5018 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Kuala Lumpur', lat: 3.139, lon: 101.6869 },
  { name: 'Jakarta', lat: -6.2088, lon: 106.8456 },
  { name: 'Manila', lat: 14.5995, lon: 120.9842 },
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
  { name: 'Toronto', lat: 43.651, lon: -79.347 },
  { name: 'Mexico City', lat: 19.4326, lon: -99.1332 },
  { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
  { name: 'Buenos Aires', lat: -34.6037, lon: -58.3816 },
  { name: 'Santiago', lat: -33.4489, lon: -70.6693 },
  { name: 'Lima', lat: -12.0464, lon: -77.0428 },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241 },
  { name: 'Nairobi', lat: -1.2864, lon: 36.8172 },
  { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 }
]

export async function fetchWeatherData(API_KEY, city) {
  //construct the URL for the API request for current weather
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`

  try {
    const response = await fetch(url)
    const data = await response.json()

    //extract the current weather data for the city
    //{city, datetime, temp_c, pressure_mb, humidity, air_quality_pm2_5}
    const current = {
      city: city,
      country: data.location.country,
      datetime: data.current.last_updated,
      temp_c: data.current.temp_c,
      pressure_mb: data.current.pressure_mb,
      humidity: data.current.humidity,
      wind_kph: data.current.wind_kph,
      air_quality_pm2_5: data.current.air_quality.pm2_5
    }
    return current
  } catch (error) {
    console.log(error)
  }
}

// //test getWeatherData function for all cities
// cities.forEach(async (city, index) => {
//   const data = await fetchWeatherData(API_KEY, city.name)
//   console.log(data)
// })
