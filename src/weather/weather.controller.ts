import { Controller,Body, HttpCode, Get, HttpStatus, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
    constructor ( private weatherService: WeatherService){}

    @HttpCode(HttpStatus.OK)
    //@Public() // this is excluded from auth guard
    @Get('/ByZip')
getData(
    @Query('zipCode') queryParam1: string = 'default1',
    @Query('lat') queryParam2: number = null,
    @Query('long') queryParam3: number = null,
    ): Record<string, any> {
        return this.weatherService.weatherDetails(queryParam1,queryParam2,queryParam3)
    }

}
