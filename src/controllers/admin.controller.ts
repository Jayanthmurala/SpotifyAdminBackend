import TryCatch from "../errors/TryCatch.js";
import getBuffer from "../configes/dataUri.js";
import sql from "../db/config/db.connetion.js";
import cloudinary from "../cloudinary/cloud.connetion.js";
import redisClient from "../redis/redis.setup.js";

const addAblum = TryCatch(async (req: any, res: any) => {
  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description || !file) {
    return res.status(400).json({ message: "All fields are required" });
  }



  const fileBuffer = getBuffer(file);
  if (!fileBuffer || !fileBuffer.content) {
    return res.status(400).json({ message: "Invalid file format" });
  }

  const cloud = await cloudinary.uploader.upload(fileBuffer.content, {
    folder: "albums",
  });

  if (!cloud || !cloud.secure_url) {
    return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
  }

  const result = await sql`
    INSERT INTO albums (title, cover_image, description)
    VALUES (${title}, ${cloud.secure_url}, ${description})
    RETURNING *
  `;
 if(redisClient.isReady){
    await redisClient.del("albums");
 }
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Failed to add album" });
  }

  return res.status(200).json({ message: "Album added successfully", album: result[0] });
});

// Delete Album
const deleteAlbum = TryCatch(async (req: any, res: any) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Album ID is required" });
  }
  const albumExists = await sql`
    SELECT * FROM albums WHERE id = ${id}
  `;
  if (albumExists.length === 0) {
    return res.status(404).json({ message: "Album not found" });
  }
  const albumCheck = await sql`
    SELECT  * FROM songs WHERE album_id = ${id}
  `;
  if (albumCheck.length > 0) {
    return res.status(400).json({ message: "Album has associated songs" });
  }
  const result = await sql`
    DELETE FROM albums WHERE id = ${id}
    RETURNING *
  `;
  if(redisClient.isReady){
    await redisClient.del("albums");
  }

  if (!result || result.length === 0) {
    return res.status(404).json({ message: "Album not found" });
  }

  return res.status(200).json({ message: "Album deleted successfully", album: result[0] });
});







export default {
  addAblum,
  deleteAlbum,
};
