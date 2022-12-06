import {Request, Router} from 'express';
import UsersRouter from './Users';
import  BookingRouter from './Booking'
import passportGithubRouter from './github';
import GymPlansRouter from './GymPlans';
import GymPlanPayment from './GymPlanPayment';
import MachineExercisesRouter from './MachineExercises';
import GymTrainingsRouter from './GymTrainings';
import apiKeyMW from '@server/middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBeaereValidator';
import "@server/middleware/passportGithub";
//import multer from '../libs/multer';
//multer.single('image')
const router = Router();

//Esto ayuda a que se pueda llegar a visualizar de la manera
//http://localhost:3001/cashflow/byindex/1
router.use('/plan', apiKeyMW , jwtValidator, GymPlansRouter);
router.use('/planPayment', apiKeyMW , jwtValidator, GymPlanPayment);
router.use('/machine', apiKeyMW , jwtValidator,MachineExercisesRouter);
router.use('/training', apiKeyMW , jwtValidator,GymTrainingsRouter);
router.use('/security', apiKeyMW, UsersRouter);
router.use('/authGit',apiKeyMW , jwtValidator, passportGithubRouter);
router.use('/booking',apiKeyMW , jwtValidator, BookingRouter);

export default router;

export interface WithUserRequest extends Request {
	user?: any;
}
