# Log Generator & Log Analyzer (Node.js)

A simple two-part Node.js application that **generates random logs** and **analyzes** them to provide statistics by log type.  
Both applications share a custom-built `Logger` class for folder and file operations.

---

## 📂 Project Structure

```
project/
│
├── logger/
│   └── logger.js              # Shared Logger class
│
├── log-generator/
│   └── logGenerator.js        # Generates folders & log files
│
├── log-analyzer/
│   └── logAnalyzer.js         # Analyzes generated logs
│
└── data/                      # Generated folders and logs
```

## 1. Log Generator

### ▶️ Run the generator

```bash
node generator/logGenerator.js
```

---

## 2. Log Analyzer

### ▶️ Run the analyzer

To analyze all logs:
```bash
node analyzer/logAnalyzer.js
```

To filter logs by type:
```bash
node analyzer/logAnalyzer.js --type={logType}
```

