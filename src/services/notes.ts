import { NotesRepository } from '../database/repositories';
import { NotesDTO } from '../dto/notes';

export class NotesService {
    async find() {
        const repository = new NotesRepository();
        const notes = await repository.find();

        return notes;
    }

    async create(NotesDTO: NotesDTO) {
        const repository = new NotesRepository();

        if(NotesDTO.note) {
            const notes = await repository.create(NotesDTO);
    
            return notes;
        }
    }

    async update(NotesDTO: NotesDTO) {
        const repository = new NotesRepository();

        if(NotesDTO.note) {
            const notes = await repository.update(NotesDTO);
    
            return notes;
        }
    }

    async delete(noteID: number) {
        const repository = new NotesRepository();
        await repository.delete(noteID);
    }
}