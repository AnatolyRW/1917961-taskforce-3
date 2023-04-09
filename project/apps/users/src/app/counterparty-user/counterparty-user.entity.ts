import { User, UserRole } from '@project/shared/app-types'
import { SALT_ROUNDS } from './counterpaty-user.constant';
import { compare, genSalt, hash } from 'bcrypt';

export class CounterpartyUserEntity implements User {
    public _id: string;
    public name: string;
    public email: string;
    public city: string;
    public passwordHash: string;
    public role: UserRole;
    public avatar: string;
    public dateBirth: Date;

    constructor(counterpartyUser: User) {
        this.fillEntity(counterpartyUser)
    }

    public toObject() {
        return {...this};
    }

    public fillEntity(counterparty: User) {
        this._id = counterparty._id;
        this.avatar = counterparty.avatar;
        this.city = counterparty.city;
        this.dateBirth = counterparty.dateBirth;
        this.email = counterparty.email;
        this.name = counterparty.name;
        this.passwordHash = counterparty.passwordHash;
        this.role = counterparty.role;
    }
    
    public async setPassword(password: string): Promise<CounterpartyUserEntity> {
        const salt = await genSalt(SALT_ROUNDS);
        this.passwordHash = await hash(password, salt);
        return this;
    }

    public async comparePassword(password: string): Promise<boolean> {
        return compare(password, this.passwordHash)
    }
}