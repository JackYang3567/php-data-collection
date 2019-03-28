<?php

  return [
    'dm28' => [
      'code_config' => [
        'min' => 0,
        'max' => 9,
        'num' => 3,
        'is' => false,
        'repeat' => false
      ],
      'field' => 'code,expect,time',
      'type' => 'dm28',
      'list' => [
        // ***
      ]
    ],
    'trq28' => [
      'code_config' => [
        'min' => 0,
        'max' => 9,
        'num' => 3,
        'is' => false,
        'repeat' => false
      ],
      'field' => 'code,expect,time',
      'type' => 'trq28',
      'list' => [
        // ***
      ]
    ],
    'bj28' => [
        'field' => 'code,expect,time',
        'type' => 'bj28',
        'list' => [
          [
            'url' => 'http://api.caipiaokong.cn/lottery/?name=bjklb&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
            'mode' => 'json',
            'callback' => function($data){
              $return_data = [];
              foreach ($data as $key => $value) {
                $is_array = explode(',', $value['number']);
                // 这里不进行排序,给的号码已经排好序了,(这里开了 21 个号，最后一个号永远是 01,排序就错了)
                // sort($is_array);
                $is_array = [
                  ($is_array[1-1] + $is_array[2-1] + $is_array[3-1] + $is_array[4-1] + $is_array[5-1] + $is_array[6-1]) % 10,
                  ($is_array[7-1] + $is_array[8-1] + $is_array[9-1] + $is_array[10-1] + $is_array[11-1] + $is_array[12-1]) % 10,
                  ($is_array[13-1] + $is_array[14-1] + $is_array[15-1] + $is_array[16-1] + $is_array[17-1] + $is_array[18-1]) % 10
                ];
                $return_data[] = [
                  'code' => join(',',$is_array),
                  'expect' => $key,
                  'time' => $value['dateline']
                ];
              }
              return array_reverse($return_data);
            }
          ],
          [
              'url' => 'http://pckai.cc/api/numbers?take=50&code=bjkl8',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['numbers'],
                    'expect' => $value['no'],
                    'time' => $value['sysTime']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
        ]
    ],
    'jnd28' => [
        'field' => 'code,expect,time',
        'type' => 'jnd28',
        'list' => [
          [
            'url' => 'http://api.caipiaokong.cn/lottery/?name=jndklb&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
            'mode' => 'json',
            'callback' => function($data){
              $return_data = [];
              foreach ($data as $key => $value) {
                $is_array = explode(',', $value['number']);
                sort($is_array);
                $is_array = [
                  ($is_array[2-1] + $is_array[5-1] + $is_array[8-1] + $is_array[11-1] + $is_array[14-1] + $is_array[17-1]) % 10,
                  ($is_array[3-1] + $is_array[6-1] + $is_array[9-1] + $is_array[12-1] + $is_array[15-1] + $is_array[18-1]) % 10,
                  ($is_array[4-1] + $is_array[7-1] + $is_array[10-1] + $is_array[13-1] + $is_array[16-1] + $is_array[19-1]) % 10
                ];
                $return_data[] = [
                  'code' => join(',',$is_array),
                  'expect' => $key,
                  'time' => $value['dateline']
                ];
              }
              return array_reverse($return_data);
            }
          ],
          [
            'url' => 'http://pckai.cc/api/numbers?take=50&code=cakeno',
            'mode' => 'json',
            'callback' => function($data){
              $return_data = [];
              foreach ($data as $key => $value) {
                $return_data[] = [
                  'code' => $value['numbers'],
                  'expect' => $value['no'],
                  'time' => $value['sysTime']
                ];
              }
              return array_reverse($return_data);
            }
          ]
      ]
    ]
  ];
