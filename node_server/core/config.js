var config = {
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
            },
            dlt: {
                low: true,
                name: '大乐透',
                wek: '1,3,6',
                time: '20:30:00',
            },
            qxc: {
                low: true,
                name: '七星彩',
                wek: '2,5,0',
                time: '20:30:00',
            },
            qlc: {
                low: true,
                name: '七乐彩',
                wek: '1,3,5',
                time: '21:20:00',
            },
            sd: {
                low: true,
                name: '福彩3D',
                wek: '0,1,2,3,4,5,6',
                time: '21:15:00',
            },
            swxw: {
                low: true,
                name: '15选5',
                wek: '0,1,2,3,4,5,6',
                time: '19:10:00',
            },
            pls: {
                low: true,
                name: '排列三',
                wek: '0,1,2,3,4,5,6',
                time: '20:30:00',
            },
            plw: {
                low: true,
                name: '排列五',
                wek: '0,1,2,3,4,5,6',
                time: '20:30:00',
            },
            lhc: {
                low: true,
                name: '香港六合彩',
                wek: '0,1,2,3,4,6',
                time: '21:30:00',
            },

            /* 高频彩 */

            /** 这里是期数需要累加的，有结束时间 **/
            bjks: {
                time: '08:50:00',
                end_time: '23:41:00',
                cha: 10,
                not: true,
                name: '北京快三',
            },
			dm28: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '丹麦28(泰国)',
                auto: true
            },
			hltb: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '欢乐骰宝',
                auto: true
            },
			trq28: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '土耳其28(文莱)',
                auto: true
            },
            bj28: {
                time: '09:05:00',
                end_time: '23:59:59',
                cha: 5,
                not: true,
                name: '北京28',
            },
            jnd28: {
                time: '00:00:00',
                end_time: '23:59:59',
                cha: 3.5,
                not: true,
                name: '加拿大28',
            },
            gxklsf: {
                time: '09:00:00',
                end_time: '21:30:00',
                cha: 15,
                not: true,
                name: '广西快乐十分',
            },
            bjpk10: {
                time: '09:30:00',
				//expects:44,
                end_time: '23:59:59',
                cha: 20,
                not: true,
                name: '北京赛车PK10',
            },
            /**  **/
            ydwpk10: {
                time: '13:05:00',
                expects: 180,
                cha: 5,
                name: '1.5分PK10 飞艇'
            },
            xysc: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '幸运赛车(三分赛车)',
                auto: true
            },
            xync: {
                time: '07:43:00',
                expects: 97,
                cha: 10,
                name: '幸运农场',
            },
            sxsyxw: {
                time: '08:15:00',
                expects: 94,
                cha: 10,
                name: '山西11选5',
            },
            ssc: {
                time: '00:10:00',
                expects: 60,
                cha: 20,
                name: '重庆时时彩',
            },
            hnwfc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '河内五分彩',
            },
            brnn: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '百人牛牛',
                auto: true
            },
            jslhc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '极速六合彩',
                auto: true
            },
            qqffc: {
                time: '01:35:00',
                expects: 1440,
                cha: 1,
                name: '扣扣分分彩',
            },
            ffc: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '分分彩',
                auto: true
            },
            ajc: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '埃及三分彩',
                auto: true
            },
            efc: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '埃及二分彩',
                auto: true
            },
            wfc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '埃及五分彩',
                auto: true
            },
            klpk10: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '快乐PK10',
                auto: true
            },
            jisusyxw: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '极速11选5',
                auto: true
            },
            xysyxw: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '幸运11选5',
                auto: true
            },
            xjpsm: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '新加坡赛马',
                auto: true
            },
            jisuft: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '极速飞艇',
                auto: true
            },
            yfsc: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '一分赛车',
                auto: true
            },
            xypk10: {
                time: '00:00:00',
                expects: 959,
                cha: 1.5,
                name: '幸运PK10',
                auto: true
            },
            xjssc: {
                time: '10:00:00',
                expects: 96,
                cha: 10,
                name: '新疆时时彩',
            },
            tjssc: {
                time: '09:00:00',
                expects: 84,
                cha: 10,
                name: '天津时时彩',
            },
            syxw: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '江西11选5',
            },
            cqsyxw: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '重庆11选5',
            },
            gdsyxw: {
                time: '09:00:00',
                expects: 84,
                cha: 10,
                name: '广东11选5',
            },
            syydj: {
                time: '08:25:00',
                expects: 74,
                cha: 10,
                name: '11运夺金',
            },
            ahsyxw: {
                time: '08:40:00',
                expects: 81,
                cha: 10,
                name: '安徽11选5',
            },
            jssyxw: {
                time: '08:36:00',
                expects: 82,
                cha: 10,
                name: '江苏11选5',
            },
            zjsyxw: {
                time: '08:30:00',
                expects: 85,
                cha: 10,
                name: '浙江11选5',
            },
            shsyxw: {
                time: '09:00:00',
                expects: 90,
                cha: 10,
                name: '上海11选5',
            },
            xjsyxw: {
                time: '10:00:00',
                expects: 97,
                cha: 10,
                name: '新疆11选5',
            },
            llsyxw: {
                time: '08:50:00',
                expects: 83,
                cha: 10,
                name: '辽宁11选5',
            },
            hljsyxw: {
                time: '08:05:00',
                expects: 79,
                cha: 10,
                name: '黑龙江11选5',
            },
            fjsyxw: {
                time: '09:05:00',
                expects: 78,
                cha: 10,
                name: '福建11选5',
            },
            jsks: {
                time: '08:30:00',
                expects: 82,
                cha: 10,
                name: '江苏快三',
            },
            jlks: {
                time: '08:30:00',
                expects: 82,
                cha: 9,
                name: '吉林快三',
            },
            ahks: {
                time: '08:40:00',
                expects: 80,
                cha: 10,
                name: '安徽快三',
            },
            gsks: {
                time: '10:09:00',
                expects: 72,
                cha: 10,
                name: '甘肃快三',
            },
            hebks: {
                time: '08:30:00',
                expects: 81,
                cha: 10,
                name: '河北快三',
            },
            hubks: {
                time: '09:00:00',
                expects: 78,
                cha: 10,
                name: '湖北快三',
            },
            fjks: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '福建快三',
            },
            zjklse: {
                time: '09:10:00',
                expects: 80,
                cha: 10,
                name: '浙江快乐十二',
            },
            gdklsf: {
                time: '09:10:00',
                expects: 84,
                cha: 10,
                name: '广东快乐十分',
            },
            jisuks: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '极速快3',
                auto: true
            },
            xyks: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '幸运快3',
                auto: true
            },
            tjks: {
                time: '10:00:00',
                expects: 96,
                cha: 10,
                name: '天津快3',
                auto: true
            },
            nmks: {
                time: '09:45:00',
                expects: 73,
                cha: 10,
                name: '内蒙快三',
            },
            gxks: {
                time: '09:30:00',
                expects: 78,
                cha: 10,
                name: '广西快三',
            },
            shks: {
                time: '08:28:00',
                expects: 82,
                cha: 10,
                name: '上海快三',
            },
            pk10: {
                time: '09:10:00',
                expects: 44,
                cha: 20,
                name: '北京赛车PK10',
            },
            nmsyxw: {
                time: '09:45:00',
                expects: 75,
                cha: 10,
                name: '内蒙11选5',
            },
            hljssc: {
                time: '08:50:00',
                expects: 75,
                cha: 10,
                name: '黑龙江时时彩',
            },
        },
        article: {},
        image: {}
    }
};
exports.config = config;