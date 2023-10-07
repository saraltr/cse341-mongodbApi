const express = require("express");
var cors = require("cors");
const port = process.env.PORT || 300;
const app = express();

const { initDb } = require('./db/connect');

initDb((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MongoDB");
  }
});

app
.use(cors())
.use(express.json())
.use("/", require("./routes"))
.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "https://cse341-contacts-frontend.netlify.app");
  res.setHeader("Access-Control-Allow-headers", 
  "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
  res.setHeader("Content-Type", 
  "application/json");
  next();
})
.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});