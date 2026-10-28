/*
  Warnings:

  - You are about to drop the column `number` on the `Ticket` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ticketnumber]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ticket_number_key";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "number",
ADD COLUMN     "ticketnumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketnumber_key" ON "Ticket"("ticketnumber");
