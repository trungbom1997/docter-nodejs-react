require('dotenv').config();
import request from "request";
import db from "../models/index"
import auth from "../services/userService";

let handleLogin =async (req, res) => {
    let data = await db.User.findAll();
    return res.status(200).json({

    })
}

module.exports = {
    handleLogin:handleLogin
}