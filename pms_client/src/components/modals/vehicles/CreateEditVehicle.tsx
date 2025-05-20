import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { createVehicle, updateVehicle } from "../../../services/vehicleService";

interface CreateEditVehicleProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleToEdit?: {
    id?: string;
    plateNumber: string;
    status?: string;
    userId?: string;
    entry_time?: Date;
    exit_time?: Date;
    charged_amount?: number;
    parking_code?: string;
  } | null;
  onSuccess: () => void;
}

interface VehicleFormData {
  plateNumber: string;
  status: string;
  userId: string;
  entry_time: Date;
  exit_time: Date;
  charged_amount: number;
  parking_code: string;
}

const CreateEditVehicle: React.FC<CreateEditVehicleProps> = ({
  isOpen,
  onOpenChange,
  vehicleToEdit,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vehicleToEdit) {
      reset({
        plateNumber: vehicleToEdit.plateNumber,
        status: vehicleToEdit.status,
        userId: vehicleToEdit.userId,
        entry_time: vehicleToEdit.entry_time,
        exit_time: vehicleToEdit.exit_time,
        charged_amount: vehicleToEdit.charged_amount,
        parking_code: vehicleToEdit.parking_code,
      });
    } else {
      reset({});
    }
  }, [vehicleToEdit, reset]);

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);
    try {
      if (vehicleToEdit) {
        await updateVehicle(vehicleToEdit.id || "", data);
      } else {
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).id : "";
        await createVehicle({ ...data, userId });
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save vehicle", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {vehicleToEdit ? "Edit Vehicle" : "Create Vehicle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Plate Number</label>
            <Input {...register("plateNumber", { required: true })} />
            {errors.plateNumber && (
              <p className="text-red-600">Plate Number is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <Input {...register("status", { required: true })} />
            {errors.status && <p className="text-red-600">Status is required</p>}
          </div>
          <div>
            <label className="block mb-1">User ID</label>
            <Input {...register("userId", { required: true })} />
            {errors.userId && <p className="text-red-600">User ID is required</p>}
          </div>
          <div>
            <label className="block mb-1">Entry Time</label>
            <Input {...register("entry_time", { required: true })} />
            {errors.entry_time && <p className="text-red-600">Entry Time is required</p>}
          </div>
          <div>
            <label className="block mb-1">Exit Time</label>
            <Input {...register("exit_time", { required: true })} />
            {errors.exit_time && <p className="text-red-600">Exit Time is required</p>}
          </div>
          <div>
            <label className="block mb-1">Charged Amount</label>
            <Input {...register("charged_amount", { required: true })} />
            {errors.charged_amount && <p className="text-red-600">Charged Amount is required</p>}
          </div>
          <div>
            <label className="block mb-1">Parking Code</label>
            <Input {...register("parking_code", { required: true })} />
            {errors.parking_code && <p className="text-red-600">Parking Code is required</p>}
          </div>                    
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditVehicle;
