const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const {SWAGGER_ENDPOINT, FRONTEND_URL} = require("./config/environment");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const articleRoutes = require("./routes/article.routes");
const workspaceRoutes = require("./routes/workspace.routes");
const commentRoutes = require("./routes/comment.routes");
const versionRoutes = require("./routes/version.routes");

const app = express();

// Middleware
app.use(cors({origin: FRONTEND_URL}));
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Swagger
app.use("/" + SWAGGER_ENDPOINT, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", [articleRoutes, workspaceRoutes, commentRoutes, versionRoutes]);

module.exports = {app, FRONTEND_URL, SWAGGER_ENDPOINT};
