var http = require("http"),
    $ = require("cheerio"),
    colors = require('colors'),
    fs = require('fs'),
    ini = require('ini'),
    path = require('path'),
    Info = ini.parse(fs.readFileSync(path.resolve(__dirname, '../') + '/config.ini','UTF-8' )).system;
    Conn = require("./conn").conn;

function Main() {
    this.url = 'http://zq.jc258.cn/jingcai/matchresult/football/';
    this.name = '竞彩足球';
    this.data = '';
    this.add_data = [];
    this.data_key = [];
};

Main.prototype.getData = function() {
    var _this = this,
        req = http.get(_this.url, function(res) {
            res.on('data', function(data) {
                _this.data += data.toString();
                // console.log(_this.data);
            });
            res.on('timeout', function() {
                if (Info.action_tip == '0') {
                    console.log(colors.red('--> [ ' + _this.name + ' ] 开奖采集请求超时 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                }
            });
            res.on("end", function() {
                clearTimeout(request_timer);
                try {
                    var html = $(_this.data).find('#tab_result tr'),
                        week = { '&#x4E00;': '1', '&#x4E8C;': '2', '&#x4E09;': '3', '&#x56DB;': '4', '&#x4E94;': '5', '&#x516D;': '6', '&#x65E5;': '7' },
                        spfbf = [
                            { "胜": "1", "平": "0", "负": "-1" },
                            { "胜胜": "1:1", "胜平": "1:0", "胜负": "1:-1", "平胜": "0:1", "平平": "0:0", "平负": "0:-1", "负胜": "-1:1", "负平": "-1:0", "负负": "-1:-1" },
                            { "胜其他": "1", "平其他": "0", "负其他": "-1" }
                        ];
                    html.each(function(key) {
                        if (key > 1) {
                            var e = $(this),
                                td = e.find('td'),
                                qihao = td.eq(0).html();
                            for (var p in week) { qihao = qihao.replace(p, week[p]); }
                            qihao = ('' + e.attr('gamedate') + qihao.substr(-4)).replace(/[^0-9]/ig, "");
                            Conn.query("SELECT expect FROM lottery_code WHERE type=35 and expect=" + qihao, function(err, rows) {
                                if (rows.length == 0) {
                                    var te = td.eq(3).find('a').text().replace(/\s+/g, ""),
                                        te2 = te.match(/^(.+?)\((.+?)\)VS(.+)$/);
                                    _this.add_data.push('(' + qihao + ",'" + JSON.stringify({
                                        leagueName: e.find('a').eq(0).text().replace(/\s+/g, ""),
                                        hostName: te2[1],
                                        guestName: te2[3],
                                        lost: te2[2],
                                        time: td.eq(2).text(),
                                        data: {
                                            spf: [spfbf[0][td.eq(6).text()], td.eq(7).text()],
                                            rqspf: [spfbf[0][td.eq(8).text()], td.eq(9).text()],
                                            zjq: [td.eq(10).text(), td.eq(11).text()],
                                            bf: [td.eq(12).text() == '胜其他' || td.eq(12).text() == '平其他' || td.eq(12).text() == '负其他' ? spfbf[2][td.eq(12).text()] : td.eq(12).text(), td.eq(13).text()],
                                            bqc: [spfbf[1][td.eq(14).text()], td.eq(15).text()]
                                        }
                                    }) + "',35," + (Date.parse(new Date()) / 1000) + ')');
                                }
                                if (html.length - 1 == key && _this.add_data.length) {
                                    _this.getNewData();
                                }
                            });
                        }
                    });
                } catch (error) {
                    if (Info.action_tip == '0') {
                        //console.log(error);
                        console.log(colors.red('--> [ ' + _this.name + ' ] 开奖采集出错,程序再次执行采集 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
                    }
                }
            });
        }).on('error', function(e) {
            if (Info.action_tip == '0') {
                console.log('--> [ ' + _this.name + ' ] 开奖采集出错：' + e + ' [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            }
        });
    var request_timer = setTimeout(function() {
        req.abort();
    }, Info.abort_time * 1000);
    req.on("abort", function() {
        if (Info.action_tip == '0') {
            console.log(colors.red('--> [ ' + _this.name + ' ] 开奖采集超过预定时间,终止了任务并再次执行 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
        }
    });
};

Main.prototype.getNewData = function() {
    // 格式化数据
    var _this = this;
    Conn.query('INSERT lottery_code (expect,content,type,create_time) VALUES ' + _this.add_data.join(','), function(rows) {
        console.log(colors.green('--> [ ' + _this.name + ' ] 开奖数据已采集' + _this.add_data.length + '场比赛结果,并执行派奖 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']'));
    });
};

/* 这里如果竞彩足球开奖采集独立运行的代码 */

// (new Main).getData();
// setInterval(function() {
//     (new Main).getData();
// }, 5 * 60000)

exports.Main = Main;