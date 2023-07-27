module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'password',
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  }
};
