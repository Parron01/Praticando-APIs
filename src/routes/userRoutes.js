import {Router} from 'express';
import userController from "../controllers/UserController";
import { loginRequired } from '../middlewares/middleware';

const router = new Router();


router.get("/", userController.index);

router.post("/create", userController.create);
router.delete("/delete/:email?",loginRequired, userController.delete);
router.put("/update/:email?",loginRequired, userController.update);

router.post("/login", userController.login);
router.get("/logout", loginRequired, userController.logout);
router.get("/show", loginRequired, userController.show);




export default router;