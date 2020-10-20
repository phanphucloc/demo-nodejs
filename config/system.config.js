const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

const configSystem = {
    BASE_URL_API: process.env.BASE_URL_API,
    JWT_KEY: process.env.JWT_KEY,
    MONGODB_URL: process.env.MONGODB_URL,
    BASE_PATH_URL_API : '',
}

module.exports = configSystem