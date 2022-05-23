import { Request, Response } from 'express';
import { UsersService } from '../services';
import { HttpError } from '../errors/httpError';
import {
    httpInternalErrorCode,
    httpSuccessCode,
    httpCreatedCode,
    defaultErrorMessage,
    actionMessage
} from '../constants';

export default class UsersController {
    async index(request: Request, response: Response) {
        const { name } = request.params;
        const service = new UsersService();

        try {
            const users = await service.find();
            const nameAuth = users.find(user => user.name === name);
    
            return response.json(nameAuth);
        } catch(error) {
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode);
        }
    }

    async storeL(request: Request, response: Response) {
        try {
            return response.status(httpSuccessCode).json(actionMessage('Usuário logado'));
        } catch(error) {
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode);
        }
    }

    async storeV(request: Request, response: Response) {
        try {
            return response.status(httpSuccessCode).json(actionMessage('Usuário validado'));
        } catch(error) {
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode); 
        }
    }

    async storeR(request: Request, response: Response) {
        const { name, password } = request.body;
        const service = new UsersService();

        try {
            await service.create({
                name: name,
                password: password
            });

            return response.status(httpCreatedCode).json(actionMessage('Usuário criado'));
        } catch(error) {
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode);
        }
    }
}