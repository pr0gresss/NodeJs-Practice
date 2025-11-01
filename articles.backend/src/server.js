const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const articleRoutes = require('./routes/articleRoutes');

const PORT = process.env.PORT || 3000;
const SWAGGER_URL = '/swagger.html';

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', articleRoutes);

app.listen(PORT, () => {
	console.log(`✅ Server running at http://localhost:${PORT}`);
	console.log(
		`📘 Swagger docs available at http://localhost:${PORT}${SWAGGER_URL}`
	);
});
