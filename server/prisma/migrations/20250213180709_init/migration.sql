-- CreateTable
CREATE TABLE `Departamento` (
    `idDivipola` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Departamento_nombre_idx`(`nombre`),
    PRIMARY KEY (`idDivipola`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipio` (
    `nombre` VARCHAR(191) NOT NULL,
    `idDivipola` INTEGER NOT NULL AUTO_INCREMENT,
    `departamentoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Municipio_idDivipola_idx`(`idDivipola`),
    INDEX `Municipio_nombre_idx`(`nombre`),
    INDEX `Municipio_departamentoId_fkey`(`departamentoId`),
    PRIMARY KEY (`idDivipola`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mercado` (
    `nombre` VARCHAR(191) NOT NULL,
    `fuenId` INTEGER NOT NULL AUTO_INCREMENT,
    `futId` INTEGER NOT NULL,
    `municipioId` INTEGER NOT NULL,
    `departamentoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Mercado_fuenId_idx`(`fuenId`),
    INDEX `Mercado_nombre_idx`(`nombre`),
    INDEX `Mercado_departamentoId_fkey`(`departamentoId`),
    INDEX `Mercado_municipioId_fkey`(`municipioId`),
    PRIMARY KEY (`fuenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MajorCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MajorCategory_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `majorCategoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `SubCategory_name_idx`(`name`),
    INDEX `SubCategory_majorCategoryId_fkey`(`majorCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `keystring` VARCHAR(191) NOT NULL,
    `artiId` INTEGER NOT NULL,
    `majorCategoryId` INTEGER NOT NULL,
    `subCategoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Producto_artiId_key`(`artiId`),
    INDEX `Producto_artiId_idx`(`artiId`),
    INDEX `Producto_nombre_idx`(`nombre`),
    INDEX `Producto_keystring_idx`(`keystring`),
    INDEX `Producto_majorCategoryId_fkey`(`majorCategoryId`),
    INDEX `Producto_subCategoryId_fkey`(`subCategoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MonthlyPriceObservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artiId` INTEGER NOT NULL,
    `fechaMesIni` DATETIME(3) NOT NULL,
    `fuenId` INTEGER NOT NULL,
    `fuenNombre` VARCHAR(191) NOT NULL,
    `futiId` INTEGER NOT NULL,
    `maximoKg` DOUBLE NOT NULL,
    `minimoKg` DOUBLE NOT NULL,
    `promedioKg` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `MonthlyPriceObservation_fechaMesIni_idx`(`fechaMesIni`),
    INDEX `MonthlyPriceObservation_fuenId_fkey`(`fuenId`),
    UNIQUE INDEX `MonthlyPriceObservation_artiId_fuenId_fechaMesIni_key`(`artiId`, `fuenId`, `fechaMesIni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeeklyPriceObservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artiId` INTEGER NOT NULL,
    `fechaIni` DATETIME(3) NOT NULL,
    `fuenId` INTEGER NOT NULL,
    `fuenNombre` VARCHAR(191) NOT NULL,
    `futiId` INTEGER NOT NULL,
    `maximoKg` DOUBLE NOT NULL,
    `minimoKg` DOUBLE NOT NULL,
    `promedioKg` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `WeeklyPriceObservation_fechaIni_idx`(`fechaIni`),
    INDEX `WeeklyPriceObservation_fuenId_fkey`(`fuenId`),
    UNIQUE INDEX `WeeklyPriceObservation_artiId_fuenId_fechaIni_key`(`artiId`, `fuenId`, `fechaIni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Municipio` ADD CONSTRAINT `Municipio_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`idDivipola`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mercado` ADD CONSTRAINT `Mercado_departamentoId_fkey` FOREIGN KEY (`departamentoId`) REFERENCES `Departamento`(`idDivipola`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mercado` ADD CONSTRAINT `Mercado_municipioId_fkey` FOREIGN KEY (`municipioId`) REFERENCES `Municipio`(`idDivipola`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_majorCategoryId_fkey` FOREIGN KEY (`majorCategoryId`) REFERENCES `MajorCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_majorCategoryId_fkey` FOREIGN KEY (`majorCategoryId`) REFERENCES `MajorCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonthlyPriceObservation` ADD CONSTRAINT `MonthlyPriceObservation_artiId_fkey` FOREIGN KEY (`artiId`) REFERENCES `Producto`(`artiId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MonthlyPriceObservation` ADD CONSTRAINT `MonthlyPriceObservation_fuenId_fkey` FOREIGN KEY (`fuenId`) REFERENCES `Mercado`(`fuenId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeeklyPriceObservation` ADD CONSTRAINT `WeeklyPriceObservation_artiId_fkey` FOREIGN KEY (`artiId`) REFERENCES `Producto`(`artiId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeeklyPriceObservation` ADD CONSTRAINT `WeeklyPriceObservation_fuenId_fkey` FOREIGN KEY (`fuenId`) REFERENCES `Mercado`(`fuenId`) ON DELETE RESTRICT ON UPDATE CASCADE;
