import { Module } from '@nestjs/common';
import { CounterpatyUserMemoryRepository } from './counterpaty-user-memory.repository';

@Module({
    providers: [CounterpatyUserMemoryRepository],
    exports: [CounterpatyUserMemoryRepository]
})
export class CounterpartyUserModule {}
