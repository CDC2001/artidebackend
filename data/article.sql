/*
Navicat MySQL Data Transfer

Source Server         : msyql
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : study2020

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-01-19 12:10:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `art_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_bin DEFAULT '' COMMENT '标题',
  `comtent` text COLLATE utf8_bin COMMENT '文章内容',
  `cat_id` int(11) DEFAULT NULL COMMENT '文章所属分类',
  `author` varchar(100) COLLATE utf8_bin DEFAULT '' COMMENT '发布作者',
  `cover` varchar(200) COLLATE utf8_bin DEFAULT '' COMMENT '封面',
  `status` tinyint(4) DEFAULT '0' COMMENT '文章状态 0-未发布  1-已发布 2-审核中',
  `publish_date` datetime DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`art_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of article
-- ----------------------------
