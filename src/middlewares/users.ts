import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services';
import { httpBadRequestCode, fillFields, fieldsLength } from '../constants';

export const loginValidation = async (request: Request, response: Response, next: NextFunction) => {
    const { name, password } = request.body;
    const service = new UsersService();
    const users = await service.find();
    const nameAuth = users.find(user => user.name === name);
    const passwordAuth = nameAuth?.password;

    if(!name || !password) {
        return response.status(httpBadRequestCode).json({
            message: fillFields
        });
    }

    if(!nameAuth || passwordAuth !== password) {
        return response.status(httpBadRequestCode).json({
            message: 'Nome ou senha incorretos.'
        });
    }

    next();
}

export const userValidation = async (request: Request, response: Response, next: NextFunction) => {
    const { name } = request.body;
    const service = new UsersService();
    const users = await service.find();
    const nameAuth = users.find(user => user.name === name);

    if(!nameAuth) {
        return response.status(httpBadRequestCode).json({
            message: 'Usuário não logou.'
        });
    }

    next();
}

export const registerValidation = async (request: Request, response: Response, next: NextFunction) => {
    const { name, password } = request.body;
    const service = new UsersService();
    const users = await service.find();
    const nameAuth = users.find(user => user.name === name);

    if(!name || !password) {
        return response.status(httpBadRequestCode).json({
            message: fillFields
        });
    }

    if(name.length < 4) {
        return response.status(httpBadRequestCode).json(fieldsLength('O nome', 'mínimo', 4));
    }

    if(password.length < 8) {
        return response.status(httpBadRequestCode).json(fieldsLength('A senha', 'mínimo', 8));
    }

    if(!/^[a-zA-Z]/.test(name)) {
        return response.status(httpBadRequestCode).json({
            message: 'O nome deverá começar com uma letra.'
        });
    }

    if(password.search(/^(?=.*[a-z]).*$/) < 0) {
        return response.status(httpBadRequestCode).json({
            message: 'A senha deve conter uma letra minúscula.'
        });
    }

    if(password.search(/^(?=.*[A-Z]).*$/) < 0) {
        return response.status(httpBadRequestCode).json({
            message: 'A senha deve conter uma letra maiúscula.'
        });
    }

    if(password.search(/[0-9]/) < 0) {
        return response.status(httpBadRequestCode).json({
            message: 'A senha deve conter um número.'
        });
    }

    if(password.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/) < 0) {
        return response.status(httpBadRequestCode).json({
            message: 'A senha deve conter um caracter especial.'
        });
    }

    if(nameAuth) {
        return response.status(httpBadRequestCode).json({
            message: 'Usuário já cadastrado.'
        });
    }

    next();
}