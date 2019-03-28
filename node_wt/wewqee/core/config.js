var config = {
    time: {
        /*
          low 低频彩配置 到了开奖那天(星期)、到了开奖时间、当天没有采集到数据，满足这三个条件才执行采集
          not 期数每天累计配置 期数每天往上累积的,算上次数据入库时间和现在时间是否超过设定每期的时间来决定是否采集
        */
        cp: {
            /* 低频彩 */
            lhc: {
                low: true,
                name: '香港六合彩',
                wek: '0,1,2,3,4,6',
                time: '21:30:00',
                type: 21,
                category: 'lhc'
            },
            ssq: {
                low: true,
                name: '双色球',
                wek: '2,4,0',
                time: '21:20:00'
            },
            dlt: {
                low: true,
                name: '大乐透',
                wek: '1,3,6',
                time: '20:30:00'
            },
            qxc: {
                low: true,
                name: '七星彩',
                wek: '2,5,0',
                time: '20:30:00'
            },
            qlc: {
                low: true,
                name: '七乐彩',
                wek: '1,3,5',
                time: '21:20:00'
            },
            sd: {
                low: true,
                name: '福彩3D',
                wek: '0,1,2,3,4,5,6',
                time: '21:15:00',
                type: 19,
                category: 'p3d'
            },
            swxw: {
                low: true,
                name: '15选5',
                wek: '0,1,2,3,4,5,6',
                time: '19:10:00'
            },
            pls: {
                low: true,
                name: '排列三',
                wek: '0,1,2,3,4,5,6',
                time: '20:30:00',
                type: 22,
                category: 'p3d'
            },
            plw: {
                low: true,
                name: '排列五',
                wek: '0,1,2,3,4,5,6',
                time: '20:30:00'
            },
            /* 高频彩 */
            bjks: {
                time: '09:00:00',
                end_time: '23:15:00',
                cha: 10,
                not: true,
                name: '北京快三',
                type: 34,
                category: 'ks'
            },
            bj28: {
                time: '09:05:00',
                end_time: '23:59:59',
                cha: 5,
                not: true,
                name: '北京28',
                type: 24,
                category: 'pc28'
            },
            jnd28: {
                time: '00:00:00',
                end_time: '23:59:59',
                cha: 3.5,
                not: true,
                name: '加拿大28',
                type: 25,
                category: 'pc28'
            },
            gxklsf: {
                time: '09:00:00',
                end_time: '21:30:00',
                cha: 15,
                not: true,
                name: '广西快乐十分',
                type: 20,
                category: 'klsf'
            },
			qqffc: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: 'qqffc',
                type: 60,
                category: 'ssc'
            },
            bjpk10: {
                time: '09:09:00',
                end_time: '23:59:59',
                cha: 20,
                not: true,
                name: 'PK10',
                type: 3,
                category: 'pk10'
            },
            ydwpk10: {
                time: '00:13:05',
                expects: 180,
                cha: 5,
                name: '1.5分PK10 飞艇',
                type: 4,
                category: 'pk10'
            },
            xync: {
                time: '07:43:00',
                expects: 97,
                cha: 10,
                name: '幸运农场',
                type: 23,
                category: 'xync'
            },
            hltb: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '欢乐骰宝',
                type: 59,
                category: 'hlsb'
            },	
            xysc: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '幸运赛车',
                type: 5,
                category: 'pk10'
            },
            sxsyxw: {
                time: '08:15:00',
                expects: 94,
                cha: 10,
                name: '山西11选5',
                type: 18,
                category: 'syxw'
            },
            jslhc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '极速六合彩',
                type: 11,
                category: 'lhc'
            },
            ssc: {
                time: '00:10:00',
                expects: 60,
                cha: 20,
                name: '重庆时时彩',
                type: 2,
                category: 'ssc'
            },
            brnn: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '百人牛牛',
                type: 52,
                category: 'brnn'
            },
            hnwfc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '河内五分彩',
                type: 28,
                category: 'ssc'
            },
            xyks: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '幸运快3',
                type: 41,
                category: 'ks'
            },
            jisuks: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '极速快3',
                type: 40,
                category: 'ks'
            },
            tjks: {
                time: '09:59:00',
                expects: 96,
                cha: 10,
                name: '天津快3',
                type: 42,
                category: 'ks'
            },
            ffc: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '扣扣分分彩',
                type: 6,
                category: 'ssc'
            },
            efc: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '埃及二分彩',
                type: 7,
                category: 'ssc'
            },
            ajc: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '埃及三分彩',
                type: 8,
                category: 'ssc'
            },
            wfc: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '埃及五分彩',
                type: 9,
                category: 'ssc'
            },
            klpk10: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '快乐PK10',
                type: 38,
                category: 'pk10'
            },
            jisusyxw: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '极速11选5',
                type: 44,
                category: 'syxw'
            },
            xysyxw: {
                time: '00:00:00',
                expects: 288,
                cha: 5,
                name: '幸运11选5',
                type: 45,
                category: 'syxw'
            },
            jisuft: {
                time: '00:00:00',
                expects: 720,
                cha: 2,
                name: '极速飞艇',
                type: 51,
                category: 'pk10'
            },
            xjpsm: {
                time: '00:00:00',
                expects: 480,
                cha: 3,
                name: '新加坡赛马',
                type: 39,
                category: 'pk10'
            },
            yfsc: {
                time: '00:00:00',
                expects: 1440,
                cha: 1,
                name: '一分赛车',
                type: 36,
                category: 'pk10'
            },
            xypk10: {
                time: '00:00:00',
                expects: 959,
                cha: 1.5,
                name: '幸运PK10',
                type: 37,
                category: 'pk10'
            },
            xjssc: {
                time: '10:00:00',
                expects: 96,
                cha: 10,
                name: '新疆时时彩',
                type: 12,
                category: 'ssc'
            },
            tjssc: {
                time: '09:00:00',
                expects: 84,
                cha: 10,
                name: '天津时时彩',
                type: 13,
                category: 'ssc'
            },
            syxw: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '江西11选5'
            },
            cqsyxw: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '重庆11选5'
            },
            gdsyxw: {
                time: '09:00:00',
                expects: 84,
                cha: 10,
                name: '广东11选5',
                type: 16,
                category: 'syxw'
            },
            syydj: {
                time: '08:25:00',
                expects: 74,
                cha: 10,
                name: '山东11选5',
                type: 17,
                category: 'syxw'
            },
            ahsyxw: {
                time: '08:40:00',
                expects: 81,
                cha: 10,
                name: '安徽11选5'
            },
            jssyxw: {
                time: '08:36:00',
                expects: 82,
                cha: 10,
                name: '江苏11选5'
            },
            zjsyxw: {
                time: '08:30:00',
                expects: 85,
                cha: 10,
                name: '浙江11选5'
            },
            shsyxw: {
                time: '09:00:00',
                expects: 90,
                cha: 10,
                name: '上海11选5',
                type: 49,
                category: 'syxw'
            },
            xjsyxw: {
                time: '10:00:00',
                expects: 97,
                cha: 10,
                name: '新疆11选5'
            },
            llsyxw: {
                time: '08:50:00',
                expects: 83,
                cha: 10,
                name: '辽宁11选5'
            },
            hljsyxw: {
                time: '08:05:00',
                expects: 79,
                cha: 10,
                name: '黑龙江11选5'
            },
            fjsyxw: {
                time: '09:05:00',
                expects: 78,
                cha: 10,
                name: '福建11选5'
            },
            jsks: {
                time: '08:30:00',
                expects: 82,
                cha: 10,
                name: '江苏快三',
                type: 10,
                category: 'ks'
            },
            jlks: {
                time: '08:30:00',
                expects: 87,
                cha: 9,
                name: '吉林快三'
            },
            ahks: {
                time: '08:40:00',
                expects: 80,
                cha: 10,
                name: '安徽快三',
                type: 15,
                category: 'ks'
            },
            fjks: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '福建快三'
            },
            zjklse: {
                time: '09:10:00',
                expects: 80,
                cha: 10,
                name: '浙江快乐十二'
            },
            gdklsf: {
                time: '09:10:00',
                expects: 84,
                cha: 10,
                name: '广东快乐十分'
            },
            nmks: {
                time: '09:45:00',
                expects: 73,
                cha: 10,
                name: '内蒙快三'
            },
            gxks: {
                time: '09:30:00',
                expects: 78,
                cha: 10,
                name: '广西快三'
            },
            hubks: {
                time: '09:10:00',
                expects: 78,
                cha: 10,
                name: '湖北快三'
            },
            shks: {
                time: '08:50:00',
                expects: 82,
                cha: 10,
                name: '上海快三',
                type: 14,
                category: 'ks'
            },
            pk10: {
                time: '09:10:00',
                expects: 44,
                cha: 20,
                name: '北京赛车PK10'
            },
            nmsyxw: {
                time: '09:45:00',
                expects: 75,
                cha: 10,
                name: '内蒙11选5'
            },
            hljssc: {
                time: '08:50:00',
                expects: 75,
                cha: 10,
                name: '黑龙江时时彩'
            },
        },
        article: {},
        image: {}
    }
};
exports.config = config;