require('dotenv').config();

const db = {
    url: `${process.env.DB_HOST}`,
};
const port = process.env.PORT;

module.exports = {
    db,
    port
}