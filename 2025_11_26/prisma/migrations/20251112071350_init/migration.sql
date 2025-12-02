/*
  Warnings:

  - Added the required column `wpisId` to the `Komentarze` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategoriaId` to the `Wpis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `komentarze` ADD COLUMN `wpisId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `wpis` ADD COLUMN `kategoriaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Komentarze` ADD CONSTRAINT `Komentarze_wpisId_fkey` FOREIGN KEY (`wpisId`) REFERENCES `Wpis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wpis` ADD CONSTRAINT `Wpis_kategoriaId_fkey` FOREIGN KEY (`kategoriaId`) REFERENCES `Kategoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
