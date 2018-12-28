<?php

     $name = isset($_POST["name"]) ? $_POST["name"] : null;
     $pwd = isset($_POST["upwd"]) ? $_POST["upwd"] : null;
     $register = isset($_POST["register"]) ? $_POST["register"] : null;

    $servername = "localhost";
                $username = "root";//（一般都为root）
                $password = "";//（一般写""）
                $dbname = 'lefengwang';//(数据库名字)

                // 创建连接
                $conn = new mysqli($servername, $username, $password, $dbname);

                // 检测连接
                if ($conn->connect_error) {
                    die("连接失败: " . $conn->connect_error);
                }

                //查询前设置编码，防止输出乱码
                $conn->set_charset('utf8');
               //编写sql语句
                   $sql = 'select * from user';//student是数据库中的表名

                   //获取查询结果集
//                   $res = $conn->query('select * from user where username="'.$tel.'"');

                //3.执行查询语句，得到查询结果集(对象)

                   $res = $conn->query('select * from user where username="'.$name.'"');
                       if($res->num_rows > 0){
                               echo "该用户名已被注册";
                       }else{
                            if($register){
                                $res = $conn->query('insert into user (username,password) values ("'.$name.'","'.$pwd.'")');
                                if($res){
                                    echo "插入成功";
                                }else{
                                    echo "插入失败";
                                }
                            }else{
                                echo "该用户名可用";
                            }
                        }
                   //释放查询结果集，避免资源浪费
//                   $result->close();


                   //把结果输出到前台
//                   echo json_encode($row);

                   // 关闭数据库，避免资源浪费
                   $conn->close();






?>