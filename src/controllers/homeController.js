require('dotenv').config();
import request from "request";
import db from "../models/index"
import auth from "../services/authenticationService";


let getHomePage =async (req, res) => {
    let data =await db.User.findAll();
    return res.render("homePage.ejs")
}

let getHomeCRUD =async (req, res) => {
    let data =await db.User.findAll();
    return res.render("crud.ejs")
}

let postHomeCRUD =async (req, res) => {
    let result =await auth.createNewUser(req.body);
    return res.status(200).json(result)
}

let getAllUser =async (req, res) => {
    let result =await auth.getAllUser();
    return res.status(200).json(result)
}

let getUserById =async (req, res) => {
    let result =await auth.findUserById(req.query.id);
    return res.status(200).json(result)
}

let saveUser =async (req, res) => {
    let result =await auth.updateUserById(req.body);
    return res.status(200).json(result)
}

let deleteUser =async (req, res) => {
    let result =await auth.deleteUserById(req.query.id);
    return res.status(200).json(result)
}

module.exports = {
    getHomePage: getHomePage,
    getHomeCRUD:getHomeCRUD,
    postHomeCRUD:postHomeCRUD,
    getAllUser:getAllUser,
    getUserById:getUserById,
    saveUser:saveUser,
    deleteUser:deleteUser
}