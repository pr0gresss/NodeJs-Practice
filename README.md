# 📰 Simple Article API with Minimalistic Frontend (Node.js + Angular)

A lightweight full-stack project featuring a Node.js backend and an Angular frontend for managing and viewing simple articles.

# 🚀 Getting Started
## 1️⃣ Clone the Repository
```bash
git clone git@github.com:pr0gresss/NodeJs-Practice.git
cd NodeJs-Practice
```
## ⚙️ Backend Setup
### 🔧 Install Dependencies
```bash
cd articles.backend
npm install
```

### 🔧 Create db
```bash
npm run db:create
```

### 🔧 Run db migrations
```bash
npm run db:migrate
```

### 🔧 Run db seeders
```bash
npm run db:seed
```

### 🔧 .env file example
```bash
DB_HOST="localhost"
DB_PORT=DB_PORT
DB_USER="DB_USER"
DB_PASSWORD="DB_PASSWORD"
DB_NAME="DB_NAME"
DB_SSL="true"
SWAGGER_ENDPOINT="docs"
BASE_PORT=BASE_PORT
BASE_HOST="http://localhost"
FRONTEND_HOST="http://localhost"
FRONTEND_PORT=FRONTEND_PORT
```

### ▶️ Run the Backend
```bash
npm run start
```


The backend will start on 3000 port.

## 💻 Frontend Setup
### 🔧 Install Dependencies
```bash
cd articles.frontend
npm install
```
### ▶️ Run the Frontend
```bash
npm run start
```

The frontend will typically run on http://localhost:4200
.
