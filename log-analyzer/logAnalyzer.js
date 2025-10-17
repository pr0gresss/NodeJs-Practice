const fs = require('fs');
const path = require('path');
const Logger = require('../logger/logger');

const BASE_DIR = path.join(__dirname, '../data');
const LOG_LINE_REGEX = /(?<=\[)[^\]]*(?=\])/gm;
const logger = new Logger(BASE_DIR);

let filterType = null;
const typeArg = process.argv.find(arg => arg.startsWith('--type='));
if (typeArg) {
	filterType = typeArg.split('=')[1]?.toLowerCase();
}

function analyzeLogs() {
	if (!fs.existsSync(BASE_DIR)) {
		console.error('[❌ ERROR] Logs directory not found:', BASE_DIR);
		process.exit(1);
	}

	const summary = {};
	const folders = fs.readdirSync(BASE_DIR);

	folders.forEach(folder => {
		const folderPath = path.join(BASE_DIR, folder);
		if (!fs.statSync(folderPath).isDirectory()) return;

		const files = fs.readdirSync(folderPath);

		files.forEach(file => {
			const filePath = path.join(folderPath, file);
			const data = logger.readLogFile(filePath);
			const match = data.match(LOG_LINE_REGEX);

			if (match) {
				const type = match[0].toLowerCase();
				summary[type] = (summary[type] || 0) + 1;
			}
		});
	});

  getAnalyzeSummary(summary)
}

function getAnalyzeSummary(result) {
	console.log('\n\n\n\n[📊 Log Analysis Report]');
	console.log('------------------------');

	if (filterType) {
		const count = result[filterType] || 0;
		console.log(`Filtered by type: ${filterType.toUpperCase()}`);
		console.log(`Total ${filterType} logs: ${count}`);
	} else {
		if (Object.keys(result).length === 0) {
			console.log('❌ No logs found.');
		} else {
			Object.entries(result).forEach(([type, count]) => {
				console.log(`${type.toUpperCase()}: ${count}`);
			});
		}
	}

	console.log('\n[📒 LOG] Analysis complete.');
}

analyzeLogs();
