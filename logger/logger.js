const path = require('path');
const fs = require('fs');

class Logger {
	constructor(baseDir) {
		this.baseDir = baseDir;

		if (!fs.existsSync(this.baseDir)) {
			console.warn("[📢 WARN] This folder doesn't exist. Creating new one...");

			fs.mkdirSync(this.baseDir, { recursive: true });
		}
	}

	createFolder(folderName) {
		const folderPath = path.join(this.baseDir, folderName);

		fs.mkdirSync(folderPath, { recursive: true });
		console.log(`[📒 LOG] Created new folder: ${folderPath}`);

		return folderPath;
	}

	createLogFile(folderPath, fileName, message) {
		const logFile = path.join(folderPath, fileName);

		fs.appendFileSync(logFile, message);
		console.log(`[📒 LOG] Added new log with following content: ${message}`);

		return logFile;
	}

	readLogFile(filePath) {
		const data = fs.readFileSync(filePath, 'utf8');
		
		console.log(`[📒 LOG] Read ${filePath} contents: ${data}`);
		return data
	}
}

module.exports = Logger;
