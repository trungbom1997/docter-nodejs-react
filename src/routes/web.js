import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRouter = (app) => {
    router.get('/',homeController.getHomePage);
    router.get('/crud',homeController.getHomeCRUD);
    
    return app.use("/",router);
}
module.exports = initWebRouter