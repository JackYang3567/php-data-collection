var Main = require("./main").Main,
    Config = require("./config").config,
    Conn = require("./conn").conn,
    fs = require('fs'),
    ini = require('ini'),
    path = require('path'),
    Info = ini.parse(fs.readFileSync(path.resolve(__dirname, '../../') + '/config.ini','UTF-8' )).system;
// 缓存最近数据期号
var chat_expect = {
    cp: {},
    article: {},
    image: {},
    catch_time: 0
};

function runAsync(callback, Main_obj) {
    Conn.query("SELECT expect,time FROM " + Main_obj.table + " WHERE type='" + Main_obj.type + "' ORDER BY expect DESC LIMIT 0,1", function(err, rows, fields) {
        var _expect = rows.length > 0 ? rows[0]['expect'] : 0;
        // console.log(_expect);
        callback([_expect, (_expect ? rows[0]['time'] : '1970-01-01 00:00:00')], Main_obj);
    });
}

function action() {
    var project = Info['project'].split(','),
        _time_config = Config.time,
        now_expect;
    // 这里是每天到了12点,执行保留数据
    if (chat_expect['catch_time'] == 0 || (new Date().Format('hh:mm:ss') > '23:59:00' && new Date().Format('yyyyMMdd') > chat_expect['catch_time'])) {
        chat_expect['catch_time'] = new Date().Format('yyyyMMdd');
        var day = 2, // 保留的数据的天数
            is_day = new Date();
        is_day.setDate(is_day.getDate() - day);
        is_day = is_day.Format('yyyy-MM-dd hh:mm:ss');
        Conn.query("DELETE FROM code WHERE time < '" + is_day + "'", function(err) {
            if (err) {
                console.log(err);
                console.log('--> code执行保留' + day + '天的开奖数据操作失败！！！ [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            } else {
                console.log('--> code执行保留' + day + '天的开奖数据操作成功 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            }
        });
        Conn.query("DELETE FROM code1 WHERE time < '" + is_day + "'", function(err) {
            if (err) {
                console.log('--> code1执行保留' + day + '天的开奖数据操作失败！！！ [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            } else {
                console.log('--> code1执行保留' + day + '天的开奖数据操作成功 [' + new Date().Format('yyyy-MM-dd hh:mm:ss') + ']');
            }
        });
    }
    for (var i in project) {
        _type_array = Info[project[i]].split(',');
        for (var j = 0, k = _type_array.length; j < k; j++) {
            now_expect = getNowExpect(_time_config[project[i]][_type_array[j]], _type_array[j], project[i]);
            // console.log(now_expect);
            if (!now_expect) {
                continue;
            }
            Main_obj = new Main();
            Main_obj.project = project[i];
            Main_obj.type = _type_array[j];
            Main_obj.table = _time_config[project[i]][_type_array[j]].table;
            Main_obj.name = _time_config[project[i]][_type_array[j]].name;
            Main_obj.auto = ('auto' in _time_config[project[i]][_type_array[j]] ? _time_config[project[i]][_type_array[j]].auto : false);
            Main_obj.now_expect = (('low' in _time_config[project[i]][_type_array[j]] || 'not' in _time_config[project[i]][_type_array[j]]) ? 0 : now_expect);
            // console.log(now_expect); // 计算出的期数，如果是没到开奖时间，则返回是否采集结果
            /* if((_type_array[j] in chat_expect[project[i]])) console.log(Main_obj.name + '------' + chat_expect[project[i]][_type_array[j]][0] + '---' + now_expect + '------' + chat_expect[project[i]][_type_array[j]][1]); // 执行采集名字、缓存的最新期数、计算得出最新期数、最新期数开奖时间 */
            // 这里每个彩种第一次运行程序时都会去采集，以填补之前没采集到的最近几期，以及获得每个彩种的数据库最新期数，并缓存起来，用于决定下次是否执行采集
            // 每次到了下一期，也就是计算出的期号和缓存期号不符时，要执行操作，并从数据库中获得最新期数，并缓存，达到检测是否采集到最新一期数据的目的
            if (!(_type_array[j] in chat_expect[project[i]]) || chat_expect[project[i]][_type_array[j]][0] != now_expect) {
                runAsync(function(_data, Main_obj) {
                    Main_obj.expect = parseInt(_data[0]) + 1;
                    if (!(Main_obj.type in chat_expect[Main_obj.project]) || _data[0] <= chat_expect[Main_obj.project][Main_obj.type][0]) {
                        Main_obj.main();
                    }
                    chat_expect[Main_obj.project][Main_obj.type] = _data;
                }, Main_obj);
            }
        }
    }
    setTimeout(action, Info.time * 1000);
}

function getNowExpect(_time_config, type, project) {
    var date_obj = new Date;
    if ('low' in _time_config) {
        var _get_day = date_obj.getDay();
        /*这里低频采集，如果第一次执行，需要执行采集，并到数据库获得最新信息，之后要满足：到了开奖那天、到了开奖时间、当天没有采集到数据，这三个条件才执行采集 */
        if (!(type in chat_expect[project]) || (date_obj > new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time) && _time_config.wek.indexOf(_get_day) > -1 && new Date(date_obj.Format('yyyy-MM-dd') + ' 00:00:00') > new Date(new Date(chat_expect[project][type][1]).Format('yyyy-MM-dd') + ' 00:00:00'))) {
            return true;
        }
        return false;
    } else if ('not' in _time_config) {
        // 这里是期数每天往上累积的,满足上次数据入库时间是否超过设定每期的时间、是否是投注时间内来决定是否采集
        if (!(type in chat_expect[project]) || (date_obj > new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time) && date_obj < new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.end_time) && (Date.parse(date_obj) - Date.parse(new Date(chat_expect[project][type][1]))) / 1000 / 60 > _time_config.cha)) {
            return true;
        }
        return false;
    } else {
        var now_date = Date.parse(date_obj),
            start_date = Date.parse(new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time));
        // 这里即便是销售没有开始，也要执行一次采集，以填补程序关闭、或者其他原因没采集到的最近几期
        if (now_date < start_date && type in chat_expect[project]) {
            var day_max_expect = Math.ceil((Date.parse(new Date(date_obj.Format('yyyy-MM-dd') + ' 23:59:59')) - start_date) / 1000 / 60 / _time_config.cha) + 1;
            // 这里是如果期号存在跨天处理
            if (day_max_expect < _time_config.expects) {
                date_obj.setDate(date_obj.getDate() - 1);
                start_date = Date.parse(new Date(date_obj.Format('yyyy-MM-dd') + ' ' + _time_config.time));
            } else {
                return false;
            }
        }
        var cha_date = (now_date - start_date) / 1000 / 60,
            get_num = parseInt(cha_date / _time_config.cha);
        if (type == 'ssc') {

            // 重庆时时彩 23 期之前是 5 分钟一期，之后是 10 分钟一期，96期之后又是5分钟一期
            // cha_date += 1; // 第一期只有 4 分钟
            
            /**
             * 重庆时时彩 2019 新规定 第一期 00:10开始,其中3:10-到7:30开一期,20分钟一期,每天60期
             */
            
            //get_num = cha_date / 5;

            get_num = cha_date / 20;

            // if (get_num > 23) { // 第24期是 01:54 ~ 09:59
            if (get_num > 9) { // 第10期是 03:10 ~ 07:30
                //cha_date = cha_date - 5 * 23 - 485 - 1;
                cha_date = cha_date - 20 * 9 - 260 - 1;
                if (cha_date <= 0) {
                    //get_num = 24;
                    get_num = 10;
                } else {
                    //get_num = 24 + cha_date / 10;
                    get_num = 10 + cha_date / 20;
                }
            }
            // if (get_num > 96) {
            //     cha_date = cha_date - 10 * (96 - 24) + 1;
            //     get_num = 96 + cha_date / 5;
            // }
            get_num = parseInt(get_num);
        }
        if (get_num < 1 || get_num > _time_config.expects) {
            date_obj.setDate(date_obj.getDate() - 1);
            get_num = _time_config.expects;
        }
        get_num = date_obj.Format('yyyyMMdd') + ("000" + get_num).substr(-_time_config.expects.toString().length);
        return get_num;
    }
}
action();