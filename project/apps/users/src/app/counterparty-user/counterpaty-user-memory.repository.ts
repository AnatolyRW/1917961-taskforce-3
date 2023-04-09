import { GRUDRepository } from '@project/util/util-types'
import { CounterpartyUserEntity } from './counterparty-user.entity';
import { User } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import crypto from "crypto";

@Injectable()
export class CounterpatyUserMemoryRepository implements GRUDRepository<CounterpartyUserEntity, string, User> {
    private repository: {[key: string]: User} = {};

    public async findById(id: string): Promise<User | null> {
        if (this.repository[id]) {
            return {...this.repository[id]};
        }
        return null;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const existUser = Object.values(this.repository)
        .find((userItem) => userItem.email === email);
        if(!existUser) {
            return null;
        }
        return { ...existUser};
    }

    public async create(item: CounterpartyUserEntity): Promise<User> {
        const entry = { ...item.toObject(), _id: crypto.randomUUID()};
        this.repository[entry._id] = entry;
        return entry;
    }

    public async update(id: string, item: CounterpartyUserEntity): Promise<User> {
        this.repository[id] = { ...item.toObject(), _id: id}
        return this.findById(id);
    }

    public async destroy(id: string): Promise<void> {
        delete this.repository[id];
    }

}