CREATE TABLE IF NOT EXISTS `card` (
  `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `card_type` ENUM('технарь', 'мэнеджер', 'продажник') NOT NULL,
  `card_type_arg` varchar(255) DEFAULT NULL, -- дополнительный аргумент, зависит от типа карты
  `card_location` varchar(16) NOT NULL,
  `card_location_arg` int(11) NOT NULL,
  `event_type` varchar(50) DEFAULT NULL, -- описание события (например, "плюс 2", "плюс 3")
  `event_value` int(11) DEFAULT NULL, -- значение события, например, 2 или 3
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;