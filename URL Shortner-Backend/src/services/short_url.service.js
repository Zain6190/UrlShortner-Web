import { generateNanoId } from "../utis/helper.js";
import { saveShortUrl } from "../dao/short_url.js";

export const ShortUrlServiceWithoutUser =  async (url) => {
  const shortUrl = await generateNanoId(8);
  await saveShortUrl(url, shortUrl);
  return shortUrl;
};
export const ShortUrlServiceWithUser =  async (url,user_id) => {
  const shortUrl = await generateNanoId(8);
  await saveShortUrl(url, shortUrl,user_id);
  return shortUrl;
};
