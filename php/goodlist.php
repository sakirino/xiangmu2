<?php
// 1.连接数据库。
include "conn.php";//引入conn.php文件

// 2.查找所有数据。
// limit关键字后面跟两个参数
// 参数1：开始的索引编号，从0开始 
// 参数2：数据的条数(记录集条数)
$sql = "select * from goods_list limit 0,50";//获取taobaogoods表里面的所有数据。
$result=$conn->query($sql);//执行sql语句,将获取的数据给$result对象。


// 3.遍历数据，生成接口。
$arr = [];
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}

// 4.输出json格式
echo json_encode($arr);