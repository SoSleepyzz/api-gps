const express = require('express')
const mysql = require('mysql')

const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: '202.28.34.197',
    user: 'web66_65011212167',
    password: '65011212167@csmsu',
    database: 'web66_65011212167'
})

connection.connect((err) => {
    if (err) {
        console.log('Error ', err)
        return;
    }
    console.log('Connecting success');
})

app.post("/register", async (req, res) => {
    const {Fname, Lname, Phone, password, address, Lati, Longti, image} = req.body;

    try {
        connection.query(
            "INSERT INTO Users(Fname, Lname, Phone, password, address, Lati, Longti, image, type) VALUES(?, ?, ?, ?, ?, ?, ?, ?, 1)",
            [Fname, Lname, Phone, password, address, Lati, Longti, image],
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

app.get("/login", async (req, res) => {
    const { Phone, password } = req.body; // ตรวจสอบให้แน่ใจว่ามี req.body

    try {
        connection.query(
            `SELECT * FROM Users  WHERE Phone = ? AND password = ?
            UNION
            SELECT * FROM Riders WHERE Phone = ? AND password = ?`,
            [Phone, password],
            (err, results, fields) => {
                if (err) {
                    console.log("ERROR ", err);
                    return res.status(400).json(err);
                }
                
                // ตรวจสอบว่ามีผลลัพธ์หรือไม่
                if (results.length > 0) {
                    // ส่งข้อมูลผู้ใช้กลับไป
                    return res.status(200).json(results[0]); // ส่งข้อมูลผู้ใช้ที่พบ
                } else {
                    // ไม่พบผู้ใช้
                    return res.status(401).json({ message: "Invalid phone or password." });
                }
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});



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