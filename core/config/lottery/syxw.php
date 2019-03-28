<?php

  return [
    'sxsyxw' => [
      'field' => 'code,expect,time',
      'type' => 'sxsyxw',
      'list' => [
          [
              'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=sxr11x5&format=json',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data['data'] as $key => $value) {
                  $return_data[] = [
                    'code' => $value['opencode'],
                    'expect' => $value['expect'],
                    'time' => $value['opentime']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
      ]
    ],
    'jisusyxw' => [
      'code_config' => [
        'min' => 1,
        'max' => 11,
        'num' => 5,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'jisusyxw',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=xdlpks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => $key,
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
      ]
    ],
    'xysyxw' => [
      'code_config' => [
        'min' => 1,
        'max' => 11,
        'num' => 5,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'xysyxw',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=xdlpks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => $key,
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
      ]
    ],
    'shsyxw' => [
      'field' => 'code,expect,time',
      'type' => 'shsyxw',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=shsyxw&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => $key,
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
      ]
    ],
    'gdsyxw' => [
      'field' => 'code,expect,time',
      'type' => 'gdsyxw',
      'list' => [
          [
              'url' => 'https://kaijiang.aicai.com/gd11x5/',
              'mode' => 'html',
              'range' => '#jq_body_kc_result>tr',
              'rules' => [
                'code' => ['td:eq(2)','text'],
                'expect' => ['td:eq(0)','text',null,function($content){
                  return preg_replace('/[^\d]/','',$content);
                }],
                'time' => ['td:eq(1)','text']
              ],
              'callback' => function($data){
                $data = array_reverse($data);
                return $data;
              }
          ] /*,
          [
              // 有令牌问题，采集不到最新数据
              'url' => 'http://kaijiang.500.com/static/info/kaijiang/xml/gdsyxw/' . date('Ymd') . '.xml?_A=TBZLRNQM1531119138952',
              'mode' => 'xml',
              'callback' => function($data){
                $return_data = [];
                foreach ($data['row'] as $value) {
                  $return_data[] = [
                    'expect' => substr(date('Y'),0,2) . preg_replace('/[^\d]/','',$value['@attributes']['expect']),
                    'code' => $value['@attributes']['opencode'],
                    'time' => $value['@attributes']['opentime']
                  ];
                }
                $return_data = array_reverse($return_data);
                return $return_data;
              }
          ],
          [
              // 数据慢
              'url' => 'https://11xuan5.cjcp.com.cn/guangdong/kaijiang/',
              'mode' => 'html',
              'range' => '.kjjg_table>tr',
              'rules' => [
                'code' => ['.hm_bg','text',null,function($content){
                      for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                        $data .= ($i>0?',':'').substr($content,$i,2);
                      }
                      return $data;
                  }],
                'expect' => ['td:eq(0)','text',null,function($content){
                  return preg_replace('/[^\d]/','',$content);
                }],
                'time' => ['td:eq(1)','text']
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ] */
      ]
    ],
    'zjsyxw' => [
      'field' => 'code,expect,time',
      'type' => 'zjsyxw',
      'list' => [
          [
              'url' => 'http://pub.icaile.com/zj11x5kjjg.php',
              'mode' => 'html',
              'range' => '.today>tr',
              'rules' => [
                'code' => ['td:eq(2)>em','text',null,function($content){
                      for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                        $data .= ($i>0?',':'').substr($content,$i,2);
                      }
                      return $data;
                  }],
                'expect' => ['td:eq(0)','text',null,function($content){
                  return substr(date('Y'),0,2).$content;
                }],
                'time' => ['td:eq(1)','text']
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]
      ]
    ],
    'syydj' => [
      'field' => 'code,expect,time',
      'type' => 'syydj',
      'list' => [
          [
              'url' => 'https://kaijiang.aicai.com/11ydj/',
              'mode' => 'html',
              'range' => '#jq_body_kc_result>tr',
              'rules' => [
                'code' => ['td:eq(2)','text'],
                'expect' => ['td:eq(0)','text',null,function($content){
                  return substr(date('Y'),0,2) . preg_replace('/[^\d]/','',$content);
                }],
                'time' => ['td:eq(1)','text']
              ],
              'callback' => function($data){
                $data = array_reverse($data);
                return $data;
              }
          ],
          [
              'url' => 'https://11xuan5.cjcp.com.cn/shandong/kaijiang/',
              'mode' => 'html',
              'range' => '.kjjg_table>tr',
              'rules' => [
                'code' => ['.hm_bg','text',null,function($content){
                      for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                        $data .= ($i>0?',':'').substr($content,$i,2);
                      }
                      return $data;
                  }],
                'expect' => ['td:eq(0)','text',null,function($content){
                  return preg_replace('/[^\d]/','',$content);
                }],
                'time' => ['td:eq(1)','text']
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]
      ]
    ]
  ];
