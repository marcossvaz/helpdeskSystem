/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `title` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_ticketId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "ticketId",
ADD COLUMN     "title" TEXT NOT NULL;
