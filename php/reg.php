<?php
// 载入数据库连接的代码
include "conn.php";

// 获取前端传入的用户名和数据库比较，确认是否存在。
if(isset($_POST['tel'])){// isset():检测括号里面的值是否存在。
    $tel = $_POST['tel'];//获取用户名
    $sql = "select * from login_registry where tel = '$tel'"; //查询表里面的用户名是否存在。
    $result = $conn->query($sql);//执行sql语句，放查询的结果给$result
    if($result->fetch_assoc()){//$result->fetch_assoc():逐条获取$result里面的内容
        echo 'true';//存在
    }else{
        echo 'false';//不存在
    }
}
if(isset($_POST['username'])){// isset():检测括号里面的值是否存在。
    $user = $_POST['username'];//获取用户名
    $sql = "select * from login_registry where username = '$user'"; //查询表里面的用户名是否存在。
    $result = $conn->query($sql);//执行sql语句，放查询的结果给$result
    if($result->fetch_assoc()){//$result->fetch_assoc():逐条获取$result里面的内容
        echo 'true';//存在
    }else{
        echo 'false';//不存在
    }
}

// 2.获取前端form表单提交的数据，提交给数据库   
if(isset($_POST['submit'])){//确认前端已经点击了submit提交按钮
    $user = $_POST['username'];//获取用户名
    $pass = sha1($_POST['password']);//获取密码，同时加密
    $repass =sha1($_POST['repass']);//获取密码确认，同时加密
    $tel = $_POST['tel'];;//获取手机号码
    $sql = "insert login_registry values(null,'$user','$pass','$repass','$tel')"; //查询表里面的用户名是否存在。
    $conn->query($sql);//执行sql语句,将表单的数据提交给数据库
    // 提交成功，将页面跳转到登录页面。后端跳前端选择绝对路径
    header('location:http://localhost/JS2112/Project%20JD/src/html/JD%20login.html');
}
