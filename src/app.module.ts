import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address/entities/address.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.TYPEORM_DATABASE || './data/db.sqlite',
      entities: [Address],
      synchronize: true, // Crée automatiquement les tables (dev only)
    }),

    AddressModule,  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


