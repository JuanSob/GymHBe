import {Request, Router} from 'express';
import UsersRouter from './Users';
import passportGithubRouter from './github';
import GymPlansRouter from './GymPlans';
import apiKeyMW from '@server/middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBeaereValidator';
import "@server/middleware/passportGithub";

const router = Router();

//Esto ayuda a que se pueda llegar a visualizar de la manera
//http://localhost:3001/cashflow/byindex/1
router.use('/plan', apiKeyMW , jwtValidator, GymPlansRouter);
router.use('/security', apiKeyMW, UsersRouter);
router.use('/authGit', passportGithubRouter);

export default router;

export interface WithUserRequest extends Request {
	user?: any;
}