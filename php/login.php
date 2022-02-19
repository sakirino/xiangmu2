<?php

include "conn.php";

if(isset($_POST['user']) && isset($_POST['pass'])){
    $user = $_POST['user'];//获取用户名
    $pass = sha1($_POST['pass']);//获取用密码
    $sql = "select * from login_registry where username='$user' and password='$pass' ";
    $result1=$conn->query($sql);//执行sql1
    if($result1->fetch_assoc()){//存在
        echo '1';
    }else{//不存在
        echo '2';
    }
}else if (isset($_POST['tel']) && isset($_POST['pass'])){
    $tel = $_POST['tel'];//获取用户名
    $pass = sha1($_POST['pass']);//获取用密码
    $sql = "select * from login_registry where tel='$tel' and password='$pass' ";
    $result1=$conn->query($sql);//执行sql1
    if($result1->fetch_assoc()){//存在
        echo '1';
    }else{//不存在
        echo '2';
    }
}