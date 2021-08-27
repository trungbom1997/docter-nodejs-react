import express from "express";
import homeController from "../controllers/homeController";
import homeController from "../controllers/userController";
let router = express.Router();

let initWebRouter = (app) => {
    router.get('/',homeController.getHomePage);
    router.get('/crud',homeController.getHomeCRUD);
    router.post('/post-crud',homeController.postHomeCRUD);
    router.get('/get-all-user',homeController.getAllUser);
    router.get('/user-detail',homeController.getUserById);
    router.put('/save-user-detail',homeController.saveUser);
    router.delete('/delete-user',homeController.deleteUser);


    router.post('/api/login',homeController.handleLogin);



    
    return app.use("/",router);
}
module.exports = initWebRouter