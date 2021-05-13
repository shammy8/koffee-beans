import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  providers: [PlaidService],
  controllers: [PlaidController],
  imports: [ConfigModule, UserModule],
})
export class PlaidModule {}
