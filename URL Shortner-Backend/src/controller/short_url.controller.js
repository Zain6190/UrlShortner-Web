import {
  ShortUrlServiceWithUser,
  ShortUrlServiceWithoutUser,
} from "../services/short_url.service.js";
import shortUrlSchema from "../models/short_url.model.js";

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  const userId = req.userId; // Assuming you have userId in req
  const shortUrl = userId
    ? await ShortUrlServiceWithUser(url, userId)
    : await ShortUrlServiceWithoutUser(url);
  res.send(process.env.APP_URL + shortUrl);
};
export const redirectShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await shortUrlSchema.findOneAndUpdate({ short_url: id },{$inc: { clicks: 1 }}, { new: true });
  if (url) {
    return res.redirect(url.full_url);
  } else {
    res.status(404).send("URL not found");
  }
};
