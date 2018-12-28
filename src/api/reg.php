<?php
    $name = isset($_POST["name"]) ? $_POST["name"] : null;
    $pwd = isset($_POST["pwd"]) ? $_POST["pwd"] : null;
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'lefengwang';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }
    //2.查询前设置编码，防止输出乱码
        $conn->set_charset('utf8');

$result = $conn->query('select * from user where username ="'.$name.'" and password="'.$pwd.'"');
    if($result->num_rows > 0){
        echo "验证成功";
    }else{
        echo "用户名或者密码错误";
    }



?>