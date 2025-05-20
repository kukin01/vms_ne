-- CreateEnum
CREATE TYPE "roles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "verification_status" AS ENUM ('VERIFIED', 'PENDING', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "password_reset_status" AS ENUM ('PENDING', 'IDLE');

-- CreateEnum
CREATE TYPE "request_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "vehicle_status" AS ENUM ('PENDING', 'APPROVED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "password" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL DEFAULT 'https://firebasestorage.googleapis.com/v0/b/relaxia-services.appspot.com/o/relaxia-profiles%2Fblank-profile-picture-973460_960_720.webp?alt=media',
    "role" "roles" NOT NULL DEFAULT 'USER',
    "verification_status" "verification_status" NOT NULL DEFAULT 'UNVERIFIED',
    "verification_code" TEXT,
    "verification_expires" TIMESTAMP(3),
    "password_reset_status" "password_reset_status" NOT NULL DEFAULT 'IDLE',
    "password_reset_code" TEXT,
    "password_reset_expires" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry_cars" (
    "id" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "vehicle_status" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT NOT NULL,
    "entry_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "charged_amount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "entry_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exit_cars" (
    "id" TEXT NOT NULL,
    "plate_number" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "vehicle_status" NOT NULL DEFAULT 'PENDING',
    "user_id" TEXT NOT NULL,
    "entry_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exit_time" TIMESTAMP(3) NOT NULL,
    "charged_amount" INTEGER NOT NULL,

    CONSTRAINT "exit_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking_slots" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "parking_name" TEXT NOT NULL,
    "slot_number" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "charging_fee_per_hour" INTEGER NOT NULL,
    "spaces" INTEGER NOT NULL,

    CONSTRAINT "parking_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parking_requests" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "parking_slot_id" TEXT NOT NULL,
    "check_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "check_out" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "request_status" NOT NULL DEFAULT 'PENDING',
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved_at" TIMESTAMP(3),
    "exit_carId" TEXT,

    CONSTRAINT "parking_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_telephone_key" ON "users"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "entry_cars_plate_number_key" ON "entry_cars"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "exit_cars_plate_number_key" ON "exit_cars"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "parking_slots_code_key" ON "parking_slots"("code");

-- CreateIndex
CREATE UNIQUE INDEX "parking_slots_parking_name_key" ON "parking_slots"("parking_name");

-- CreateIndex
CREATE UNIQUE INDEX "parking_slots_slot_number_key" ON "parking_slots"("slot_number");

-- CreateIndex
CREATE UNIQUE INDEX "parking_slots_charging_fee_per_hour_key" ON "parking_slots"("charging_fee_per_hour");

-- AddForeignKey
ALTER TABLE "entry_cars" ADD CONSTRAINT "entry_cars_code_fkey" FOREIGN KEY ("code") REFERENCES "parking_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entry_cars" ADD CONSTRAINT "entry_cars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exit_cars" ADD CONSTRAINT "exit_cars_code_fkey" FOREIGN KEY ("code") REFERENCES "parking_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exit_cars" ADD CONSTRAINT "exit_cars_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_requests" ADD CONSTRAINT "parking_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_requests" ADD CONSTRAINT "parking_requests_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "entry_cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_requests" ADD CONSTRAINT "parking_requests_parking_slot_id_fkey" FOREIGN KEY ("parking_slot_id") REFERENCES "parking_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parking_requests" ADD CONSTRAINT "parking_requests_exit_carId_fkey" FOREIGN KEY ("exit_carId") REFERENCES "exit_cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
