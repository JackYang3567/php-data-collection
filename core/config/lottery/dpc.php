<?php

  return [
      'ssq' => [
          'field' => 'code,expect,time',
          'type' => 'ssq',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/ssq?sb_spm=da07ce6bd651f2bef8b5ec68ce0b07c1',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['span','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                          $data .= ($i>0?',':'').substr($content,$i,2);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 21:20:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ],
      'dlt' => [
          'field' => 'code,expect,time',
          'type' => 'dlt',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/slt?a=qgkj&r_a=baQfuq',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['span','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                          $data .= ($i>0?',':'').substr($content,$i,2);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 20:30:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ],
      'sd' => [
          'field' => 'code,expect,time',
          'type' => 'sd',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/sd?sb_spm=243274e44356513693a63ce417fdfc3d',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['td:eq(2)','text',null,function($content){ // 如果要试机号,加上 ,td:eq(3)
                        $content = preg_replace('/[^\d-]/','',$content);
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 21:15:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ],
      'qlc' => [
          'field' => 'code,expect,time',
          'type' => 'qlc',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/qlc?sb_spm=bbc8ae0403671654fe439e2cc7c6232f',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['td:eq(2),td:eq(3)','text',null,function($content){
                        $content = preg_replace('/[^\d-]/','',$content);
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                          $data .= ($i>0?',':'').substr($content,$i,2);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 21:20:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ],
      'swxw' => [
          'field' => 'code,expect,time',
          'type' => 'swxw',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/xw?sb_spm=057b7deb1c4fa5a1b7202727688e873a',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['td:eq(2)','text',null,function($content){
                        $content = preg_replace('/[^\d-]/','',$content);
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 2){
                          $data .= ($i>0?',':'').substr($content,$i,2);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 19:10:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ],
      'qxc' => [
          'field' => 'code,expect,time',
          'type' => 'qxc',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/qxc?sb_spm=e0ad1e5e9aa18d2ad02af73f8a46d3a1',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['span','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 20:30:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ],
      'pls' => [
          'field' => 'code,expect,time',
          'type' => 'pls',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/p3?sb_spm=a863129e280ffe2a4d863c28732d8738',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['span','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 20:30:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ],
      'plw' => [
          'field' => 'code,expect,time',
          'type' => 'plw',
          'list' => [
            [
                'url' => 'http://chart.cp.360.cn/kaijiang/p5?sb_spm=87f463e996bee6093038d9d1dd99ed47',
                'mode' => 'html',
                'range' => '#data-tab>tr',
                'rules' => [
                  'code' => ['span','text',null,function($content){
                        for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                          $data .= ($i>0?',':'').substr($content,$i,1);
                        }
                        return $data;
                    }],
                  'expect' => ['td:eq(0)','text'],
                  'time' => ['td:eq(1)','text',null,function($content){
                    return preg_replace('/[^\d-]/','',$content) . ' 20:30:00';
                  }]
                ],
                'callback' => function($data){
                  $data = array_reverse($data);
                  return $data;
                }
            ]
        ]
      ]
  ];
