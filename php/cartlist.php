<?php
// 1.连接数据库。
include "conn.php";//引入conn.php文件

// 2.查找所有数据。
$sql = "select * from goods_list";//获取taobaogoods表里面的所有数据。
$result=$conn->query($sql);//执行sql语句,将获取的数据给$result对象。


// 3.遍历数据，生成接口。
$arr = [];
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

// 4.输出json格式
echo json_encode($arr);