CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `avatar` varchar(128) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (id, username, password) VALUES ('36ca8295-0e62-4b7f-bc33-3a5a6974c7c0', 'Touzet', 'password');
INSERT INTO `users` (id, username, password) VALUES ('f8498d09-a49d-4428-82cd-1e460753a2c4', 'Alves', 'password');
INSERT INTO `users` (id, username, password) VALUES ('0c206acc-0070-4546-8564-690b7be26c9a', 'Nathou', 'password');
INSERT INTO `users` (id, username, password) VALUES ('cc88a818-adb5-4e4a-bc91-045fd8890a72', 'Yass', 'password');
