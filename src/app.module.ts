import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasajesModule } from './pasajes/pasajes.module';
import { ColectivosModule } from './colectivos/colectivos.module';
import { ViajesModule } from './viajes/viajes.module';
import { DestinosModule } from './destinos/destinos.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tiziano06', // poné tu contraseña si tiene
      database: 'boleteria_db',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ solo en desarrollo
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    
    }),
    ColectivosModule,
    ViajesModule,
    PasajesModule,
    DestinosModule,
  ],
})
export class AppModule {}
