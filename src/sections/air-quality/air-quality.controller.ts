import {
  Controller,
  Get,
  Res,
  Query,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { Response } from 'express';
import {LatLngData, PostgreStatusCode, ServerStatus} from '../../common/enums/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from '../../common/helper/decorators/api-response-tags.decorator';
import { NearestCityDto } from './dto/request.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpExceptionFilter } from '../../common/helper/exception-filter';


@ApiTags('air-quality')
@ApiBearerAuth('Authorization')
@ApiResponseTags()
@UseFilters(HttpExceptionFilter)
@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airService: AirQualityService) {}

  @Get('/nearest-city')
  async findNearestCity(
    @Res() response: Response,
    @Query() query: NearestCityDto
  ) {
    try {
      const data = await this.airService.findNearestCity(query);
      response.status(PostgreStatusCode.SuccessCode).send(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/most-populated')
  async mostPopulated(
    @Res() response: Response,
  ) {
    try {
      const data = await this.airService.getMostPopulatedData();
      response.status(PostgreStatusCode.SuccessCode).send(data);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async saveNearestCityPollutionData() {
    const lat = LatLngData.lat
    const lon = LatLngData.lng
    const pollutionData = await this.airService.findNearestCity({ lat, lon })
    if(pollutionData.Status === ServerStatus.success) {
      await this.airService.saveCityPollutionData(pollutionData)
    }
  }
}
