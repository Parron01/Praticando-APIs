import {Router} from 'express';
import userController from "../controllers/UserController";

const router = new Router();


router.get("/", userController.index);
router.post("/create", userController.create);
router.delete("/delete/:email?", userController.delete);
router.post("/login", userController.login);
router.get("/show", userController.show);


router.put("/update/:email?", userController.update);


export default router;