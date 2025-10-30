const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../data');

if (!fs.existsSync(DATA_DIR)) {
	fs.mkdirSync(DATA_DIR);
}

class ArticleService {
	static getAll() {
		const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
		return files.map(f => {
			const data = fs.readFileSync(path.join(DATA_DIR, f), 'utf8');
			return JSON.parse(data);
		});
	}

	static getById(id) {
		const filePath = path.join(DATA_DIR, `${id}.json`);
		if (!fs.existsSync(filePath)) return null;

		const data = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(data);
	}

	static create({ title, content }) {
		if (!title.trim() || !content.trim()) {
			throw new Error('Title and content are required');
		}

		const id = Date.now().toString();
		const article = { id, title, content, createdAt: new Date().toISOString() };

		fs.writeFileSync(
			path.join(DATA_DIR, `${id}.json`),
			JSON.stringify(article, null, 2)
		);
		return article;
	}
}

module.exports = ArticleService;
