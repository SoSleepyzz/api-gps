import express from "express";
import { connection } from "../dbconnect.js";
import  mysql  from "mysql";
export const router = express.Router();

router.post("/register", async (req, res) => {
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

router.get("/get", async (req, res) => {
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