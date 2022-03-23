CREATE TABLE `userPositions` (
  `id` char(36) NOT NULL,
  `position` integer NOT NULL,
  `userId` char(36) NOT NULL,
  `raceId` char(36) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_positions_user_id_index` (`userId`),
  KEY `user_positions_race_id_index` (`raceId`),
  CONSTRAINT `user_positions_user_id_foreign` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `user_positions_race_id_foreign` FOREIGN KEY (`raceId`) REFERENCES `races` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
