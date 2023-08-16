import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class NearestCityDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  lat: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'This is a required property',
  })
  @IsString()
  @IsNotEmpty()
  lon: string;
}
