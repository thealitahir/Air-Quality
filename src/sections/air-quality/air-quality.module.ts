import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirQuality } from '../../entities/airQuality.entity';
import { IQAirService } from '../../common/services/iqAir.service';

@Module({
  imports: [TypeOrmModule.forFeature([AirQuality])],
  controllers: [AirQualityController],
  providers: [AirQualityService,IQAirService],
})
export class AirQualityModule {}
