<?php

  return [
    'hltb' => [
      'code_config' => [
        'min' => 1,
        'max' => 6,
        'num' => 3,
        'is' => false,
        'repeat' => false
      ],
      'field' => 'code,expect,time',
      'type' => 'hltb',
      'list' => [
        // ***
      ]
    ],
    'brnn' => [
      'code_config' => [
        'min' => 0,
        'max' => 51,
        'num' => 10,
        'is' => false,
        'repeat' => true
      ],
      'field' => 'code,expect,time',
      'type' => 'brnn',
      'list' => [
        // ***
      ]
    ]
  ];
