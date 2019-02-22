# Host: localhost  (Version: 5.5.53)
# Date: 2018-06-19 11:45:04
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "code"
#

DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `expect` bigint(1) NOT NULL DEFAULT '0',
  `code` varchar(50) NOT NULL DEFAULT '',
  `type` varchar(10) NOT NULL DEFAULT '',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `expect` (`expect`,`type`)
) ENGINE=MyISAM AUTO_INCREMENT=26580 DEFAULT CHARSET=utf8 COMMENT='彩票数据表';

#
# Structure for table "code1"
#

DROP TABLE IF EXISTS `code1`;
CREATE TABLE `code1` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `expect` bigint(1) NOT NULL DEFAULT '0',
  `code` varchar(50) NOT NULL DEFAULT '',
  `type` varchar(10) NOT NULL DEFAULT '',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `expect` (`expect`,`type`)
) ENGINE=MyISAM AUTO_INCREMENT=4369 DEFAULT CHARSET=utf8;
