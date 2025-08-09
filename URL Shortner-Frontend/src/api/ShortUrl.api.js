
import axiosInstance from "../utils/axiosInstance";
export const createShortUrl = async (url) => {
  try {
    const {data} = await axiosInstance.post("http://localhost:3000/api/create", { url });
    return data;
  } catch (error) {
    console.error("Error creating short URL:", error);
    throw error;
  }
}
