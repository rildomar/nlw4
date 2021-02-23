import { UserController } from "./controllers/UserController";
import { Router } from 'express';
const router = Router();

const userController = new UserController();

router.get('/users', userController.getall);
router.post('/users', userController.create);

export { router };