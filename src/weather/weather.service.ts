import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {

    async weatherDetails(zipCode: string, lat: number, long: number): Promise<Object> {  
            
            let currentWeatherResponse: any;
            let historicalWeatherResponse: any;
             // Get current weather
              try{
                currentWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                  params: {
                    zip:zipCode,
                    lat,
                    lon:long,
                    appid: process.env.WEATHER_API_KEY,
                  },
                });
              }catch(error){
                throw new HttpException('Please provide either a ZIP code or latitude and longitude.', HttpStatus.NO_CONTENT);
              }

              const currentWeatherData = currentWeatherResponse.data;

              // Get historical weather for yesterday
              const yesterdayDate = new Date();
              yesterdayDate.setDate(yesterdayDate.getDate() - 1);

              try {
                historicalWeatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/onecall/timemachine', {
                  params: {
                    lat: lat || currentWeatherData.coord.lat,
                    lon: long || currentWeatherData.coord.lon,
                    dt: Math.floor(yesterdayDate.getTime() / 1000),
                    appid: process.env.WEATHER_API_KEY,
                  },
                });
              }catch(error){
                console.log(`unable to fetch yesterday's data as it requires paid plan`);
                historicalWeatherResponse = null;
              }

              const yesterdayWeatherData = historicalWeatherResponse ? historicalWeatherResponse.data.current: 'NO DATA AVAILABLE'

              return {
                today: currentWeatherData,
                yesterday: yesterdayWeatherData,
              };
          
    }

    async weatherAllDetails(zipCode:any ,lat: any, long: any, country: string ): Promise<Object> {  
            
      let weatherResponse: any;
       // Get current weather
        try{
          zipCode = zipCode ? zipCode.split(','): []
          lat = lat ? lat.split(','): [];
          long = long ? long.split(','): [];
          
          // get the data against zip codes
          if(zipCode.length) {
            zipCode = zipCode.map( (zip: any) => `${zip},${country? country : 'us'}`);
            const weatherResponses = await Promise.all(zipCode.map( async (location: any): Promise<any> => {
              return await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                  params: {
                    zip:location,
                    appid: process.env.WEATHER_API_KEY,
                  },
                });
            }));
            weatherResponse = weatherResponses.map(response => response.data);
          }
          //get data for bulk latt and long.
          if ((lat.length && long.length)&& (lat.length === long.length)) {
            const weatherResponses = await Promise.all(lat.map( async (latitude: any, index: number): Promise<any> => {
              return await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                  lat: latitude,
                  lon:long[index],
                  appid: process.env.WEATHER_API_KEY,
                },
              })
            }));
            weatherResponse = weatherResponses.map(response => response.data);
          }
         
        }catch(error){
          throw new HttpException('Please provide either a correct ZIP code or latitude and longitude.', HttpStatus.NO_CONTENT);
        }       

        return { weatherResponse };
    
}
}
