// config/swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Emmaculate School API",
      version: "1.0.0",
      description: "API documentation for Emmaculate School backend",
    },
    servers: [
      {
        url: "http://localhost:8765",
      },
    ],
  },
  apis: ["./routes/*.js"], // Point to your route files
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
