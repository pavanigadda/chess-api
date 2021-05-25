const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const gameRouter = require("./routes/gameRoutes");
const { swaggerDocs, swaggerUi } = require("./swagger");

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const apiBaseUrl = process.env.API_BASE_URL;
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(`${apiBaseUrl}game`, gameRouter);

module.exports = app;
