import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { CounterpartyUserModule } from '../counterparty-user/counterparty-user.module';

@Module({
  imports: [CounterpartyUserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
