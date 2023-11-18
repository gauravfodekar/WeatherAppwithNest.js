<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
 This is a weather App using nest js. You can connect this with local mongodb /Atlas database.
 Change the url in .env file for your database connection.
 App has below api endpoints to execute your requests.

 # sign up API
 ```bash
 $ POST: http://localhost:3000/users/sinup
 $ payload  {
    "username": "gaurav",
    "pass": "amazing"  }

 ```
 # login API to get token
 ```bash
 $ POST: http://localhost:3000/auth/login
 $ payload  {
    "username": "gaurav",
    "pass": "amazing"  }

 ```
 # logout API 
 ```bash
 $ POST: http://localhost:3000/auth/logout
 $ payload  {
    "token": "xsdajdasjdaljd" }
  ```

 # API to get weather for ZIP code/ lat and long

  to get weather for zip code , user need to send country code with it.
 ```bash
 $ data for zip code
 $  GET: http://localhost:3000/weather
 $ example GET: http://localhost:3000/weather?zipCode=442001,in

 $ data for lat and long 
 $ GET: http://localhost:3000/weather?lat=40.7128&long=74.0060
 $ response {
    "today": {
        "coord": {
            "lon": 74.006,
            "lat": 40.7128
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04n"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 266.33,
            "feels_like": 266.33,
            "temp_min": 266.33,
            "temp_max": 266.33,
            "pressure": 1022,
            "humidity": 50,
            "sea_level": 1022,
            "grnd_level": 635
        },
        "visibility": 10000,
        "wind": {
            "speed": 0.38,
            "deg": 171,
            "gust": 0.96
        },
        "clouds": {
            "all": 100
        },
        "dt": 1700311503,
        "sys": {
            "country": "KG",
            "sunrise": 1700272419,
            "sunset": 1700307880
        },
        "timezone": 21600,
        "id": 8145969,
        "name": "Kara-Kulja",
        "cod": 200
    },
    "yesterday": "NO DATA AVAILABLE"
}

 ```
# to get weather for all API
User needs to pass 
Either-zipCode in the query params (comma separated values) and country(non mandatory, default value is 'us')
or  -  lat and long (comma separated values)
```bash
$ GET:  http://localhost:3000/weather-for-all
$ for multiple zip 
$ example 
$  lat and long GET: http://localhost:3000/weather-for-all?lat=40.7128,-33.8688&long=74.0060,151.2093
$  zip code: GET http://localhost:3000/weather-for-all?zipCode=442001,440027&country=in
$ response: {
    "weatherResponse": [
        {
            "coord": {
                "lon": 78.6899,
                "lat": 20.7637
            },
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 297.35,
                "feels_like": 297.11,
                "temp_min": 297.35,
                "temp_max": 297.35,
                "pressure": 1013,
                "humidity": 49,
                "sea_level": 1013,
                "grnd_level": 986
            },
            "visibility": 10000,
            "wind": {
                "speed": 1.85,
                "deg": 54,
                "gust": 2.01
            },
            "clouds": {
                "all": 0
            },
            "dt": 1700312901,
            "sys": {
                "country": "IN",
                "sunrise": 1700269008,
                "sunset": 1700309042
            },
            "timezone": 19800,
            "id": 0,
            "name": "Paunoor",
            "cod": 200
        },
        {
            "coord": {
                "lon": 78.9228,
                "lat": 21.0903
            },
            "weather": [
                {
                    "id": 721,
                    "main": "Haze",
                    "description": "haze",
                    "icon": "50n"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 299.11,
                "feels_like": 299.11,
                "temp_min": 299.11,
                "temp_max": 299.11,
                "pressure": 1015,
                "humidity": 57
            },
            "visibility": 3000,
            "wind": {
                "speed": 1.03,
                "deg": 60
            },
            "clouds": {
                "all": 0
            },
            "dt": 1700312901,
            "sys": {
                "type": 1,
                "id": 9069,
                "country": "IN",
                "sunrise": 1700268983,
                "sunset": 1700308956
            },
            "timezone": 19800,
            "id": 0,
            "name": "Vishwakarma Nagar",
            "cod": 200
        }
    ]
}

```


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
# add your database connection 
in .env file add your mongodb/atlas url in DB_URI

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
