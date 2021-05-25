const app = require("./app");

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`App running and listening on port ${port}`);
});
