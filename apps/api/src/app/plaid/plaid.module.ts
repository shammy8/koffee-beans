import { Module } from '@nestjs/common';
import { PlaidService } from './plaid.service';
import { PlaidController } from './plaid.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [PlaidService],
  controllers: [PlaidController],
  imports: [ConfigModule],
})
export class PlaidModule {}
