import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationService } from './authentication/authentication.service';
import { CounterpartyUserModule } from './counterparty-user/counterparty-user.module';

@Module({
  imports: [AuthenticationModule, CounterpartyUserModule],
  controllers: [],
  providers: [AuthenticationService],
})
export class AppModule {}
