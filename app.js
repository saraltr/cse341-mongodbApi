const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const { initDb } = require("./db/connect");

app.use("/", require("./routes"));

initDb((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  } else {
    console.log("Connected to MongoDB");
  }
});

app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});
