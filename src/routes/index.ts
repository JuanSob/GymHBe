import {Request, Router} from 'express';
import UsersRouter from './Users';
import passportGithubRouter from './github';
import MachineExercisesRouter from './MachineExercises';
import GymTrainingsRouter from './GymTrainings';
import apiKeyMW from '@server/middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBeaereValidator';
import "@server/middleware/passportGithub";
import multer from '../libs/multer';

const router = Router();

//Esto ayuda a que se pueda llegar a visualizar de la manera
//http://localhost:3001/cashflow/byindex/1
router.use('/machine', apiKeyMW , jwtValidator, multer.single('image') , MachineExercisesRouter);
router.use('/training', apiKeyMW , jwtValidator, multer.single('image') , GymTrainingsRouter);
router.use('/security', apiKeyMW, UsersRouter);
router.use('/authGit', passportGithubRouter);

export default router;

export interface WithUserRequest extends Request {
	user?: any;
}