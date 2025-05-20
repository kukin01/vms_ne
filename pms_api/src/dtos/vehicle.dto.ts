import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength, IsEnum, Min, IsInt, IsDate } from "class-validator";

const RWANDA_PLATE_REGEX = /^RA[A-Z] \d{3}[A-Z]$/;

export enum VehicleStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
}

export class RegisterEntryVehicleDTO {
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @Matches(RWANDA_PLATE_REGEX, {
        message: 'Plate number must match Rwanda format: e.g. "RAB 123A".',
    })
    @IsNotEmpty()
    plate_number: string;

    @IsString()
    @IsNotEmpty()
    parking_code: string;

    @IsString()
    @IsNotEmpty()
    user_id: string;

    @IsDate()
    @IsOptional()
    entry_time?: Date;

    @IsDate()
    @IsOptional()
    exit_time?: Date;

    @IsInt()
    @IsOptional()
    charged_amount?: number;

    @IsString()
    @IsOptional()
    status?: VehicleStatus;
}

export class UpdateVehicleDTO {
    @IsOptional()
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @Matches(RWANDA_PLATE_REGEX, {
        message: 'Plate number must match Rwanda format: e.g. "RAB 123A".',
    })
    plateNumber?: string;

    @IsNotEmpty()
    plate_number: string;

    @IsString()
    @IsNotEmpty()
    parking_code: string;

    @IsDate()
    @IsOptional()
    entry_time?: Date;    

    @IsDate()
    @IsOptional()
    exit_time?: Date;

    @IsInt()
    @IsOptional()
    charged_amount?: number;

    @IsOptional()
    @IsEnum(VehicleStatus)
    status?: VehicleStatus;
}
