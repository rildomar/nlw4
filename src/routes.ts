import { UserController } from "./controllers/UserController";
import { Router } from 'express';
import { SurveysController } from "./controllers/SurveysController";
import { SendMailController } from "./controllers/SendMailcontroller";
const router = Router();

const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.get('/users', userController.getall);
router.post('/users', userController.create);

router.get('/surveys', surveysController.getAll);
router.post('/surveys', surveysController.create)

router.post('/sendMail', sendMailController.execute)

export { router };