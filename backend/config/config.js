module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "Book_Tracker",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "postgres",
    "database": "Book_Tracker_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
