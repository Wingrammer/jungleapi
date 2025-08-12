import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './entities/store.entity';
import { Currency, CurrencySchema } from 'src/currency/entities/currency.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({

  imports: [
    AuthModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Store.name, schema: StoreSchema },
      { name: Currency.name, schema: CurrencySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [MongooseModule,StoreService], 
})
export class StoreModule {}
