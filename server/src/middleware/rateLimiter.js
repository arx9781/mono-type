import ratelimit from "../config/upstash.js";

const rateLimiter = async (_, res, next) => {
  try {
    const { success } = await ratelimit.limit("limit_key");
    if (!success) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later",
      });
    }
    next();
  } catch (error) {
    console.error("Error in rateLimiter:", error);
    next(error);
  }
};

export default rateLimiter;
