const mysql = require("mysql");
const util = require("util");

const conn = mysql.createPool({
    host: "202.28.34.197",
    user: "web66_65011212185",
    password: "65011212185@csmsu",
    database: "web66_65011212185"
})

const queryPromis = util.promisify(conn.query).bind(conn);
