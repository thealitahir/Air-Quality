import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../shared/typeorm/typeorm.service';
export const ExternalModules = [
  ConfigModule.forRoot(),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
];
