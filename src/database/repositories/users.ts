import { UsersEntity } from '../entities/Users';
import { UsersDTO } from '../../dto/users';

export class UsersRepository {
    async find() {
        const usersName = await UsersEntity.find();

        return usersName;
    }

    async create(UsersDTO: UsersDTO) {
        const users = await new UsersEntity(UsersDTO.name, UsersDTO.password);
        
        users.save();

        return users;
    }
}