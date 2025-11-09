const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const articleRoutes = require("./routes/articleRoutes");
const morgan = require("morgan");

// Envs
const PORT = process.env.PORT || 3000;
const SWAGGER_URL = process.env.SWAGGER_URL || "docs";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4200";

const app = express();

// Middleware
app.use(cors({origin: FRONTEND_URL}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Swagger
app.use("/" + SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", articleRoutes);

module.exports = {app, PORT, FRONTEND_URL, SWAGGER_URL};