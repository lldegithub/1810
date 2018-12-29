/*
Navicat MySQL Data Transfer

Source Server         : ll
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : lefengwang

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-12-29 16:04:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for items
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `oldprice` float(255,1) NOT NULL,
  `newprice` float(255,1) NOT NULL,
  `img1` varchar(255) NOT NULL,
  `img2` varchar(255) NOT NULL,
  `img3` varchar(255) NOT NULL,
  `introduction` varchar(255) NOT NULL,
  `date` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `sales` int(11) NOT NULL,
  `tip` varchar(255) NOT NULL,
  `pp` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO `items` VALUES ('1', '温碧泉 WETHERM温碧泉 盈润尊享限量礼盒 礼盒套装', '461.0', '139.0', '../img/list1.jpg', '../img/item1.jpg', '../img/logo1.jpg', '#改善油光 打造水润肌#保湿型洁面泡沫丰富，洗后清爽不紧绷，精华水改善干燥粗糙，水精华使后续保养品效果加倍，乳液好吸收不黏腻，精华霜锁水，肌肤水感轻', '2018-12-26 10:57:59', '100', '保湿补水', '温碧泉');
INSERT INTO `items` VALUES ('2', '膜法世家【珍奢黑白松露】膜法世家松露水润雪肌面膜贴尊享礼盒', '499.0', '99.0', '../img/list2.jpg', '../img/item2.jpg', '../img/logo2.png', '#肌肤的营养大餐#膜法世家松露面膜。保湿滋养，雪肌透亮。在温和滋养中细致修护肌肤，打造水润雪肌', '2018-12-26 10:58:03', '200', '保湿亮肤', '膜法世家');
INSERT INTO `items` VALUES ('3', '膜法世家【水光美肌轻松有】膜法世家水润亮采三合一蚕丝面膜贴套', '589.0', '109.0', '../img/list3.jpg', '../img/item3.jpg', '../img/logo2.png', '#补水提亮一套搞定#膜法世家补水面膜套装，睡莲水光盈润；绿豆清肌亮采；樱桃深透补水，滴滴鲜萃的植物精华，尽享水润亮泽。', '2018-12-26 10:58:06', '300', '深透补水', '膜法世家');
INSERT INTO `items` VALUES ('4', '膜法世家【熬夜党亮肤法宝】膜法世家白松露水润亮肤蚕丝面膜贴', '396.0', '79.0', '../img/list4.jpg', '../img/item4.jpg', '../img/logo2.png', '#轻松告别暗沉肌肤#白松露水润亮肤蚕丝面膜贴。补水亮肤、保湿润泽。浓浓白松露精华，一片又一片，肌肤焕发透亮光泽', '2018-12-26 10:58:09', '400', '保湿滋养', '膜法世家');
INSERT INTO `items` VALUES ('5', '膜法世家 膜法世家水嫩亮采面膜贴尊享礼包（41片+20对眼膜）', '504.0', '169.0', '../img/list5.jpg', '../img/item5.jpg', '../img/logo2.png', '#告别干燥暗沉肌#膜法世家补水嫩肤面膜，水嫩亮采，润泽美眼，不仅能够给予肌肤满满的水嫩活力，配合眼膜使用，让你由眼及面光采四溢。', '2018-12-26 10:58:12', '500', '水嫩亮彩', '膜法世家');
INSERT INTO `items` VALUES ('6', '御泥坊 御泥坊清润莹亮黑膜套装21片 补水黑膜 小肌御版', '298.0', '79.0', '../img/list6.jpg', '../img/item6.jpg', '../img/logo3.png', '#补水透亮明星同款# 御泥坊清润莹亮黑膜套装，精选龙头竹、葡萄籽等成分，具深层补水、清洁控油、提亮肤色功效！释放新鲜清爽力量!', '2018-12-26 10:58:15', '600', '定制礼盒', '御泥坊');
INSERT INTO `items` VALUES ('7', '御泥坊【明星同款补水面膜】御泥坊清透盈润面膜套装（小肌御版） ', '298.0', '79.0', '../img/list7.jpg', '../img/item7.jpg', '../img/logo3.png', '#全新升级，补水技能爆表# 御泥坊清透莹润面膜套装，天然植物精萃自然美肤，补水、锁水、养肤三维改善肌肤干燥和粗糙，激发肌肤源动力。', '2018-12-26 10:58:18', '700', '小肌御定制版', '御泥坊');
INSERT INTO `items` VALUES ('8', '瓷妆瓷妆 精准焕白修护补水白皙护肤套装（洁面乳 爽肤水 面霜）', '712.0', '99.0', '../img/list8.jpg', '../img/item8.jpg', '../img/logo4.png', '氨基酸给予小脸温柔清洁力，还有天然提亮的玫瑰水能量唤醒肌底白嫩，暗沉瑕疵挥挥啦！', '2018-12-26 10:58:22', '800', '祛黄淡斑', '瓷妆瓷妆');
INSERT INTO `items` VALUES ('9', '瓷妆瓷妆 水光焕亮调理 补水 保湿 护肤套装（洁面乳 爽肤水)', '554.0', '100.0', '../img/list9.jpg', '../img/item9.jpg', '../img/logo4.png', '补水保湿套装，一套解决肌肤缺水问题，暗沉肌不见，肌肤持久水润', '2018-12-26 10:58:28', '900', '补水保湿', '瓷妆瓷妆');
INSERT INTO `items` VALUES ('10', '阿芙【保湿焕亮】AFU阿芙玫瑰红酒护肤套组 保湿焕亮肌肤 迪士尼', '587.0', '219.0', '../img/list10.jpg', '../img/item10.jpg', '../img/logo5.jpg', '阿芙【保湿焕亮】AFU阿芙玫瑰红酒护肤套组 保湿焕亮肌肤 迪士尼', '2018-12-26 10:58:30', '1000', '保湿焕亮', '阿芙');
INSERT INTO `items` VALUES ('11', '雪肌精【元气少女】雪肌精 日本清润元气套装 化妆水330ml 保湿', '459.0', '360.0', '../img/list11.jpg', '../img/item11.jpg', '../img/logo6.png', '#满满少女感#清爽不粘腻 雪水330ml+洗颜霜20g+凝霜20g', '2018-12-26 10:58:34', '900', '镇店之宝', '雪肌精');
INSERT INTO `items` VALUES ('12', '韩束【卓越爽洁双子星】韩束男士 吾尊卓能强肤舒润两件套', '159.0', '75.0', '../img/list12.jpg', '../img/item12.jpg', '../img/logo7.png', '#卓越爽洁双子星#吾尊卓能强肤舒润两件套，深入清洁嫉妒污垢，清爽保湿，洁面+凝露，型男必备套装', '2018-12-26 10:58:36', '800', '清洁、湿润、保湿', '韩束');
INSERT INTO `items` VALUES ('13', '一叶子 亲肤蚕丝保湿夯货 所有肤质 补水滋润 奢润焕颜护理套组', '434.0', '164.0', '../img/list13.jpg', '../img/item13.jpg', '../img/logo8.png', '巧妙搭配双重精华功效', '2018-12-26 10:58:39', '700', '眼膜', '一叶子');
INSERT INTO `items` VALUES ('14', '小迷糊 小迷糊 深海美颜密钥 少女肌密水嫩亮颜黑膜21片 补水亮肤', '299.0', '55.0', '../img/list14.jpg', '../img/item14.jpg', '../img/logo9.png', '#补水嫩肤提亮肤色#深海的能量GP4G，取自法国的墨藻精粹和韩国的优质黑珍珠，深层补水，焕亮润泽，令肌肤宛若少女般水润饱满。', '2018-12-26 10:58:42', '600', '补水面膜', '小迷糊');
INSERT INTO `items` VALUES ('15', '欧莱雅 欧莱雅【王源推荐】 男士火山岩洁面双支+平衡露控油组合', '258.0', '200.0', '../img/list15.jpg', '../img/item15.jpg', '../img/logo10.png', '巴黎欧莱雅 ，有效抗痘，净爽平衡，收紧毛孔，平滑修护。', '2018-12-26 10:58:45', '500', '祛痘', '欧莱雅');
INSERT INTO `items` VALUES ('16', '诗婷露雅【素颜也要美】诗婷露雅 坚果菁华补水润透套装 爽肤水', '276.0', '159.0', '../img/list16.jpg', '../img/item16.jpg', '../img/logo11.png', '#水润壁咚 保湿1+1# 专注补水，深层润透，果油滋养，肌肤喝饱水，柔润细腻有光泽。', '2018-12-26 10:58:49', '400', '补水滋养', '诗婷露雅');
INSERT INTO `items` VALUES ('17', '韩后【水嫩嘟嘟脸】韩后 水嘟嘟水漾鲜肌面膜套盒30片装 补水面膜 ', '598.0', '259.0', '../img/list17.jpg', '../img/item17.jpg', '../img/logo12.png', '#人气面膜#芦荟面膜——水润修护，素颜也水嫩有光泽；大豆面膜——补水嫩滑，不遮瑕也滑溜溜；雪绒花面膜——嫩白提亮', '2018-12-26 10:58:52', '300', '控油', '韩后');
INSERT INTO `items` VALUES ('18', '欧诗漫 OSM欧诗漫【焕白“肌”密】珍珠白精粹焕白全护理套装', '623.0', '209.0', '../img/list18.jpg', '../img/item18.jpg', '../img/logo13.png', '#经典双效焕白#珍珠白精粹焕白全护理套装 面部清透皙白，眼部水润焕亮，一款畅销3年的热销套装，升级完后给你不一样的全新体验，基础美白护肤外，更搭配了眼', '2018-12-26 10:58:56', '200', '淡斑美白', '欧诗漫');
INSERT INTO `items` VALUES ('19', '植美村 植美村润透水凝亮泽保湿套 控油护肤套装 补水 其他颜色', '472.0', '129.0', '../img/list19.jpg', '../img/item19.jpg', '../img/logo14.png', '植美村润透水凝亮泽保湿套，改善肌肤缺水干燥状况，肌肤水润通透，补水保湿，提亮肤色，深层锁水', '2018-12-26 10:58:59', '100', '平衡水油', '植美村');
INSERT INTO `items` VALUES ('20', 'DHC【呵护双唇】DHC蝶翠诗 橄榄护唇膏限量超值组 滋润保湿', '156.0', '96.0', '../img/list20.jpg', '../img/item20.jpg', '../img/logo15.png', '添加天然橄榄精华,呵护盈润娇唇,一年四季都可用的大人气护唇膏套装', '2018-12-26 15:11:11', '500', '滋润保湿', 'DHC');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL,
  `cart` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13988888888', 'a1234567', '[{\"id\":\"4\",\"qty\":1},{\"id\":\"19\",\"qty\":1}]');
INSERT INTO `user` VALUES ('13202072999', 'a1234567', '[{\"id\":\"1\",\"qty\":\"2\"},{\"id\":\"2\",\"qty\":4},{\"id\":\"4\",\"qty\":\"10\"}]');
INSERT INTO `user` VALUES ('13788888888', 'a1234567', '[]');
INSERT INTO `user` VALUES ('13588888888', 'A1234567', '[{\"id\":\"1\",\"qty\":6}]');
SET FOREIGN_KEY_CHECKS=1;
