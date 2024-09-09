import { Router } from 'express';
import { validateLogin } from '../validators/auth.validator';
import { AuthServices } from '../controllers/auth.controller';

const router = Router();
const authServices = new AuthServices();

router.post('/login', [...validateLogin], authServices.postLogin);

export const AuthRoute = router;
