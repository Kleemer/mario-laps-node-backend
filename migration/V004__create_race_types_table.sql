CREATE TABLE `raceTypes` (
  `id` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `raceTypes` (id, name) VALUES ('animal-crossing', 'Animal Crossing');
INSERT INTO `raceTypes` (id, name) VALUES ('big-blue', 'Big Blue');
INSERT INTO `raceTypes` (id, name) VALUES ('mount-wario', 'Descente Givrée');
INSERT INTO `raceTypes` (id, name) VALUES ('baby-park', 'Parc Baby');
INSERT INTO `raceTypes` (id, name) VALUES ('rainbow-road-wii-u', 'Route Arc-En-Ciel');
