import { Test } from "@nestjs/testing";
import { AirQualityController } from "./air-quality.controller";
import { AirQualityService } from "./air-quality.service";
import {  getRepositoryToken } from "@nestjs/typeorm";
import { AirQuality } from "../../entities/airQuality.entity";
import { IQAirService } from "../../common/services/iqAir.service";
import { Repository } from "typeorm";
import { NearestCityDto } from "./dto/request.dto";

class MockAirQualityService extends AirQualityService {
  async findNearestCity(query: NearestCityDto): Promise<any> {
    return {
      Status: 'Success',
      Result: {
        pollution: {/* mock pollution data */ },
      },
    };
  }

  async getMostPopulatedData(): Promise<any> {
    return {
      Status: 'Success',
      Result: {
        datetime: '',
      },
    };
  }
}

describe('findNearestCity', () => {
  let controller: AirQualityController;
  let service: AirQualityService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        {
          provide: AirQualityService, // Use the actual provider key here
          useClass: MockAirQualityService,
        },
        IQAirService,
        {
          provide: getRepositoryToken(AirQuality),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get<MockAirQualityService>(AirQualityService);
    controller = moduleRef.get<AirQualityController>(AirQualityController);
  });

  it('should return nearest city data', async () => {
    const query: NearestCityDto = {
      lat: '48.856613',
      lon: '2.352222',
    };

    const result = await service.findNearestCity(query);
    expect(result).toEqual({
      Status: 'Success',
      Result: {
        pollution: expect.any(Object),
      },
    });
  });

});

describe('getMostPopulatedData', () => {
  let controller: AirQualityController;
  let service: AirQualityService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AirQualityController],
      providers: [
        {
          provide: AirQualityService, // Use the actual provider key here
          useClass: MockAirQualityService,
        },
        IQAirService,
        {
          provide: getRepositoryToken(AirQuality),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get<MockAirQualityService>(AirQualityService);
    controller = moduleRef.get<AirQualityController>(AirQualityController);
  });

  it('should return nearest city data', async () => {
    const query: NearestCityDto = {
      lat: '48.856613',
      lon: '2.352222',
    };

    const result = await service.getMostPopulatedData();
    expect(result).toEqual({
      Status: 'Success',
      Result: {
        datetime: expect.any(String),
      },
    });
  });

});


