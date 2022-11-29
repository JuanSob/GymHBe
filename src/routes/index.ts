import {Request, Router} from 'express';
import UsersRouter from './Users';
import  BookingRouter from './Booking'
import passportGithubRouter from './github';
import apiKeyMW from '@server/middleware/apiKeyHeaderValidator';
import { jwtValidator } from '@server/middleware/jwtBeaereValidator';
import "@server/middleware/passportGithub";

const router = Router();

//Esto ayuda a que se pueda llegar a visualizar de la manera
//http://localhost:3001/cashflow/byindex/1
router.use('/security', apiKeyMW, UsersRouter);
router.use('/authGit',apiKeyMW , jwtValidator, passportGithubRouter);
router.use('/booking',apiKeyMW , jwtValidator, BookingRouter);

export default router;

export interface WithUserRequest extends Request {
	user?: any;
}
