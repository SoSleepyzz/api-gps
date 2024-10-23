const express = require('express')
const mysql = require('mysql')

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: '202.28.34.197',
    user: 'web66_65011212185',
    password: '65011212185@csmsu',
    database: 'web66_65011212185'
})

connection.connect((err) => {
    if (err) {
        console.log('Error ', err)
        return;
    }
    console.log('Connecting success');
})

app.post("/register", async (req, res) => {
    const {Fname, Lname, Phone, password, address, Laddress, Loaddress} = req.body;

    try {
        connection.query(
            "INSERT INTO Users(Fname, Lname, Phone, password, address, Laddress, Loaddress) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [Fname, Lname, Phone, password, address, Laddress, Loaddress],
            (err, results, fields) => {
                if (err) {
                    console.log("ERROR ",err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "success"})
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/get", async (req, res) => {
    try {
        connection.query(
            "SELECT * FROM Users",
            (err, results, fields)=>{
                if(err){
                    console.log("ERROR ",err);
                    res.status(400).json(err);
                }else{
                    res.status(201).json(result);
                }
            }
        )
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.listen(3000, () => console.log('Server is running on port 3000'));