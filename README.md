# 🛠️ Admin Service API (Microservice)

This service is for administrators to manage songs and albums: create, delete, upload cover images, and control content.

## 🚀 Base URL

```
http://localhost:7000/api/v1
```
## 🧱 Architecture Overview

This project is a full-stack **music streaming platform** built with a **microservice architecture**. It consists of the following services:

- **User Server**: Handles authentication, user profiles, and playlists using **MongoDB**, **JWT**, and **Redis**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyUserBackend
- **Songs Server**: Manages albums and songs with **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifySongBackend
- **Admin Server**: Provides admin panel APIs for content management using **PostgreSQL**.
  - **Git**: https://github.com/Jayanthmurala/SpotifyAdminBackend
- **Frontend**: Built with **React + TypeScript**, featuring role-based authentication (User/Admin).
  - **Git**: https://github.com/Jayanthmurala/SpotifyFrontend 

![System Architecture](https://ik.imagekit.io/jayanthmurala05/ChatGPT%20Image%20Jul%206,%202025,%2004_17_19%20PM.png?updatedAt=1751798915788)

---
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
