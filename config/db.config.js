module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "postgres",
  PASSWORD: process.env.DB_PASSWORD || "lina",
  DB: process.env.DB_NAME || "tododb",
  SSL: off,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
