/*
Navicat MySQL Data Transfer

Source Server         : msyql
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : study2020

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-01-19 12:10:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_bin DEFAULT '' COMMENT '用户名',
  `password` char(32) COLLATE utf8_bin DEFAULT '' COMMENT '定长类型使用加密密码32位',
  `avator` varchar(200) COLLATE utf8_bin DEFAULT '' COMMENT '头像图片路径',
  `last_login_date` datetime DEFAULT NULL COMMENT '上一次登陆时间',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of users
-- ----------------------------
