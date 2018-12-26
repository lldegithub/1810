<?php
    //0.需要前端告诉我，你想要第几页，每一页有多少条
        $qty = isset($_GET["qty"])? $_GET["qty"]: 5;
        $currentPage = isset($_GET["currentPage"])? $_GET["currentPage"]: 1;
    //排序方式
        $paixu = isset($_GET["paixu"])?$_GET["paixu"] : "id";
//        var_dump($paixu,$currentPage);
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
                   $sql = 'select * from items';//student是数据库中的表名

                   //获取查询结果集
                   $result = $conn->query($sql);

                   //使用查询结果集
                   //得到数组
                   $row = $result->fetch_all(MYSQLI_ASSOC);

                   //释放查询结果集，避免资源浪费
                   $result->close();

//                   //把结果输出到前台
//                   echo json_encode($row);

                   // 关闭数据库，避免资源浪费
                   $conn->close();


function array_sort($array,$keys,$type='asc'){
//$array为要排序的数组,$keys为要用来排序的键名,$type默认为升序排序
$keysvalue = $new_array = array();
foreach ($array as $k=>$v){
$keysvalue[$k] = $v[$keys];
}
if($type == 'asc'){
asort($keysvalue);
}else{
arsort($keysvalue);
}
reset($keysvalue);
foreach ($keysvalue as $k=>$v){
$new_array[$k] = $array[$k];
}
return $new_array;
}

//            var_dump($row);
        if($paixu == "id"){
            $row = $row;
        }else if($paixu == "jgsx"){
            $row = array_sort($row,"newprice",$type="jiang");
        }else if($paixu == "jgjx"){
            $row = array_sort($row,"newprice",$type="asc");
        }else if($paixu == "xlsx"){
            $row = array_sort($row,"sales",$type="jiang");
        }else if($paixu == "xljx"){
            $row = array_sort($row,"sales",$type="asc");
        }
//        var_dump($row);
        $len = count($row);
        $data = array_slice($row,($currentPage - 1)*$qty,$qty);
        $res = array(
            "data" => $data,
            "len" => $len,
            "qty" => $qty,
            "currentPage" => $currentPage
        );
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>