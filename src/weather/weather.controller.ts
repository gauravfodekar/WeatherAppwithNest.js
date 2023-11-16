import { Controller,Body, HttpCode, Get, HttpStatus, Query, HttpException } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller()
export class WeatherController {
    constructor ( private weatherService: WeatherService){}

    @HttpCode(HttpStatus.OK)
    //@Public() // this is excluded from auth guard
    @Get('weather')
    getData(
        @Query('zipCode') zipCode: string,
        @Query('lat') lat: number,
        @Query('long') long: number,
        ): Record<string, any> {
            if (!zipCode && (!lat || !long)) {
                throw new HttpException('Please provide either a ZIP code or latitude and longitude.', HttpStatus.BAD_REQUEST);
            }
            return this.weatherService.weatherDetails(zipCode,lat,long)
    }

    @Get('weather-for-all')
    getAllData(
        @Query('zipCode') zipCode: Array<any>=[],
        @Query('lat') lat: Array<any>=[],
        @Query('long') long:Array<any>=[],
        ): Record<string, any> {
            if (!zipCode.length && (!lat.length || !long.length)) {
                throw new HttpException('Please provide either a ZIP code or latitude and longitude.', HttpStatus.BAD_REQUEST);
            }
             // Combine all locations into a single array
         // Combine all locations into a single array
            const allLocations = zipCode.concat(lat.map((lat, index) => `${lat},${long[index]}`));
            return this.weatherService.weatherAllDetails(allLocations);
    }

}
