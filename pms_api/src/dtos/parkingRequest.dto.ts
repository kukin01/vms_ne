import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateParkingRequestDTO {

    @IsNotEmpty()
    parkingSlotId: string;

    @IsString()
    @IsNotEmpty()
    carId: string;

    @IsNotEmpty()
    car_plate_number: number;

    @IsDateString()
    @IsNotEmpty()
    checkIn: string;

    @IsDateString()
    @IsOptional()
    checkOut: string;

    @IsString()
    @IsOptional()
    status?: "PENDING" | "APPROVED" | "REJECTED";
}

export class UpdateParkingRequestDTO {
    @IsOptional()
    @IsString()
    status?: "PENDING" | "APPROVED" | "REJECTED";

    @IsOptional()
    @IsString()
    parkingSlotId?: string;
}