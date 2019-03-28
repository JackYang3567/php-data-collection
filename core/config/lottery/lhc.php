<?php

  return [
    'jslhc' => [
        'code_config' => [
          'min' => 1,
          'max' => 49,
          'num' => 7,
          'is' => true,
          'repeat' => true
        ],
        'field' => 'code,expect,time',
        'type' => 'jslhc',
        'list' => [
          [
              'url' => 'http://www.1396kk.com/marksix/history/', // http://www.1396kk.com/marksix/history/2012?type=1
              'mode' => 'html',
              'range' => '.history_numbers>tr',
              'rules' => [
                'code' => ['td:eq(1)>div>span,td:eq(2)>div>span','text',null,function($content){
                      $content = preg_replace('/[^\d]/','',$content);
                      for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                        $data .= ($i>0?',':'').substr($content,$i,2);
                      }
                      return $data;
                  }],
                'expect' => ['td:eq(0)','text',null,function($content){
                      $content = preg_replace('/[^\d]/','',$content);
                      $content = substr($content,-4) . substr($content,0,3);
                      return $content;
                  }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]
          // http://kj.13322.com/lhc_history_d2017_100.html 备用采集
      ]
    ],
    'lhc' => [
        'field' => 'code,expect',
        'type' => 'lhc',
        'list' => [
          [
              'url' => 'http://ho.apiplus.net/newly.do?token=tb39a478c9a36ed74k&code=hk6&rows=10&format=json',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data['data'] as $key => $value) {
                  $return_data[] = [
                    'code' => preg_replace('/\+/',',',$value['opencode']),
                    'expect' => $value['expect']
                  ];
                }
                return array_reverse($return_data);
              }
          ]/*,
          [
              'url' => 'http://www.1396kk.com/marksix/history/', // http://www.1396kk.com/marksix/history/2012?type=1
              'mode' => 'html',
              'range' => '.history_numbers>tr',
              'rules' => [
                'code' => ['td:eq(1)>div>span,td:eq(2)>div>span','text',null,function($content){
                    $content = preg_replace('/[^\d]/','',$content);
                    for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                      $data .= ($i>0?',':'').substr($content,$i,2);
                    }
                    return $data;
                }],
                'expect' => ['td:eq(0)','text',null,function($content){
                    $content = preg_replace('/[^\d]/','',$content);
                    $content = substr($content,3,4) . substr($content,0,3);
                    return $content;
                }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]*/
          // http://kj.13322.com/lhc_history_d2017_100.html 备用采集
      ]
    ]
  ];
