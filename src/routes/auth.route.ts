import { Router } from 'express';
import { validateLogin, validateRegister } from '../validators/auth.validator';
import { AuthServices } from '../controllers/auth.controller';

const router = Router();
const authServices = new AuthServices();

router.post('/login', [...validateLogin], authServices.postLogin);
router.post('/register', [...validateRegister], authServices.postRegister);

export const AuthRoute = router;
