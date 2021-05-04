import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpendingsModule } from './spendings/spendings.module';
import { PlaidModule } from './plaid/plaid.module';

@Module({
  imports: [ConfigModule.forRoot(), SpendingsModule, PlaidModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
