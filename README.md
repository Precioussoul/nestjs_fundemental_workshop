<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h2 align="center">I Love Coffee API</h2>

<p align="center">
  A RESTful API for managing coffee products built with NestJS and MongoDB
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@nestjs/core" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NestJS Version" />
  </a>
  <a href="https://www.npmjs.com/package/mongoose" target="_blank">
    <img src="https://img.shields.io/npm/v/mongoose.svg" alt="Mongoose Version" />
  </a>
  <a href="LICENSE" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT" />
  </a>
</p>

## Description

I Love Coffee is a RESTful API built with NestJS and MongoDB, designed to manage coffee products with features like pagination, data validation, and event tracking. This project serves as a practical example of building scalable backend services with modern Node.js technologies.

## Features

- **RESTful API Endpoints** for managing coffee products
- **MongoDB** integration with Mongoose
- **Data Validation** using class-validator and class-transformer
- **Pagination** support for listing endpoints
- **Event-driven architecture** for tracking recommendations
- **Docker** setup for easy development and deployment
- **TypeScript** for type safety and better developer experience

## Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MongoDB (local or remote instance)
- Docker (optional, for containerized development)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/i-luv-coffee.git
   cd i-luv-coffee
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/coffee_shop
   PORT=3000
   ```

4. **Run MongoDB using Docker (optional)**
   ```bash
   docker-compose up -d
   ```

5. **Start the development server**
   ```bash
   # development
   yarn run start:dev
   ```

## API Endpoints

### Coffees

- `GET /coffees` - Get all coffees (supports pagination)
- `GET /coffees/:id` - Get a specific coffee
- `POST /coffees` - Create a new coffee
- `PATCH /coffees/:id` - Update a coffee
- `DELETE /coffees/:id` - Delete a coffee

## Development

```bash
# Build the project
yarn build

# Run in development mode with watch
yarn start:dev

# Run production build
yarn start:prod
```

## Testing

```bash
# Run unit tests
yarn test

# Run e2e tests
yarn test:e2e

# Test coverage
yarn test:cov
```

## Linting

```bash
# Lint code
yarn lint

# Format code
yarn format
```

## Docker Support

Build and run the application with Docker:

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- The NestJS application on port 3000

## API Documentation

Once the application is running, you can access the API documentation at:
- `http://localhost:3000/api` (if you have Swagger/OpenAPI set up)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is [MIT licensed](LICENSE).

## Acknowledgements

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js