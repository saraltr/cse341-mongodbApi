const express = require("express");
const router = express.Router();
const contactsRouter = require("./contacts"); 
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

router.use("/contacts", contactsRouter);

// swagger UI middleware
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;