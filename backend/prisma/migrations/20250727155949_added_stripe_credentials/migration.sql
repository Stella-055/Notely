/*
  Warnings:

  - A unique constraint covering the columns `[stripe_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "stripe_id" TEXT,
ADD COLUMN     "subscription_end" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "user_stripe_id_key" ON "user"("stripe_id");
