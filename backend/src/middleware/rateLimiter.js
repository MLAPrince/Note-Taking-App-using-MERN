// import ratelimit from "../config/upstash.js";

// const rateLimiter = async (req, res, next) => {
//   try {
//     const { success } = await ratelimit.limit("my-rate-limit");

//     if (!success) {
//       return res.status(429).json({
//         message: "Too many requests, please try again later",
//       });
//     }

//     next();
//   } catch (error) {
//     console.log("Rate limit error", error);
//     next(error);
//   }
// };

// export default rateLimiter;























import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Get IP address from request
    const ip = 
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || // Trust proxies
      req.socket?.remoteAddress ||                             // Fallback for Node
      req.ip;                                                  // Express IP

    if (!ip) {
      console.warn("Unable to determine IP address");
    }

    // Use IP as unique key
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
