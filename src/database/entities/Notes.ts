import {Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { UsersEntity } from './Users';

@Entity({
    name: 'notes'
})
export class NotesEntity extends BaseEntity {
    @PrimaryColumn()
    id?: number;

    @Column()
    note: string;

    @Column()
    user_id: number;

    @ManyToOne(type => UsersEntity, user => user.note)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user?: UsersEntity;

    constructor(note: string, user_id: number) {
        super();
        this.note = note;
        this.user_id = user_id;
    }
}
