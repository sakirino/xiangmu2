<?php

// 数据库连接的代码
define('HOST','localhost');//主机名
define('USERNAME','root');//用户名
define('PASSWORD','root');//密码
define('DBNAME','js2112data');//数据库名称
$conn = @new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//@符号将这条语句的错误隐藏，下面已经自定义错误了
if($conn->connect_error){//利用$conn->connect_error检测是否有错误。
    die('数据库连接错误，请检查!!!');//die函数退出并且输出括号里面的参数。
}
