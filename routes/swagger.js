const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "MongoDb contacts list API"
    },
    host: "cse341-contacts-mlih.onrender.com",
    schemes: ["https"]
};

const output = "./routes/swagger.json"; // output Swagger JSON file
const endpoint = ["./routes/index.js"]; 

// generate swagger.json
swaggerAutogen(output, endpoint, doc);