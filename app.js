const express = require("express");
const mongodb = require("./db/connect");
const port = process.env.PORT || 300;
const app = express();

app
.use(express.json()) 
.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})
.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB | Listening on ${port}`);
    });
  }
});