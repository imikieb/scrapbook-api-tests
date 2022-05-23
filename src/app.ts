import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import Database from './database/connections/Database';
import UsersRoutes from './routes/users';
import NotesRoutes from './routes/notes';
import { HttpError } from './errors/httpError';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    async init() {
        this.config();
        this.errors();
        this.routes();
        await this.database();
    }

    start(port: number) {
        this.#express.listen(port, () => {
            console.log(`A aplicação está rodando na porta ${port}.`);
        });
    }

    private config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({extended: false}));
        this.#express.use(cors());
    }

    private errors() {
        this.#express.use((error: HttpError, request: Request, response: Response, next: NextFunction) => {
            return response.json({
                mensagem: error.message
            });
        });
    }

    private routes() {
        const usersRouter = new UsersRoutes().init();
        const notesRouter = new NotesRoutes().init();

        this.#express.use(usersRouter);
        this.#express.use(notesRouter);
    }

    private async database() {
        await Database.getInstance();
    }
}