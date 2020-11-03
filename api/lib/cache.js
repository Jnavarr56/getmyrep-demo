import redis from "redis";

const { REDIS_PORT, REDIS_URL, NODE_ENV } = process.env;

// Shift url to env var and find way to transpile
// this to allow static properties.
// https://babeljs.io/docs/en/babel-plugin-proposal-class-properties

const holder = {};
export default class RedisCacheManager {
  constructor() {}
  //   static client = null;
  static async initializeConnection() {
    const redisClient = redis.createClient("redis://getmyrep-demo-cache:6379");
    holder.client = redisClient;
    return new Promise((resolve) => {
      redisClient.on("connect", () => {
        if (NODE_ENV === "development") {
          console.log("Redis connection initialized!");
          resolve();
        }
      });
    });
  }

  static get client() {
    if (!holder.client) {
      throw new Error("Client not initialized");
    }

    return holder.client;
  }
}
