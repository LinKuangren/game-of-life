-- CreateTable
CREATE TABLE `Configuration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `illustration` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `boundingBox` VARCHAR(191) NOT NULL,
    `nbCellules` INTEGER NOT NULL,
    `periode` INTEGER NOT NULL,
    `speed` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
