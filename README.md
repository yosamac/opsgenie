# Opsgenie

Alert notification system

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

| Framework | Version    |
| ----------| -----------|
| Node      | 14.XX.XX   |
| NPM       | 6.XX.XX    |
| Docker    | >=19.XX.XX |

### Download and install dependencies

```shell
$ git clone https://github.com/yosamac/opsgenie.git
$ cd opsgenie
$ npm install
```

### Usage

```shell
$ docker-compose up 
$ npm start start:dev
```

## API v1 info

### Swagger


Go to the the API to simulate event launching, can be used with the path: 
[API V1](http://localhost:3000/api)


## General configuration

### Environment variables

| Name                    | Description                                | Default                          |
| ------------------------| ------------------------------------------ | ---------------------------------|
| API_HOST                | API host                                   | `0.0.0.0`                        |
| API_PORT                | API port                                   | `3000`                           |
| ENDPOINT_ROUTE          | Global URL prefix                          | NO DEFAULT VALUE                 |
| NODE_ENV                | Production or development mode             | `development`                    |
| LOGGING_LEVEL           | Logs level                                 | `INFO`                           |
| **Mesh section of other services**                                                                    |||
| EP_MESH_HOST            | EP TCP host                                | `0.0.0.0`                        |
| EP_MESH_PORT            | EP TCP port                                | `4001`                           |
| **Database section**                                                                                  |||
| MONGODB_URI             | Connection database                        | `mongodb://localhost/alert_pager`|


## Running the tests

### Unit tests

```shell
$ npm run test:unit
```

### Integration tests

```shell
$ npm run test
```

## Built With

* [NestJS](https://nestjs.com/) - The web framework used

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.org/yosama/opsgenie/tags).


## Docker

### Generate development Docker image
```shell
$ npm run build:dev-image
```
### Generate production Docker image
```shell
$ npm run build:pro-image
```
### Docker compose
```shell
$ docker-compose up
```

## Roadmap
- [x] Modeling
- [-] Unit tests


## License

[ISC](https://choosealicense.com/licenses/isc/)
