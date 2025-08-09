import shortUrlSchema from "../models/short_url.model.js";

export const saveShortUrl = async (url, shortUrl, userId) => {
  const newUrl = new shortUrlSchema({
    full_url: url,
    short_url: shortUrl,
  });

  if (userId) {
    newUrl.user_id = userId;
  }

  await newUrl.save();
};
