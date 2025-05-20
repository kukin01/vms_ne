import { IsInt, IsBoolean, IsOptional, Min, IsString } from "class-validator";

export class CreateParkingSlotDto {
  @IsInt()
  @Min(1)
  parking_number: number;

  @IsInt()
  @Min(1)
  code: string;

  @IsInt()
  @Min(1)
  available_space:number;

  @IsString()
  location: string;

  @IsString()
  @IsOptional()
  parking_name: string;

  @IsInt()
  @Min(1)
  charging_fee_per_hour: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}

export class UpdateParkingSlotDto {
  @IsInt()
  @Min(1)
  @IsOptional()
  slotNumber?: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}


