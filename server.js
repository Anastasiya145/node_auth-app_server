"use strict";

require("dotenv/config");
const app = require("./src/index");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on the ${process.env.SERVER_URL}`);
});
