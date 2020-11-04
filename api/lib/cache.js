import redis from "redis";
import { CACHE_DURATION_SECS, IN_DEVELOPMENT } from "../config/vars";

const { REDIS_URL } = process.env;

export default class RedisCacheManager {
  static CLIENT = null;
  static REDIS_SET_MODE = "EX";

  static async initializeConnection() {
    this.CLIENT = redis.createClient(REDIS_URL);
    return new Promise((resolve) => this.CLIENT.on("ready", resolve));
  }

  static async set(key, value) {
    return new Promise((resolve, reject) => {
      this.CLIENT.set(
        key,
        JSON.stringify(value),
        this.REDIS_SET_MODE,
        CACHE_DURATION_SECS,
        (error, reply) => {
          if (error) reject(error);
          if (IN_DEVELOPMENT) console.log("setting in cache");
          resolve(reply);
        }
      );
    });
  }

  static async get(key) {
    return new Promise((resolve, reject) => {
      this.CLIENT.get(key, (error, reply) => {
        if (error) reject(error);
        if (reply !== null) {
          reply = JSON.parse(reply);
          if (IN_DEVELOPMENT) console.log("fetching from cache");
        }
        resolve(reply);
      });
    });
  }
}
