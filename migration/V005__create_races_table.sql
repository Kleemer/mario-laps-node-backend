CREATE TABLE `races` (
  `id` char(36) NOT NULL,
  `withLap` tinyint(1) NOT NULL DEFAULT '0',
  `roundId` char(36) NOT NULL,
  `raceTypeId` char(36) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `races_round_id_index` (`roundId`),
  KEY `races_race_type_id_index` (`raceTypeId`),
  CONSTRAINT `races_round_id_foreign` FOREIGN KEY (`roundId`) REFERENCES `rounds` (`id`),
  CONSTRAINT `races_race_type_id_foreign` FOREIGN KEY (`raceTypeId`) REFERENCES `raceTypes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
