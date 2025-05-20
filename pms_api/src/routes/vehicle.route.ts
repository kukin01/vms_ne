import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller";
import { checkAdmin, checkLoggedIn } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { RegisterEntryVehicleDTO, UpdateVehicleDTO } from "../dtos/vehicle.dto";

const router = Router();

router.post("/", checkLoggedIn, validationMiddleware(RegisterEntryVehicleDTO), vehicleController.createVehicle);
router.get("/getMyVehicles", checkLoggedIn, vehicleController.getUserVehicles);
router.get("/:id", checkLoggedIn, vehicleController.getVehicleById);
router.put("/:id", checkLoggedIn, validationMiddleware(UpdateVehicleDTO, true), vehicleController.updateEntryCar);
router.delete("/:id", checkLoggedIn, vehicleController.deleteVehicle);

export default router;
