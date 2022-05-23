import { UsersRepository } from '../database/repositories';
import { UsersDTO } from '../dto/users';

export class UsersService {
    async find() {
        const repository = new UsersRepository();
        const users = await repository.find();

        return users;
    }

    async create(UsersDTO: UsersDTO) {
        const repository = new UsersRepository();
        
        if(UsersDTO.name.length > 3 && UsersDTO.password.length > 7) {
            const users = await repository.create(UsersDTO);

            return users;
        }
    }
}