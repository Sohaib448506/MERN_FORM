const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".", ".env") });
const URL = "localhost:27017";
const formDB = "formData";
const port = process.env.PORT || 3000;
const jwtPrivateKey = "1234";
module.exports = { URL, formDB, port, jwtPrivateKey };
