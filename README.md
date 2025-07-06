# 🛠️ Admin Service API (Microservice)

This service is for administrators to manage songs and albums: create, delete, upload cover images, and control content.

## 🚀 Base URL

```
http://localhost:7000/api/v1
```

## 🧰 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT Auth (Admin role)
- Multer
- Cloudinary (Image Uploads)

## 🔐 Roles & Credentials (For Testing)

| Role  | Email             | Password  |
| ----- | ----------------- | --------- |
| Admin | adminv1@gmail.com | 123456789 |

## 📦 Installation

```bash
cd Admin-server
npm install
```

### ⚙️ Environment Variables

```env
PORT=7000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

## 📑 API Endpoints

### 📀 Albums

| Method | Endpoint     | Description   |
| ------ | ------------ | ------------- |
| POST   | `/album/new` | Add new album |
| DELETE | `/album/:id` | Delete album  |

### 🎵 Songs

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| POST   | `/song/new`       | Add new song       |
| POST   | `/song/cover/:id` | Upload cover image |
| DELETE | `/song/:id`       | Delete a song      |

## 🧑 Author

- **Jayanth Murala**
- 📧 jayanthmurala1@gmail.com
- 🔗 [LinkedIn](https://www.linkedin.com/in/jayanth-murala-0045b2281)
