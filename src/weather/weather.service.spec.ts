import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    weatherController = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  describe('getData', () => {
    it('should return weather details for a single location', async () => {
      // Arrange
      const zipCode = '12345';

      const weatherDetails = {
        today: {
          // Today's weather data
        },
        yesterday: {
          // Yesterday's weather data
        },
      };

      jest.spyOn(weatherService, 'weatherDetails').mockResolvedValue(weatherDetails);

      // Act
      const result = await weatherController.getData(zipCode, null, null);

      // Assert
      expect(result).toEqual(weatherDetails);
    });

    it('should handle missing parameters and throw an HttpException', async () => {
      // Act & Assert
      //todo
    });

    // Add more test cases for different scenarios...
  });

  describe('getAllData', () => {
    it('should return weather details for multiple locations', async () => {
      // Arrange
      const locations = ['12345', '40,50', '45,55'];

      const allWeatherDetails = {
        weatherResponse: [
          // Weather data for each location
        ],
      };

      jest.spyOn(weatherService, 'weatherAllDetails').mockResolvedValue(allWeatherDetails);

      // Act
      const result = await weatherController.getAllData(locations, [], []);

      // Assert
      expect(result).toEqual(allWeatherDetails);
    });

    it('should handle missing parameters and throw an HttpException', async () => {
      // Act & Assert
      //todo
    });

    // Add more test cases for different scenarios...
  });
});

