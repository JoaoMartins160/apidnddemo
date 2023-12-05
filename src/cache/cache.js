const client = require("./redisClient");

const set = async (key, value, duration) => {
  try {
    await client.set(key, JSON.stringify(value), "EX", duration);
  } catch (error) {
    console.error(error);
  }
};

const get = async (key) => {
  try {
    const result = await client.get(key);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { set, get };
