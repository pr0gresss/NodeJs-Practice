const fs = require('fs');
const path = require('path');
const Logger = require('../logger/logger');

const FOLDER_CREATION_DELAY = 60 * 1000;
const FILE_CREATION_DELAY = 10 * 1000;
const BASE_DIR = path.join(__dirname, '../data');
const logger = new Logger(BASE_DIR);

let currentFolder = '';

function createNewFolder() {
	const folderName = new Date().toISOString().replace(/[:.]/g, '-');

	currentFolder = logger.createFolder(folderName);
}

function createNewLogFile() {
	if (!currentFolder || !fs.existsSync(currentFolder)) {
		console.warn(
			"[📢 WARN] Can't find current log folder. Creating new one..."
		);
		createNewFolder();
	}

	const logTypes = ['success', 'error', 'info', 'warn'];
	const fileName = `${Date.now()}.txt`;
	const randomLogType = logTypes[Math.floor(Math.random() * logTypes.length)];
	const logContent = `[${randomLogType.toUpperCase()}][${new Date().toISOString()}]`;

	logger.createLogFile(currentFolder, fileName, logContent);
}

createNewFolder();
setInterval(createNewFolder, FOLDER_CREATION_DELAY);
setInterval(createNewLogFile, FILE_CREATION_DELAY);
