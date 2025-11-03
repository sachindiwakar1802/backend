import { Url } from "../models/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
  try {
    const longUrl = req.body.longUrl;
    const shortcode = shortid.generate();
    const shortUrl = `http://localhost:1000/${shortcode}`;

    // ✅ field names must match the schema
    const newUrl = new Url({ shortUrl, longUrl });
    await newUrl.save();

    console.log("Short saved = ", newUrl);

    // ✅ render with generated short URL
    return res.render("index.ejs", { shortUrl });
  } catch (err) {
    console.error("Error saving URL:", err);
    res.status(500).send("Server Error");
  }
};
