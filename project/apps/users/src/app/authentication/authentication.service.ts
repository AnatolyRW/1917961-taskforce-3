import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CounterpatyUserMemoryRepository } from '../counterparty-user/counterpaty-user-memory.repository';
import { CreateUserDto } from './dto/create-user.dto';
import dayjs from 'dayjs';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { CounterpartyUserEntity } from '../counterparty-user/counterparty-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthenticationService {
    constructor (
        private readonly counterpatyUserRepository: CounterpatyUserMemoryRepository
    ) {}

    public async register (dto: CreateUserDto) {
        const { name, email, city, password, role, avatar, dateBirth }  = dto;
        const counterpatyUser = {
            name: name,
            email: email,
            city: city,
            passwordHash: '',
            role: role,
            avatar: avatar,
            dateBirth: dayjs(dateBirth).toDate(),
        }
        const existUser = await this.counterpatyUserRepository.findByEmail(email);
        if (existUser) {
            throw new ConflictException(AUTH_USER_EXISTS);
        }
        const userEntity = await new CounterpartyUserEntity(counterpatyUser).setPassword(password)
        return this.counterpatyUserRepository.create(userEntity);
    }

    public async verifyUser (dto: LoginUserDto) {
        const { email, password } = dto;
        const existUser = await this.counterpatyUserRepository.findByEmail(email);
        if (!existUser) {
            throw new NotFoundException(AUTH_USER_NOT_FOUND);
        }
        const counterpartyUserEntity = new CounterpartyUserEntity(existUser);
        if (!await counterpartyUserEntity.comparePassword(password)) {
            throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
        }
        return counterpartyUserEntity.toObject();
    }

    public async getUser (id: string) {
        return this.counterpatyUserRepository.findById(id);
    }
}
