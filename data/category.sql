/*
Navicat MySQL Data Transfer

Source Server         : msyql
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : study2020

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-01-19 12:10:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `cate_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin DEFAULT '' COMMENT '分类名称',
  `sort` smallint(6) DEFAULT NULL COMMENT '排序字符串',
  `add_date` datetime DEFAULT NULL COMMENT '添加时间',
  PRIMARY KEY (`cate_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '体育', '0', '2021-01-13 22:50:08');
INSERT INTO `category` VALUES ('2', '财经', '2', '2021-01-14 22:50:13');
INSERT INTO `category` VALUES ('3', '军事', '3', '2021-01-22 22:50:17');
INSERT INTO `category` VALUES ('4', '娱乐', '1', '2021-01-23 22:50:22');
INSERT INTO `category` VALUES ('5', '生活', '4', '2021-01-18 22:50:26');
INSERT INTO `category` VALUES ('6', 'a', null, null);
INSERT INTO `category` VALUES ('7', '代码', null, null);
INSERT INTO `category` VALUES ('8', 'd', null, null);
INSERT INTO `category` VALUES ('9', 'dr', null, null);
