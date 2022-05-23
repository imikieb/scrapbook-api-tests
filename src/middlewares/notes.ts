import { Request, Response, NextFunction } from 'express';
import { httpBadRequestCode } from '../constants';

export const notesValidation = async (request: Request, response: Response, next: NextFunction) => {
    const { note, user_id } = request.body;

    if(!note) {
        return response.status(httpBadRequestCode).json({
            message: 'Preencha o campo.'
        });
    }

    if(!user_id) {
        return response.status(httpBadRequestCode).json({
            message: 'Usuário não encontrado.'
        });
    }

    if(note.length > 40) {
        return response.status(httpBadRequestCode).json({
            message: 'O campo ultrapassou o número máximo de caracteres.'
        });
    }

    next();
}