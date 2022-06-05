ALTER TABLE `races` CHANGE createdAt createdAt timestamp NOT NULL default CURRENT_TIMESTAMP;
ALTER TABLE `rounds` CHANGE createdAt createdAt timestamp NOT NULL default CURRENT_TIMESTAMP;
ALTER TABLE `sessions` CHANGE createdAt createdAt timestamp NOT NULL default CURRENT_TIMESTAMP;
ALTER TABLE `users` CHANGE createdAt createdAt timestamp NOT NULL default CURRENT_TIMESTAMP;
ALTER TABLE `userPositions` CHANGE createdAt createdAt timestamp NOT NULL default CURRENT_TIMESTAMP;
