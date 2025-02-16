/*
  Warnings:

  - You are about to drop the column `futiId` on the `MonthlyPriceObservation` table. All the data in the column will be lost.
  - You are about to drop the column `futiId` on the `WeeklyPriceObservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `MonthlyPriceObservation` DROP COLUMN `futiId`;

-- AlterTable
ALTER TABLE `WeeklyPriceObservation` DROP COLUMN `futiId`;
