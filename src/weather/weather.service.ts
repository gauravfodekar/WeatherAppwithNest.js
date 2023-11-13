import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {

    async weatherDetails(queryParam1: string, queryParam2: number, queryParam3: number): Promise<Object> {
        try {
            const zipCode = queryParam1;
            if(queryParam1) {
                const zipCodeArray = queryParam1.split(',');
                const zip = zipCodeArray[0];
                //if no country code is selected by default it is US
                const countryCode = zipCodeArray[1] ? zipCodeArray[1] : 'us';
                const response = await axios.get(`api.openweathermap.org/data/2.5/forecast?zip=${zip},${countryCode}&appid=439d4b804bc8187953eb36d2a8c26a02`);
                return response.data;
            }
            // Based on the query params make api call to fetch weather
            
          } catch (error) {
            // Handle errors
            console.error('Error fetching data:', error.message);
            throw error;
          }
    }
}
