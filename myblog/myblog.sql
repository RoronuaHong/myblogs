-- phpMyAdmin SQL Dump
-- version 2.11.2.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 01 月 17 日 09:34
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `myblog`
--

-- --------------------------------------------------------

--
-- 表的结构 `phoneadmin`
--

CREATE TABLE `phoneadmin` (
  `id` int(10) NOT NULL auto_increment,
  `name` varchar(10) collate utf8_unicode_ci NOT NULL,
  `phonename` char(11) collate utf8_unicode_ci default NULL,
  `password` varchar(32) collate utf8_unicode_ci default NULL,
  `joindate` date default NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- 导出表中的数据 `phoneadmin`
--

INSERT INTO `phoneadmin` (`id`, `name`, `phonename`, `password`, `joindate`) VALUES
(1, 'Slim', '18606977713', 'dx.78land.com', NULL),
(2, 'Luo', '18959351507', 'a1234560', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `skillname`
--

CREATE TABLE `skillname` (
  `id` int(20) NOT NULL auto_increment,
  `name` varchar(1000) collate utf8_unicode_ci default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- 导出表中的数据 `skillname`
--

INSERT INTO `skillname` (`id`, `name`) VALUES
(1, '熟悉原生JavaScript，能够脱离jQuery进行开发'),
(2, '能使用合理的结构和样式编写兼容主流浏览器的页面；');

-- --------------------------------------------------------

--
-- 表的结构 `skillrelation`
--

CREATE TABLE `skillrelation` (
  `id` int(20) NOT NULL default '0',
  `skilltable_id` int(20) default NULL,
  `skillname_id` int(20) default NULL,
  PRIMARY KEY  (`id`),
  KEY `skilltable_id` (`skilltable_id`),
  KEY `skillname_id` (`skillname_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 导出表中的数据 `skillrelation`
--

INSERT INTO `skillrelation` (`id`, `skilltable_id`, `skillname_id`) VALUES
(1, 1, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- 表的结构 `skilltable`
--

CREATE TABLE `skilltable` (
  `id` int(20) NOT NULL auto_increment,
  `name` varchar(20) collate utf8_unicode_ci default NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=3 ;

--
-- 导出表中的数据 `skilltable`
--

INSERT INTO `skilltable` (`id`, `name`) VALUES
(1, 'JavaScript'),
(2, 'HTML&CSS');

-- --------------------------------------------------------

--
-- 表的结构 `webadmin`
--

CREATE TABLE `webadmin` (
  `id` int(10) NOT NULL auto_increment,
  `name` varchar(10) collate utf8_unicode_ci NOT NULL,
  `webname` char(32) collate utf8_unicode_ci default NULL,
  `password` char(32) collate utf8_unicode_ci default NULL,
  `joindate` date default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=17 ;

--
-- 导出表中的数据 `webadmin`
--

INSERT INTO `webadmin` (`id`, `name`, `webname`, `password`, `joindate`) VALUES
(1, 'Slim', 'a18606977713', 'dx.78land.com', NULL),
(2, 'Luo', 'a18959351507', 'a1234560', NULL),
(8, 'sm', 'aaa123123123', '123123', NULL),
(9, '234', 'a123234', '234', NULL),
(11, '1231232321', 'a189593508555', '123', NULL),
(12, '123sdfsf', 'a65dfg', '123', NULL),
(13, '12312', 'a12312', '123', NULL),
(14, '123', 'asdaasd', '1231', NULL),
(15, 'asdasdasd', 'a123aasd', 'a11', NULL),
(16, '123', 'a123123t', '123', NULL);

--
-- 限制导出的表
--

--
-- 限制表 `skillrelation`
--
ALTER TABLE `skillrelation`
  ADD CONSTRAINT `skillrelation_ibfk_1` FOREIGN KEY (`skilltable_id`) REFERENCES `skilltable` (`id`),
  ADD CONSTRAINT `skillrelation_ibfk_2` FOREIGN KEY (`skillname_id`) REFERENCES `skillname` (`id`);
