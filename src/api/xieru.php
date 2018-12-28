<?php
     $name = isset($_POST["name"]) ? $_POST["name"] : null;
     $cartStr = isset($_POST["cart"]) ? $_POST["cart"] : null;
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
//                echo $cartStr;
   $conn->query("update user set cart = '".$cartStr."' where username ='".$name."'");


?>