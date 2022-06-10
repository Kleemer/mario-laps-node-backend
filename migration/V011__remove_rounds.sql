-- add sessionId on races
ALTER TABLE `races`
  ADD `sessionId` char(36) NOT NULL;
ALTER TABLE `races`
  ADD KEY `rounds_session_id_index` (`sessionId`);

-- copy rounds sessionId to races
UPDATE races AS r1
  INNER JOIN rounds AS r2 ON r1.roundId = r2.id
SET r1.sessionId = r2.sessionId;

-- remove roundId from races
ALTER TABLE `races`
  DROP FOREIGN KEY `races_round_id_foreign`;
ALTER TABLE `races`
  DROP KEY `races_round_id_index`;
ALTER TABLE `races`
  DROP COLUMN `roundId`;

-- drop rounds
DROP TABLE `rounds`;

-- add foreign key on races
ALTER TABLE `races`
  ADD CONSTRAINT `races_session_id_foreign`
    FOREIGN KEY (`sessionId`)
    REFERENCES `sessions` (`id`)
    ON DELETE CASCADE;
