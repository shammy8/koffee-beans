import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpendingsModule } from './spendings/spendings.module';
import { PlaidModule } from './plaid/plaid.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.0rnyh.mongodb.net/koffeeBeans?retryWrites=true&w=majority`
    ),
    SpendingsModule,
    PlaidModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
