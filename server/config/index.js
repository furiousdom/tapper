module.exports = {
  ip: process.env.SERVER_IP || '127.0.0.1',
  port: process.env.SERVER_PORT || 5000,
  clientPort: process.env.CLIENT_PORT || 8080,
  apiPath: process.env.API_PATH || '/api',
  db: {
    database: process.env.DB_NAME || 'tapper',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost',
      port: process.env.DB_PORT || 5432
    }
  },
  auth: {
    scheme: process.env.AUTH_JWT_SCHEME || 'Bearer',
    secret: process.env.AUTH_JWT_SECRET || 'secret',
    saltRounds: process.env.AUTH_SALT_ROUNDS || 10
  }
};
