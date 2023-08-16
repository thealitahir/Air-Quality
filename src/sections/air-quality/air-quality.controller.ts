import {
  Controller,
  Get,
  Res,
  Query,
} from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { Response } from 'express';
import {PostgreStatusCode, ServerStatus} from '../../common/enums/enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponseTags } from '../../common/helper/decorators/api-response-tags.decorator';
import { NearestCityDto } from './dto/request.dto';
import { Cron, CronExpression } from '@nestjs/schedule';


@ApiTags('air-quality')
@ApiBearerAuth('Authorization')
@ApiResponseTags()
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
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
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
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async saveNearestCityPollutionData() {
    console.log("cron running")
    const lat = '48.856613'
    const lon = '2.352222'
    const pollutionData = await this.airService.findNearestCity({ lat, lon })
    if(pollutionData.Status === ServerStatus.success) {
      await this.airService.saveCityPollutionData(pollutionData)
    }
  }
}
