import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../common/services/base.service';
import { Repository } from 'typeorm';
import { AirQuality } from '../../entities/airQuality.entity';
import { IQAirService } from '../../common/services/iqAir.service';
import { NearestCityDto } from './dto/request.dto';
import { IQ_AIR_STATUSES, ServerStatus } from '../../common/enums/enums';

@Injectable()
export class AirQualityService {
  private airRep: BaseService<AirQuality>;

  constructor(
    @InjectRepository(AirQuality)
    private airRepository: Repository<AirQuality>,
    public iqAirService: IQAirService
  ) {
    this.airRep = new BaseService<AirQuality>(
      this.airRepository,
      AirQuality.name,
      null,
    );
  }

  async findNearestCity(query:NearestCityDto): Promise<any> {
    const result =  await this.iqAirService.nearestCityData(query)
    if(result.status === IQ_AIR_STATUSES.success) {
      const { data: { current: {pollution} } } = result
      if (pollution) return {Status:ServerStatus.success, Result:{pollution} }
    }
  }

  async saveCityPollutionData(body): Promise<any> {
    const polutionData = body.Result.pollution
    const {ts,aqius,aqicn,mainus,maincn} = polutionData
    const payload = {
      polutionJson:polutionData,
      datetime:new Date(),
      ts,
      aqicn,
      aqius,
      maincn,
      mainus
    }
    const result =  await this.airRep.save(payload)
    if (result) return {Status:ServerStatus.success, Result:result }
    else throw 'Data not saved'
  }

  async getMostPopulatedData(): Promise<any> {
    const mostPopulatedData = await this.airRepository.find({
      select:['ts'],
      order: {
        aqius: 'DESC',
        datetime: 'DESC',
      },
      take: 1,
    });
    const datetime = mostPopulatedData[0].ts
    return {Status:ServerStatus.success, Result:{datetime} }
  }
}
