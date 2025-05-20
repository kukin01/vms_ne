import { Request, Response } from "express";
import prisma from "../../prisma/prisma-client";
import { RegisterEntryVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { AuthRequest } from "../types";

const createVehicle : any = async (req: AuthRequest, res: Response) => {
    const dto = plainToInstance(RegisterEntryVehicleDTO, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    const existingVehicle = await prisma.entry_car.findFirst({
        where: {
            plateNumber: dto.plate_number,
        },
    });
    if (existingVehicle) {
        return res.status(400).json({ message: "Vehicle with this plate number already exists" });
    }

    try {
        const entryCar = await prisma.entry_car.create({
            data: {
                plateNumber: dto.plate_number,
                parking_code: dto.parking_code,
                entry_time: dto.entry_time,
                userId: req.user.id,
                status: "PENDING",
                charged_amount: dto.charged_amount,
                exit_time: dto.exit_time,
            },  
        });
        return res.status(201).json(entryCar);
    } catch (error) {
        return res.status(500).json({ message: "Failed to create vehicle", error });
    }
};

const updateEntryCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    const dto = plainToInstance(UpdateVehicleDTO, req.body);
    const errors = await validate(dto, { skipMissingProperties: true });
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        //get the current entry car record
        const currentEntryCar = await prisma.entry_car.findUnique({
            where: { id },
            include: {
                parking_lot: true // Include parking lot to get charging fee
            }
        });

        if (!currentEntryCar) {
            return res.status(404).json({ message: "Entry car record not found" });
        }

        // Calculate charged amount if exit time is being set
        let chargedAmount = currentEntryCar.charged_amount;
        if (dto.exit_time && !currentEntryCar.exit_time) {
            const entryTime = currentEntryCar.entry_time;
            const exitTime = new Date(dto.exit_time);
            const hoursDiff = (exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60);
            chargedAmount = Math.ceil(hoursDiff * currentEntryCar.parking_lot.charging_fee_per_hour);
        }

        const entryCar = await prisma.entry_car.update({
            where: { id },
            data: {
                plateNumber: dto.plateNumber,
                parking_code: dto.parking_code,
                entry_time: dto.entry_time,
                exit_time: dto.exit_time,
                status: dto.status,
                charged_amount: chargedAmount,
            },
        });
        return res.status(200).json(entryCar);
    } catch (error) {
        return res.status(500).json({ message: "Failed to update vehicle", error });
    }
}

const getUserVehicles:any = async (req: AuthRequest , res: Response) => {
    try {
        const vehicles = await prisma.entry_car.findMany({
            where: { userId: req.user.id },
        });
        return res.status(200).json(vehicles);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch vehicles", error });
    }
};

const getVehicleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const vehicle = await prisma.entry_car.findUnique({
            where: { id },
        });
        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }
        return res.status(200).json(vehicle);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch vehicle", error });
    }
};


const deleteVehicle = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.entry_car.delete({
            where: { id },
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete vehicle", error });
    }
};

const vehicleController = {
    createVehicle,
    getUserVehicles,
    getVehicleById,
    updateEntryCar,
    deleteVehicle,
};

export default vehicleController;
