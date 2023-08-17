import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../shared/typeorm/typeorm.service';
import { CacheModule } from '@nestjs/cache-manager';
export const ExternalModules = [
  ConfigModule.forRoot(),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
];
