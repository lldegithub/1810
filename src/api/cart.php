<?php
        $name = isset($_POST["name"]) ? $_POST["name"] : null;
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

    $result = $conn->query('select * from user where username ="'.$name.'"');
        if($result->num_rows > 0){
            $row = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($row);
        }else{
            echo "";
        }





?>