import { Entity, BaseEntity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { NotesEntity } from './Notes';

@Entity({
    name: 'users'
})
export class UsersEntity extends BaseEntity {
    @PrimaryColumn()
    id?: Number;

    @Column()
    name: String;

    @Column()
    password: String;

    @OneToMany(type => NotesEntity, note => note.user)
    note?: NotesEntity[];

    constructor(name: String, password: String) {
        super();
        this.name = name;
        this.password = password;
    }
}