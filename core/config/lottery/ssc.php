<?php

  return [
      'ssc' => [
        'field' => 'code,expect,time',
        'type' => 'ssc',
        'list' => [
            [
                //'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=cqssc&rows=10&format=json',
                'url' => 'http://api.caipiaokong.cn/lottery/?name=cqssc&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
                'mode' => 'json',
                'callback' => function($data){
                  $return_data = [];
                  foreach ($data as $key => $value) {
                   /*
                     $return_data[] = [
                       'code' => $value['opencode'],
                       'expect' => $value['expect'],
                       'time' => $value['opentime']
                     ];
                    */
                   $return_data[] = [
                     'code' => $value['number'],
                     'expect' => $key,
                     'time' => $value['dateline']
                   ];
                  }
                  return array_reverse($return_data);
                }
            ],
            [
                'url' => 'https://shishicai.cjcp.com.cn/chongqing/kaijiang/',
                'mode' => 'html',
                'range' => '.kjjg_table>tr',
                'rules' => [
                  'code' => ['.hm_bg','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
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
      ],
      'hnwfc' => [
        'field' => 'code,expect',
        'type' => 'hnwfc',
        'list' => [
            [
                'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=viffc5&rows=10&format=json',
                'mode' => 'json',
                'callback' => function($data){
                  $return_data = [];
                  foreach ($data['data'] as $key => $value) {
                    $return_data[] = [
                      'code' => $value['opencode'],
                      'expect' => $value['expect']
                    ];
                  }
                  return array_reverse($return_data);
                }
            ],
            [
                'url' => 'http://c.apiplus.net/newly.do?token=td5b89b27d7d0350fk&code=viffc5&format=json',
                'mode' => 'json',
                'callback' => function($data){
                  $return_data = [];
                  foreach ($data['data'] as $key => $value) {
                    $return_data[] = [
                      'code' => $value['opencode'],
                      'expect' => $value['expect']
                    ];
                  }
                  return array_reverse($return_data);
                }
            ],
            [
                'url' => 'https://zst.cjcp.com.cn/cjwssc_rs/view/ssc_danxuan-0-5-kuai5.html',
                'mode' => 'html',
                'range' => '#pagedata>tr',
                'rules' => [
                  'code' => ['td.z_bg_13','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(1)','text']
                ],
                'callback' => function($data){
                  return $data;
                }
            ]
         ]
      ],
      'ffc' => [
        'code_config' => [
          'min' => 0,
          'max' => 9,
          'num' => 5,
          'is' => false
        ],
        'field' => 'code,expect,time',
        'type' => 'ffc',
        'list' => [
            [
                'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=txffc&format=json',
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
      'ajc' => [
        'code_config' => [
          'min' => 0,
          'max' => 9,
          'num' => 5,
          'is' => false
        ],
        'field' => 'code,expect,time',
        'type' => 'ajc',
        'list' => [
            [
                'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=ffc3&rows=20&format=json',
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
      'efc' => [
        'code_config' => [
          'min' => 0,
          'max' => 9,
          'num' => 5,
          'is' => false
        ],
        'field' => 'code,expect,time',
        'type' => 'efc',
        'list' => [
            [
                'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=ffc2&format=json',
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
      'wfc' => [
        'code_config' => [
          'min' => 0,
          'max' => 9,
          'num' => 5,
          'is' => false
        ],
        'field' => 'code,expect,time',
        'type' => 'wfc',
        'list' => [
            [
                // 开彩网泰国时时彩接口
                //'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=thffc5&format=json',
                'url' => 'http://api.kaijiangtong.com/lottery/?name=ynwfc&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
                'mode' => 'json',
                'callback' => function($data){
                  $return_data = [];
                  foreach ($data as $key => $value) { // $data['data']
                   //  $return_data[] = [
                   //    'code' => $value['opencode'],
                   //    'expect' => $value['expect'],
                   //    'time' => $value['opentime']
                   //  ];
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
      'qqffc' => [
        'field' => 'code,expect,time',
        'type' => 'qqffc',
        'list' => [
            [
                'url' => 'http://api.caipiaokong.cn/lottery/?name=ffcqq&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
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
      'tjssc' => [
        'field' => 'code,expect,time',
        'type' => 'tjssc',
        'list' => [
            [
                'url' => 'http://b.apiplus.net/newly.do?token=td5b89b27d7d0350fk&code=tjssc&rows=10&format=json',
                'mode' => 'json',
                'callback' => function($data){
                  $return_data = [];
                  foreach ($data['data'] as $key => $value) {
                    $return_data[] = [
                      'code' => $value['opencode'],
                      'expect' => (substr($value['expect'],0,8) . substr($value['expect'],-2)),
                      'time' => $value['opentime']
                    ];
                  }
                  return array_reverse($return_data);
                }
            ],
            [
                'url' => 'https://shishicai.cjcp.com.cn/tianjin/kaijiang/',
                'mode' => 'html',
                'range' => '.kjjg_table>tr',
                'rules' => [
                  'code' => ['.hm_bg','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text',null,function($content){
                     $data = preg_replace('/[^\d]/','',$content);
                     return preg_replace('/\d{1}(\d{2})$/','$1',$data);
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
      'xjssc' => [
        'field' => 'code,expect,time',
        'type' => 'xjssc',
        'list' => [
            [
                'url' => 'http://b.apiplus.net/newly.do?token=td5b89b27d7d0350fk&code=xjssc&rows=10&format=json',
                'mode' => 'json',
                'callback' => function($data){
                  $return_data = [];
                  foreach ($data['data'] as $key => $value) {
                    $return_data[] = [
                      'code' => $value['opencode'],
                      'expect' => (substr($value['expect'],0,8) . substr($value['expect'],-2)),
                      'time' => $value['opentime']
                    ];
                  }
                  return array_reverse($return_data);
                }
            ],
            [
                'url' => 'https://shishicai.cjcp.com.cn/xinjiang/kaijiang/',
                'mode' => 'html',
                'range' => '.kjjg_table>tr',
                'rules' => [
                  'code' => ['.hm_bg','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text',null,function($content){
                     $data = preg_replace('/[^\d]/','',$content);
                     return preg_replace('/\d{1}(\d{2})$/','$1',$data);
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
