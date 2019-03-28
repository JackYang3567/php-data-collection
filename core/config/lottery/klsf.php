<?php

  return [
    'xync' => [
      'field' => 'code,expect,time',
      'type' => 'xync',
      'list' => [
          [
              'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=cqklsf&format=json',
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
          ]
      ]
    ],
  //  'gxklsf' => [
  //    'field' => 'code,expect,time',
  //    'type' => 'gxklsf',
  //    'list' => [
  //        [
  //            'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=gxklsf&format=json',
  //            'mode' => 'json',
  //            'callback' => function($data){
  //              $return_data = [];
  //              foreach ($data['data'] as $key => $value) {
  //                $return_data[] = [
  //                  'code' => $value['opencode'],
  //                  'expect' => $value['expect'],
  //                  'time' => $value['opentime']
  //                ];
  //              }
  //              return array_reverse($return_data);
  //            }
  //        ]
  //     ]
  //  ],
  'gxklsf' => [
    'field' => 'code,expect,time',
    'type' => 'gxklsf',
    'list' => [
        [
            'url' => 'http://e.apiplus.net/newly.do?token=t092b5c0ab849c0e7k&code=gxklsf&format=json',
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
    ]
  ];
