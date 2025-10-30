const ArticleService = require('../services/articleService');

exports.handleRequest = async (req, res) => {
	const { method, url } = req;

  // Adding CORS
  setCORSHeaders(res);

	if (method === 'OPTIONS') {
		res.writeHead(204, {
			'Access-Control-Allow-Origin': 'http://localhost:4200',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': 86400, // cache preflight
		});
		res.end();
		return;
	}

	// Parse URL
	const [_, resource, id] = url.split('/');

	// GET /articles
	if (method === 'GET' && resource === 'articles' && !id) {
		const articles = ArticleService.getAll();
		return sendJSON(res, 200, articles);
	}

	// GET /articles/:id
	if (method === 'GET' && resource === 'articles' && id) {
		const article = ArticleService.getById(id);
		if (!article) return sendJSON(res, 404, { error: 'Article not found' });
		return sendJSON(res, 200, article);
	}

	// POST /articles
	if (method === 'POST' && resource === 'articles') {
		let body = '';
		req.on('data', chunk => (body += chunk));
		req.on('end', () => {
			try {
				const data = JSON.parse(body);
				const article = ArticleService.create(data);
				sendJSON(res, 201, article);
			} catch (err) {
				sendJSON(res, 400, { error: err.message });
			}
		});
		return;
	}

	sendJSON(res, 404, { error: 'Not Found' });
};

function sendJSON(res, status, data) {
	res.writeHead(status, {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:4200',
	});
	res.end(JSON.stringify(data));
}

function setCORSHeaders(res) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
