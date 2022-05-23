import { Router } from 'express';
import { notesValidation } from '../middlewares/notes';
import NotesController from '../controllers/notes';

export default class NotesRoutes {
    init(): Router {
        const router = Router();
        const controller = new NotesController();

        router.get('/notes/:userId', controller.index);
        router.post('/notes/:userId', [notesValidation], controller.store);
        router.put('/notes/:userId/:id', [notesValidation], controller.update);
        router.delete('/notes/:userId/:id', controller.delete);

        return router;
    }
}