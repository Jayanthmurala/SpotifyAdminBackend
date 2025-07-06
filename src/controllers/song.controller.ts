import cloudinary from "../cloudinary/cloud.connetion.js";
import getBuffer from "../configes/dataUri.js";
import sql from "../db/config/db.connetion.js";
import TryCatch from "../errors/TryCatch.js";
import redisClient from "../redis/redis.setup.js";


//Add New Song
const addSong = TryCatch(async (req: any, res: any) => {
  const { title, description, album_id } = req.body;
  const file = req.file;
  if (!title || !description || !file) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const checkAlbum = await sql`
        SELECT * FROM albums WHERE id = ${album_id}
    `;
  if (checkAlbum.length === 0) {
    return res.status(404).json({ message: "Album not found" });
  }
  const fileBuffer = getBuffer(file);
  if (!fileBuffer || !fileBuffer.content) {
    return res.status(400).json({ message: "Invalid file format" });
  }
  const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
    folder: "songs",
    resource_type: "video",
  });
  if (!cloud || !cloud.secure_url) {
    return res
      .status(500)
      .json({ message: "Failed to upload audio to Cloudinary" });
  }
  const result = await sql`
        INSERT INTO songs (title, cover_image, description, audio_file, album_id)
        VALUES (${title}, ${cloud.secure_url}, ${description}, ${cloud.secure_url}, ${album_id})
        RETURNING *
    `;
       if(redisClient.isReady){
      await redisClient.del("songs");
    }
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Failed to add song" });
  }
  return res
    .status(200)
    .json({ message: "Song added successfully", song: result[0] });
});

// Updat cover_image to be optional
const update_cover_image = TryCatch(async (req: any, res: any) => {
  const { id } = req.params;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "Cover image is required" });
  }
  const fileBuffer = getBuffer(file);
  if (!fileBuffer || !fileBuffer.content) {
    return res.status(400).json({ message: "Invalid file format" });
  }
  const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
    folder: "songs",
  });
  if (!cloud || !cloud.secure_url) {
    return res
      .status(500)
      .json({ message: "Failed to upload image to Cloudinary" });
  }
  const result = await sql`
        UPDATE songs
        SET cover_image = ${cloud.secure_url}
        WHERE id = ${id}
        RETURNING *
    `;
    if(redisClient.isReady){
      await redisClient.del("songs");
    }

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Failed to update song" });
  }
  return res
    .status(200)
    .json({ message: "Song updated successfully", song: result[0] });
});

//Delete song
const deleteSong = TryCatch(async (req: any, res: any) => {
  const { id } = req.params;
  console.log(id, "id");
  if (!id) {
    return res.status(400).json({ message: "Song ID is required" });
  }
  const checkSong = await sql`
        SELECT * FROM songs WHERE id = ${id}
    `;
  if (checkSong.length === 0) {
    return res.status(404).json({ message: "Song not found" });
  }
  const result = await sql`
        DELETE FROM songs
        WHERE id = ${id}
        RETURNING *
    `;
    if(redisClient.isReady){
      await redisClient.del("songs");
    }
  if (!result || result.length === 0) {
    return res.status(404).json({ message: "Song not found" });
  }
  return res.status(200).json({ message: "Song deleted successfully" });
}
);

export default {
  addSong,
  update_cover_image,
  deleteSong,
};
