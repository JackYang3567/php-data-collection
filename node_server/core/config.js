﻿var config = {
    time: {
        /*
          low 低频彩配置 到了开奖那天(星期)、到了开奖时间、当天没有采集到数据，满足这三个条件才执行采集
          not 期数每天累计配置 期数每天往上累积的,算上次数据入库时间和现在时间是否超过设定每期的时间来决定是否采集
        */
        cp: {
            /* 低频彩 */
            ssq: {
                low: true,
                name: '双色球',
                wek: '2,4,0',
                time: '21:20:00',
                table: 'code'
            },
            dlt: {
                low: true,
                name: '大乐透',
                wek: '1,3,6',
                time: '20:30:00',
                table: 'code'
            },
            qxc: {
                low: true,
                name: '七星彩',
                wek: '2,5,0',
                time: '20:30:00',
                table: 'code'
            },
            qlc: {
                low: true,
                name: '七乐彩',
                wek: '1,3,5',
                time: '21:20:00',
                table: 'code'
            },
            sd: {
                low: true,
                name: '福彩3D',
                wek: '0,1,2,3,4,5,6',
                time: '21:15:00',
                table: 'code'
            },
            swxw: {
                low: true,
                name: '15选5',
                wek: '0,1,2,3,4,5,6',
                time: '19:10:00',
                table: 'code'
            },
            pls: {
                low: true,
                name: '排列三',
                wek: '0,1,2,3,4,5,6',
                time: '20:30:00',
                table: 'code'
            },
            plw: {
                low: true,
                name: '排列五',
                wek: '0,1,2,3,4,5,6',
                time: '20:30:00',
                table: 'code'
            },
            lhc: {
                low: true,
                name: '香港六合彩',
                wek: '0,1,2,3,4,6',
                time: '21:30:00',
                table: 'code1'
            },

            /* 高频彩 */

            /** 这里是期数需要累加的，有结束时间 **/
            bjks: {
                time: '08:50:00',
                end_time: '23:41:00',
                cha: 10,
                not: true,
                name: '北京快三',
                table: 'code'
            },
			dm28: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '丹麦28(泰国)',
                table: 'code1',
                auto: true
            },
			hltb: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '欢乐骰宝',
                table: 'code1',
                auto: true
            },
			trq28: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '土耳其28(文莱)',
                table: 'code1',
                auto: true
            },
            bj28: {
                time: '09:05:00',
                end_time: '23:59:59',
                cha: 5,
                not: true,
                name: '北京28',
                table: 'code1'
            },
            jnd28: {
                time: '00:00:00',
                end_time: '23:59:59',
                cha: 3.5,
                not: true,
                name: '加拿大28',
                table: 'code1'
            },
            gxklsf: {
                time: '09:00:00',
                end_time: '21:30:00',
                cha: 15,
                not: true,
                name: '广西快乐十分',
                table: 'code1'
            },
            bjpk10: {
                time: '09:30:00',
				//expects:44,
                end_time: '23:59:59',
                cha: 20,
                not: true,
                name: '北京赛车PK10',
                table: 'code1'
            },
            /**  **/
            ydwpk10: {
                time: '00:00:30',
                expects: 959,
                cha: 1.5,
                name: '1.5分PK10',
                table: 'code1',
                auto: true
            },
            xysc: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '幸运赛车(三分赛车)',
                table: 'code1',
                auto: true
            },
            xync: {
                time: '07:43:00',
                expects: 97,
                cha: 10,
                name: '幸运农场',
                table: 'code1'
            },
            sxsyxw: {
                time: '08:15:00',
                expects: 94,
                cha: 10,
                name: '山西11选5',
                table: 'code1'
            },
            ssc: {
                time: '00:10:00',
                expects: 60,
                cha: 20,
                name: '重庆时时彩',
                table: 'code'
            },
            hnwfc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '河内五分彩',
                table: 'code'
            },
            brnn: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '百人牛牛',
                table: 'code1',
                auto: true
            },
            jslhc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '极速六合彩',
                table: 'code1',
                auto: true
            },
            ffc: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '扣扣分分彩',
                table: 'code',
                auto: true
            },
            ajc: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '埃及三分彩',
                table: 'code1',
                auto: true
            },
            efc: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '埃及二分彩',
                table: 'code',
                auto: true
            },
            wfc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '埃及五分彩',
                table: 'code',
                auto: true
            },
            klpk10: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '快乐PK10',
                table: 'code1',
                auto: true
            },
            jisusyxw: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '极速11选5',
                table: 'code1',
                auto: true
            },
            xysyxw: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '幸运11选5',
                table: 'code1',
                auto: true
            },
            xjpsm: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '新加坡赛马',
                table: 'code1',
                auto: true
            },
            jisuft: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '极速飞艇',
                table: 'code1',
                auto: true
            },
            yfsc: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '一分赛车',
                table: 'code1',
                auto: true
            },
            xypk10: {
                time: '00:00:00',
                expects: 959,
                cha: 1.5,
                name: '幸运PK10',
                table: 'code1',
                auto: true
            },
            xjssc: {
                time: '10:00:00',
                expects: 96,
                cha: 10,
                name: '新疆时时彩',
                table: 'code'
            },
            tjssc: {
                time: '09:00:00',
                expects: 84,
                cha: 10,
                name: '天津时时彩',
                table: 'code'
            },
            syxw: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '江西11选5',
                table: 'code'
            },
            cqsyxw: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '重庆11选5',
                table: 'code'
            },
            gdsyxw: {
                time: '09:00:00',
                expects: 84,
                cha: 10,
                name: '广东11选5',
                table: 'code'
            },
            syydj: {
                time: '08:25:00',
                expects: 74,
                cha: 10,
                name: '11运夺金',
                table: 'code'
            },
            ahsyxw: {
                time: '08:40:00',
                expects: 81,
                cha: 10,
                name: '安徽11选5',
                table: 'code'
            },
            jssyxw: {
                time: '08:36:00',
                expects: 82,
                cha: 10,
                name: '江苏11选5',
                table: 'code'
            },
            zjsyxw: {
                time: '08:30:00',
                expects: 85,
                cha: 10,
                name: '浙江11选5',
                table: 'code'
            },
            shsyxw: {
                time: '09:00:00',
                expects: 90,
                cha: 10,
                name: '上海11选5',
                table: 'code'
            },
            xjsyxw: {
                time: '10:00:00',
                expects: 97,
                cha: 10,
                name: '新疆11选5',
                table: 'code'
            },
            llsyxw: {
                time: '08:50:00',
                expects: 83,
                cha: 10,
                name: '辽宁11选5',
                table: 'code'
            },
            hljsyxw: {
                time: '08:05:00',
                expects: 79,
                cha: 10,
                name: '黑龙江11选5',
                table: 'code'
            },
            fjsyxw: {
                time: '09:05:00',
                expects: 78,
                cha: 10,
                name: '福建11选5',
                table: 'code'
            },
            jsks: {
                time: '08:30:00',
                expects: 82,
                cha: 10,
                name: '江苏快三',
                table: 'code'
            },
            jlks: {
                time: '08:30:00',
                expects: 82,
                cha: 9,
                name: '吉林快三',
                table: 'code1'
            },
            ahks: {
                time: '08:40:00',
                expects: 80,
                cha: 10,
                name: '安徽快三',
                table: 'code'
            },
            gsks: {
                time: '10:09:00',
                expects: 72,
                cha: 10,
                name: '甘肃快三',
                table: 'code'
            },
            hebks: {
                time: '08:30:00',
                expects: 81,
                cha: 10,
                name: '河北快三',
                table: 'code'
            },
            hubks: {
                time: '09:00:00',
                expects: 78,
                cha: 10,
                name: '湖北快三',
                table: 'code'
            },
            fjks: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '福建快三',
                table: 'code'
            },
            zjklse: {
                time: '09:10:00',
                expects: 80,
                cha: 10,
                name: '浙江快乐十二',
                table: 'code'
            },
            gdklsf: {
                time: '09:10:00',
                expects: 84,
                cha: 10,
                name: '广东快乐十分',
                table: 'code'
            },
            jisuks: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '极速快3',
                table: 'code1',
                auto: true
            },
            xyks: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '幸运快3',
                table: 'code1',
                auto: true
            },
            tjks: {
                time: '10:00:00',
                expects: 96,
                cha: 10,
                name: '天津快3',
                table: 'code1',
                auto: true
            },
            nmks: {
                time: '09:45:00',
                expects: 73,
                cha: 10,
                name: '内蒙快三',
                table: 'code'
            },
            gxks: {
                time: '09:30:00',
                expects: 78,
                cha: 10,
                name: '广西快三',
                table: 'code'
            },
            shks: {
                time: '08:28:00',
                expects: 82,
                cha: 10,
                name: '上海快三',
                table: 'code'
            },
            pk10: {
                time: '09:10:00',
                expects: 44,
                cha: 20,
                name: '北京赛车PK10',
                table: 'code'
            },
            nmsyxw: {
                time: '09:45:00',
                expects: 75,
                cha: 10,
                name: '内蒙11选5',
                table: 'code'
            },
            hljssc: {
                time: '08:50:00',
                expects: 75,
                cha: 10,
                name: '黑龙江时时彩',
                table: 'code'
            },
        },
        article: {},
        image: {}
    }
};
exports.config = config;