<?php
//接收sid，将sid对应的数据返回出来
include "conn.php";

if(isset($_GET['sid'])){//判断sid是否存在，存在获取sid对应的数据，返回给前端
    $sid = $_GET['sid'];//获取sid
    $sql = "select * from goods_list where id=$sid";//sql语句
    $result = $conn->query($sql);//执行sql语句，输出结果
    echo json_encode($result->fetch_assoc());//返回
}