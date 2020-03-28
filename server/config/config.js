module.exports = {
  PORT: process.env.PORT || 5000,
  db: {
    database: process.env.DB_NAME || 'ticketer',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost'
    }
  }
};