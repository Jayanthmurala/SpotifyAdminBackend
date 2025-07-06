import sql from "./db.connetion.js";

async function initDB() {
    try {
        await sql `
        CREATE TABLE IF NOT EXISTS albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            cover_image VARCHAR(255),
            description VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
                await sql `
        CREATE TABLE IF NOT EXISTS songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            cover_image VARCHAR(255),
            description VARCHAR(255) NOT NULL,
            audio_file VARCHAR(255) NOT NULL,
            album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

export default initDB;