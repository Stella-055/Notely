/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `entry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "entry_id_key" ON "entry"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
