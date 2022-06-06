ALTER TABLE `rounds`
  DROP FOREIGN KEY `rounds_session_id_foreign`;
ALTER TABLE `rounds`
  ADD CONSTRAINT `rounds_session_id_foreign`
    FOREIGN KEY (`sessionId`)
    REFERENCES `sessions` (`id`)
    ON DELETE CASCADE;
ALTER TABLE `races`
  DROP FOREIGN KEY `races_round_id_foreign`;
ALTER TABLE `races`
  ADD CONSTRAINT `races_round_id_foreign`
    FOREIGN KEY (`roundId`)
    REFERENCES `rounds` (`id`)
    ON DELETE CASCADE;
ALTER TABLE `userPositions`
  DROP FOREIGN KEY `user_positions_race_id_foreign`;
ALTER TABLE `userPositions`
  ADD CONSTRAINT `user_positions_race_id_foreign`
    FOREIGN KEY (`raceId`)
    REFERENCES `races` (`id`)
    ON DELETE CASCADE;
