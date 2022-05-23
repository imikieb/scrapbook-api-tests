import { Router } from 'express';
import { loginValidation, userValidation, registerValidation } from '../middlewares/users';
import UsersController from '../controllers/users';

export default class UsersRoutes {
    init(): Router {
        const router = Router();
        const controller = new UsersController();

        router.get('/users/:name', controller.index);
        router.post('/login', [loginValidation], controller.storeL);
        router.post('/validate', [userValidation], controller.storeV);
        router.post('/register', [registerValidation], controller.storeR);

        return router;
    }
}