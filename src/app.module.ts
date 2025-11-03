import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PasajesModule } from './pasajes/pasajes.module';
import { ColectivosModule } from './colectivos/colectivos.module';
import { ViajesModule } from './viajes/viajes.module';
import { DestinosModule } from './destinos/destinos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // permite usar process.env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'tiziano06',
      database: process.env.DB_NAME || 'boleteria_db',
      synchronize: true, // ⚠️ solo en desarrollo
      autoLoadEntities: true,
      retryAttempts: 5,
      retryDelay: 3000,
    }),
    ColectivosModule,
    ViajesModule,
    PasajesModule,
    DestinosModule,
  ],
})
export class AppModule {}
