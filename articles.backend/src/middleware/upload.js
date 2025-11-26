const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

if (!fs.existsSync(UPLOADS_DIR)) {
	fs.mkdirSync(UPLOADS_DIR, {recursive: true});
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, UPLOADS_DIR),
	filename: (req, file, cb) => {
		const unique = Date.now() + "-" + file.originalname;
		cb(null, unique);
	},
});

const allowedMimeTypes = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/gif",
	"application/pdf",
];

const fileFilter = (req, file, cb) => {
	if (!allowedMimeTypes.includes(file.mimetype)) {
		const err = new Error(
			"Invalid file type. Only JPG, JPEG, PNG, GIF, and PDF are allowed."
		);
		err.status = 406;

		return cb(err, false);
	}

	cb(null, true);
};

module.exports = multer({
	storage,
	fileFilter,
	limits: {fileSize: 10 * 1024 * 1024},
});
