import { NotesEntity } from '../entities/Notes';
import { NotesDTO } from '../../dto/notes';

export class NotesRepository {
    async find() {
        const notes = await NotesEntity.find();

        return notes;
    }

    async create(NotesDTO: NotesDTO) {
        const notes = await new NotesEntity(NotesDTO.note, NotesDTO.user_id);
        notes.save();

        return notes;
    }

    async update(NotesDTO: NotesDTO) {
        const notes = await NotesEntity.findOne(NotesDTO.id);

        if(notes) {
            notes.note = NotesDTO.note;
            await notes.save();
        }

        return notes;
    }

    async delete(noteID: number) {
        await NotesEntity.delete(noteID);
    }
}