/*
  Warnings:

  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `employeeId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Attendance` table. All the data in the column will be lost.
  - The `id` column on the `Attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Made the column `checkIn` on table `Attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
DROP COLUMN "employeeId",
DROP COLUMN "status",
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "checkIn" SET NOT NULL,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
