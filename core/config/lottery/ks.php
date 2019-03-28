<?php

  return [
    'jisuks' => [
      'code_config' => [
        'min' => 1,
        'max' => 6,
        'num' => 3,
        'is' => false
      ],
      'field' => 'code,expect,time',
      'type' => 'jisuks',
      'list' => [

      ]
    ],
    'xyks' => [
      'code_config' => [
        'min' => 1,
        'max' => 6,
        'num' => 3,
        'is' => false
      ],
      'field' => 'code,expect,time',
      'type' => 'xyks',
      'list' => [

      ]
    ],
    'tjks' => [
      'code_config' => [
        'min' => 1,
        'max' => 6,
        'num' => 3,
        'is' => false
      ],
      'field' => 'code,expect,time',
      'type' => 'tjks',
      'list' => [

      ]
    ],
    'jsks' => [
      'field' => 'code,expect,time',
      'type' => 'jsks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=jsks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr((substr(date('Y'),0,2) . $key),0,8) . substr($key,-2)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ],
          [
              'url' => 'https://kuai3.cjcp.com.cn/jiangsu/kaijiang/',
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
                'time' => ['td:eq(1)','text',null,function($content){
                  return date('Y-m-d') . ' ' . $content;
                }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ],
          [
              'url' => 'https://kuai3.cjcp.com.cn/jiangsu/kaijiang/',
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
                'time' => ['td:eq(1)','text',null,function($content){
                  return date('Y-m-d') . ' ' . $content;
                }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]
      ]
    ],
    'ahks' => [
      'field' => 'code,expect,time',
      'type' => 'ahks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=ahks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr($key,0,8) . substr($key,-2)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ],
          [
              'url' => 'https://kuai3.cjcp.com.cn/anhui/kaijiang/',
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
                'time' => ['td:eq(1)','text',null,function($content){
                  return date('Y-m-d') . ' ' . $content;
                }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]
      ]
    ],
    'bjks' => [
      'field' => 'code,expect,time',
      'type' => 'bjks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=bjks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
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
          ] /*,
          [
              'url' => 'https://kuai3.cjcp.com.cn/beijing/kaijiang/',
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
                'time' => ['td:eq(1)','text',null,function($content){
                  return date('Y-m-d') . ' ' . $content;
                }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ] */
      ]
    ],
    'gsks' => [
      'field' => 'code,expect,time',
      'type' => 'gsks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=gsks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr((substr(date('Y'),0,2) . $key),0,8) . substr($key,-2)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
      ]
    ],
    'hebks' => [
      'field' => 'code,expect,time',
      'type' => 'hebks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=hbks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr($key,0,8) . substr($key,-2)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
      ]
    ],
    'hubks' => [
      'field' => 'code,expect,time',
      'type' => 'hubks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=hubks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr($key,0,8) . substr($key,-2)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ]
      ]
    ],
    'jlks' => [
      'field' => 'code,expect,time',
      'type' => 'jlks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=jlks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr((substr(date('Y'),0,2) . $key),0,8) . substr($key,-2)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ],
          [
              'url' => 'https://kuai3.cjcp.com.cn/jilin/kaijiang/',
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
                'time' => ['td:eq(1)','text',null,function($content){
                  return date('Y-m-d') . ' ' . $content;
                }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]
      ]
    ],
    'gxks' => [
      'field' => 'code,expect,time',
      'type' => 'gxks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=gxks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr((substr(date('Y'),0,2) . $key),0,8) . substr($key,-2)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ],
          [
              'url' => 'https://kuai3.cjcp.com.cn/guangxi/kaijiang/',
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
                'time' => ['td:eq(1)','text',null,function($content){
                  return date('Y-m-d') . ' ' . $content;
                }]
              ],
              'callback' => function($data){
                array_shift($data);
                $data = array_reverse($data);
                return $data;
              }
          ]
      ]
    ],
    'shks' => [
      'field' => 'code,expect,time',
      'type' => 'shks',
      'list' => [
          [
              'url' => 'http://api.caipiaokong.cn/lottery/?name=shks&format=json&uid=729281&token=5214eea2f16b8335cb9c08c1215bc3d4dc285a31',
              'mode' => 'json',
              'callback' => function($data){
                $return_data = [];
                foreach ($data as $key => $value) {
                  $return_data[] = [
                    'code' => $value['number'],
                    'expect' => (substr((substr(date('Y'),0,2) . $key),0,8) . substr($key,-3)),
                    'time' => $value['dateline']
                  ];
                }
                return array_reverse($return_data);
              }
          ],
          [
              'url' => 'https://zst.cjcp.com.cn/cjwkuai3/view/kuai3_danxuan-sh-3-50.html',
              'mode' => 'html',
              'range' => '#pagedata>tr',
              'rules' => [
                'code' => ['td.z_bg_13','text',null,function($content){
                      for($i = 0,$j = strlen($content),$data = '';$i < $j;$i += 1){
                        $data .= ($i>0?',':'').substr($content,$i,1);
                      }
                      return $data;
                  }],
                'expect' => ['td:eq(1)','text'],
                'time' => date('Y-m-d H:i:s')
              ],
              'callback' => function($data){
                return $data;
              }
          ]
      ]
    ]
  ];
