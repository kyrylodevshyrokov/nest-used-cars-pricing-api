import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { maxNumber } from './constants';
import { toNumberInt, toNumberFloat } from '../../helpers/to-number';
export class GetEstimateDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(toNumberInt)
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(toNumberFloat)
  @IsLongitude()
  lng: number;

  @Transform(toNumberFloat)
  @IsLatitude()
  lat: number;

  @Transform(toNumberInt)
  @IsNumber()
  @Min(0)
  @Max(maxNumber)
  mileage: number;
}
