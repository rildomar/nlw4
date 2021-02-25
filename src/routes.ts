import { UserController } from "./controllers/UserController";
import { Router } from 'express';
import { SurveysController } from "./controllers/SurveysController";
const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();

router.get('/users', userController.getall);
router.post('/users', userController.create);

router.get('/surveys', userController.getall);
router.post('/surveys', surveysController.create)

export { router };