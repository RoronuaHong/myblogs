-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2017-02-11 13:55:09
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myblog`
--

-- --------------------------------------------------------

--
-- 表的结构 `phoneadmin`
--

CREATE TABLE `phoneadmin` (
  `id` int(10) NOT NULL,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `phonename` char(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `joindate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `phoneadmin`
--

INSERT INTO `phoneadmin` (`id`, `name`, `phonename`, `password`, `joindate`) VALUES
(1, 'Slim', '18606977713', 'dx.78land.com', NULL),
(2, 'Luo', '18959351507', 'a1234560', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `t_skilltitle`
--

CREATE TABLE `t_skilltitle` (
  `id` int(20) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `process` text COLLATE utf8_unicode_ci NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `t_skilltitle`
--

INSERT INTO `t_skilltitle` (`id`, `name`, `process`, `content`) VALUES
(3, 'JavaScript', '80%', '1.精通原生Javascript，能脱离jQuery等类库编码；;2.能运用模块化、面向对象的方式编程；;3.熟悉正则表达式的使用；;'),
(4, 'HTML & CSS', '75%', '1.能使用合理的结构和样式编写兼容主流浏览器的页面；;2.能适当运用CSS 3使页面在现代浏览器上效果更佳；;3.能熟练运用REM单位实现不同浏览器宽度下的整页缩放；;4.能熟练使用Chrome开发者工具辅助开发;;'),
(5, 'Node.js', '40%', '1.熟悉命令行工具的开发；;2.熟悉基于Express的Web开发;;'),
(6, 'Angular.js', '50%', '1.熟悉使用Angular.js进行web网页开发;'),
(7, 'others', '80%', '1.熟悉webpack的使用；;2.熟悉gulp，并能用其进行css、js的压缩合并等功能；;3.熟悉使用npm和自动化工具进行辅助开发；;4.熟悉less、sass等工具进行web开发;');

-- --------------------------------------------------------

--
-- 表的结构 `webadmin`
--

CREATE TABLE `webadmin` (
  `id` int(10) NOT NULL,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `webname` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `joindate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `webadmin`
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
-- Indexes for dumped tables
--

--
-- Indexes for table `phoneadmin`
--
ALTER TABLE `phoneadmin`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `t_skilltitle`
--
ALTER TABLE `t_skilltitle`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `webadmin`
--
ALTER TABLE `webadmin`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `phoneadmin`
--
ALTER TABLE `phoneadmin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `t_skilltitle`
--
ALTER TABLE `t_skilltitle`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `webadmin`
--
ALTER TABLE `webadmin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
