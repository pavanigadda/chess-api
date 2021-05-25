# Chess as a Server API
Provide REST endpoints to create and interact with Chess game logic

## Running Locally

#### Prerequisites

* [Node JS](https://nodejs.org/en/)
* [Mongo DB](https://www.mongodb.com) (For simplicity purposes, I have created a mongo DB Atlas account and created a cluster and collection. Please feel free to use the Mongo DB credentials shared in the config.env file)

#### 1. Clone/download the repo and install dependencies
```bash
cd chess-api
npm i
```

#### 2. Modify the .env file
Feel free to use the existing credentials or create your own

#### 3. Start the server
To run with nodemon
```bash
npm run start:dev
```

To run without nodemon
```bash
npm start
```
#### 4. Open Swagger UI from the browser to play with API
Navigate to http://localhost:9001/api-docs/ to load Swagger UI from your browser