require('dotenv').config();
import request from "request";
import db from "../models/index"


let getHomePage =async (req, res) => {
    let data =await db.User.findAll();
    return res.render("homePage.ejs")
}

let getHomeCRUD =async (req, res) => {
    let data =await db.User.findAll();
    return res.render("homePage.ejs")
}

module.exports = {
    getHomePage: getHomePage,
    getHomeCRUD:getHomeCRUD
}