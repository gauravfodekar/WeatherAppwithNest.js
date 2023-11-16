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
                    appid: 'c6d3904f065baa14b9245f8e48dcadae',
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
                    appid: 'c6d3904f065baa14b9245f8e48dcadae',
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

    async weatherAllDetails(allLocations: any ): Promise<Object> {  
            
      let weatherResponse: any;
       // Get current weather
        try{
          allLocations = allLocations.replace(/'/g, '"');
          allLocations = JSON.parse(allLocations);
          const weatherResponses = await Promise.all(allLocations.map( async (location: any): Promise<any> => {
            return await axios.get('https://api.openweathermap.org/data/2.5/weather', {
              params: {
                q: location,
                appid: 'c6d3904f065baa14b9245f8e48dcadae',
              },
            });
          }));
          weatherResponse = weatherResponses.map(response => response.data);
        }catch(error){
          throw new HttpException('Please provide either a correct ZIP code or latitude and longitude.', HttpStatus.NO_CONTENT);
        }       

        return { weatherResponse };
    
}
}
