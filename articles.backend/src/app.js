const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const articleRoutes = require("./routes/articleRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const commentRoutes = require("./routes/commentRoutes");
const morgan = require("morgan");
const {SWAGGER_ENDPOINT, FRONTEND_URL} = require("./config/environment");

const app = express();

// Middleware
app.use(cors({origin: FRONTEND_URL}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Swagger
app.use("/" + SWAGGER_ENDPOINT, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", [articleRoutes, workspaceRoutes, commentRoutes]);

module.exports = {app, FRONTEND_URL, SWAGGER_ENDPOINT};
