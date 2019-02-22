<?php
require 'route.php';
$action = 'output/Index.php';
is_array($_GET) && count($_GET) > 0 && isset($_GET["action"]) && ($action = $_GET["action"]);
isset($route[$action]) && ($action = $route[$action]);
require($action);
