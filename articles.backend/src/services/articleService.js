const fs = require("fs");
const path = require("path");
const {BASE_URL} = require("../config/environment");

const DATA_DIR = path.join(__dirname, "../../data");

if (!fs.existsSync(DATA_DIR)) {
	fs.mkdirSync(DATA_DIR);
}

class ArticleService {
	static getAll() {
		const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".json"));
		return files.map(f => {
			const data = fs.readFileSync(path.join(DATA_DIR, f), "utf8");
			return JSON.parse(data);
		});
	}

	static getById(id) {
		const filePath = path.join(DATA_DIR, `${id}.json`);
		if (!fs.existsSync(filePath)) return null;

		const data = fs.readFileSync(filePath, "utf8");
		return JSON.parse(data);
	}

	static create({title, content, attachments = []}) {
		if (!title?.trim() || !content?.trim()) {
			throw new Error("Title and content are required");
		}

		const id = Date.now().toString();
		const newDate = new Date().toISOString();
		
		const article = {
			id,
			title,
			content,
			attachments,
			createdAt: newDate,
			updatedAt: newDate,
		};

		fs.writeFileSync(
			path.join(DATA_DIR, `${id}.json`),
			JSON.stringify(article, null, 2)
		);
		return article;
	}

	static update({id, title, content, attachments = []}) {
		const filePath = path.join(DATA_DIR, `${id}.json`);
		if (!fs.existsSync(filePath)) return null;

		const existing = JSON.parse(fs.readFileSync(filePath, "utf8"));

		const updated = {
			...existing,
			title: title?.trim() || existing.title,
			content: content?.trim() || existing.content,
			attachments: attachments.length ? attachments : existing.attachments,
			updatedAt: new Date().toISOString(),
		};

		fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
		return updated;
	}

	static delete(id) {
		const filePath = path.join(DATA_DIR, `${id}.json`);

		if (!fs.existsSync(filePath)) {
			return false;
		}

		fs.unlinkSync(filePath);
		return true;
	}

	static uploadAttachment(file) {
		if (!file) {
			throw new Error("No file uploaded");
		}

		return {
			filename: file.filename,
			url: `${BASE_URL}/uploads/${file.filename}`,
			mimetype: file.mimetype,
			size: file.size,
			uploadedAt: new Date().toISOString(),
		};
	}
}

module.exports = ArticleService;
