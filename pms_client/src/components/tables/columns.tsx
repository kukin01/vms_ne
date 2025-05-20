import { ColumnDef } from "@tanstack/react-table";
import { clsx } from "clsx";

export interface Users {
  id?: string;
  names: string;
  email: string;
  role: string;
  telephone: string;
}

export interface EntryCar {
  id?: string;
  plateNumber: string;
  parking_code: string;
  status?: string;
  userId?: string;
  entry_time?: Date;
  exit_time?: Date;
  charged_amount?: number;
}
 
export interface AvailableParkingSlots {
  id?: string;
  slotNumber: number;
  isAvailable: boolean;
  charging_fee_per_hour: number;
  parking_name: string;
}

export interface Requests {
  id?: string;
  userId: string;
  vehicleId: string;
  parkingSlotId?: string;
  checkIn?: string;
  checkOut?: string;
  status?: string;
  car_plate_number?: string;
}

export interface Slots {
  id?: string;
  slotNumber: number;
  isAvailable: boolean;
  charging_fee_per_hour: number;
  parking_name: string;
  location: string;
  available_space: number;
}

//user columns 
export const userColumns = (): ColumnDef<Users>[] => [
  {
    accessorKey: "names",
    header: "Username",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "telephone",
    header: "Phone number",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: (info) => info.getValue(),
  }
];

// VEHICLE COLUMNS
export const vehicleColumns = (): ColumnDef<EntryCar>[] => [
  {
    accessorKey: "plateNumber",
    header: "Plate Number",
  },
  {
    accessorKey: "parking_code",
    header: "Parking Code",
  },
  {
    accessorKey: "entry_time",
    header: "Entry Time",
  },
  {
    accessorKey: "exit_time",
    header: "Exit Time",
  },
  {
    accessorKey: "charged_amount",
    header: "Charged Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
  {
    accessorKey: "parkingSlotId",
    header: "Parking Slot ID",
  },
];

// REQUEST COLUMNS
export const requestColumns = (): ColumnDef<Requests>[] => [
  {
    accessorKey: "parkingSlot.slotNumber",
    header: "Parking Slot",
    cell: (info) => info.getValue() || "Not yet assigned",
  },
  {
    accessorKey: "vehicle.plateNumber",
    header: "Plate Number",
    cell: (info) => info.getValue() || "Not yet assigned",
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
    cell: (info) => {
      const value = info.getValue() as string | null;
      if (!value) return "—";
      const date = new Date(value);
      return date.toLocaleString(); // Formats to "MM/DD/YYYY, HH:MM:SS"
    },
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
    cell: (info) => {
      const value = info.getValue() as string | null;
      if (!value) return "—";
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "car_plate_number",
    header: "Car Plate Number",
    cell: (info) => info.getValue() || "Not yet assigned",
  },
  {
    accessorKey: "parkingSlot.slotNumber",
    header: "Parking Slot",
    cell: (info) => info.getValue() || "Not yet assigned",
  },
  {
    accessorKey: "requestedAt",
    header: "Requested date",
    cell: (info) => {
      const value = info.getValue() as string | null;
      if (!value) return "—";
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as string;

      const statusColor = {
        PENDING: "bg-yellow-100 text-yellow-800",
        APPROVED: "bg-green-100 text-green-800",
        REJECTED: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={clsx(
            "px-2 py-1 rounded-full text-sm font-medium",
            statusColor[status as keyof typeof statusColor] ||
              "bg-gray-100 text-gray-800"
          )}
        >
          {status}
        </span>
      );
    },
  },
];

//AVAILABLE PARKING SLOTS COLUMNS
export const availableParkingSlotsColumns = (): ColumnDef<AvailableParkingSlots>[] => [
  {
    accessorKey: "slotNumber",
    header: "Slot Number",
  },
  {
    accessorKey: "parking_name",
    header: "Parking Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "available_space",
    header: "Available Space",
  },
  {
    accessorKey: "charging_fee_per_hour",
    header: "Charging Fee per Hour",
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: (info) =>
      info.getValue() ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-red-600 font-medium">No</span>
      ),
  },
];

// SLOT COLUMNS
export const slotColumns = (): ColumnDef<Slots>[] => [
  {
    accessorKey: "slotNumber",
    header: "Slot Number",
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: (info) =>
      info.getValue() ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-red-600 font-medium">No</span>
      ),
  },
  {
    accessorKey: "charging_fee_per_hour",
    header: "Charging Fee per Hour",
  },
  {
    accessorKey: "parking_name",
    header: "Parking Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "available_space",
    header: "Available Space",
  },
];
