<?php

  return [
    'xysc' => [
      'code_config' => [
        'min' => 1,
        'max' => 10,
        'num' => 10,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'xysc',
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
    'ydwpk10' => [
      'code_config' => [
        'min' => 1,
        'max' => 10,
        'num' => 10,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'ydwpk10',
      'list' => [
        [
            'url' => 'http://api.b1api.com/api?p=json&t=xyft&limit=1&token=6466E8F63C89A346',
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
    'klpk10' => [
      'code_config' => [
        'min' => 1,
        'max' => 10,
        'num' => 10,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'klpk10',
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
    'jisuft' => [
      'code_config' => [
        'min' => 1,
        'max' => 10,
        'num' => 10,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'jisuft',
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
    'yfsc' => [
      'code_config' => [
        'min' => 1,
        'max' => 10,
        'num' => 10,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'yfsc',
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
    'xypk10' => [
      'code_config' => [
        'min' => 1,
        'max' => 10,
        'num' => 10,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'xypk10',
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
    'xjpsm' => [
      'code_config' => [
        'min' => 1,
        'max' => 10,
        'num' => 10,
        'is' => true,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'xjpsm',
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
    'bjpk10' => [
      'field' => 'code,expect,time',
      'type' => 'bjpk10',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=bjpks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
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
    ]
  ];
