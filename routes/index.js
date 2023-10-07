const express = require("express");
const router = express.Router();
const contactsRouter = require("./contacts");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

router.use("/contacts", contactsRouter);

// swagger JSON middleware with custom Content-Type header
router.get("/swagger.json", (req, res, next) => {
  res.setHeader("Content-Type", "application/json"); // set the Content-Type header
  next(); // continue to serve the Swagger JSON file
}, (req, res) => {
  res.sendFile("swagger.json", { root: __dirname });
});

// Swagger UI middleware
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
