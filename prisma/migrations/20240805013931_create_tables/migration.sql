-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL DEFAULT 1,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `type` ENUM('CLIENT', 'ADMIN') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contents` (
    `content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contents_on_categories` (
    `category_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`category_id`, `content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `file_types` (
    `file_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,
    `mime_type` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`file_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions` (
    `promotion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `final_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`promotion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promotions_on_contents` (
    `promotion_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`promotion_id`, `content_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `downloads` (
    `download_id` INTEGER NOT NULL AUTO_INCREMENT,
    `download_date` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`download_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gifts` (
    `gift_id` INTEGER NOT NULL AUTO_INCREMENT,
    `gift_date` DATETIME(3) NOT NULL,
    `sent_user_id` INTEGER NOT NULL,
    `received_user_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`gift_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ratings` (
    `rating_id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` INTEGER NOT NULL,
    `week` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,
    `rating_date` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`rating_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `download_history` (
    `download_history_id` INTEGER NOT NULL AUTO_INCREMENT,
    `download_date` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`download_history_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rankigs` (
    `raking_id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` INTEGER NOT NULL,
    `week` INTEGER NOT NULL,
    `content_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`raking_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders_balances` (
    `order_balance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `request_balance` DOUBLE NOT NULL,
    `state_order` ENUM('PENDING', 'ACCEPTED', 'REJECTED') NOT NULL,
    `order_data` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`order_balance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contents_on_categories` ADD CONSTRAINT `contents_on_categories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contents_on_categories` ADD CONSTRAINT `contents_on_categories_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `contents`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotions_on_contents` ADD CONSTRAINT `promotions_on_contents_promotion_id_fkey` FOREIGN KEY (`promotion_id`) REFERENCES `promotions`(`promotion_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promotions_on_contents` ADD CONSTRAINT `promotions_on_contents_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `contents`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `downloads` ADD CONSTRAINT `downloads_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `downloads` ADD CONSTRAINT `downloads_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `contents`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gifts` ADD CONSTRAINT `gifts_sent_user_id_fkey` FOREIGN KEY (`sent_user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gifts` ADD CONSTRAINT `gifts_received_user_id_fkey` FOREIGN KEY (`received_user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gifts` ADD CONSTRAINT `gifts_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `contents`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ratings` ADD CONSTRAINT `ratings_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `contents`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `download_history` ADD CONSTRAINT `download_history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `download_history` ADD CONSTRAINT `download_history_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `contents`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rankigs` ADD CONSTRAINT `rankigs_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `contents`(`content_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders_balances` ADD CONSTRAINT `orders_balances_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
