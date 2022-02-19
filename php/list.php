<?php
//1.连接数据库
include "conn.php";

//2.查询渲染数据
$result=$conn->query("select * from goods_list"); //获取所有的数据
$num = $result->num_rows; //记录集的总条数   342

//3.定义变量定义每一页显示的条数
$pagesize = 56; //自定义每页的数据条数,单个页面展示的数据条数。

//4.计算总的页数
$pagenum = ceil($num / $pagesize); //获取页数，一定选择向上取整。 7页


//5.获取前端的传来的页码，根据页码查询对应的数据，返回给前端。
if (isset($_GET['page'])) {//判断前端传入的页面是否存在，
    $pagevalue = $_GET['page'];//获取页面
} else {
    $pagevalue = 1;//默认为1
}


//6.根据前端出入的page的值返回对应的数据。
// limit 后面有两个参数
// 参1：起始的偏移值的索引，从0开始   58数据(0-57)
// 参2：数据的条数
//根据limit的第一个参数和前端传入的页码得到这个等式。
$page = ($pagevalue - 1) * $pagesize; 

//排序+分页
//sql语句：order by 进行排序    ASC升序    DESC降序
//order by price ASC  按照价格的升序排列  price价格
//order by price DESC 按照价格的降序排列  price价格
if(isset($_GET['sort'])){//排序+分页
    if($_GET['sort']==='asc'){//升序
        $sql1 = "select * from goods_list order by goods_price ASC limit $page,$pagesize";//这里的sql语句跟页码有关，返回当前和页码相对应的数据。
    }else if($_GET['sort'] === 'desc'){//降序
        $sql1 = "select * from goods_list order by goods_price DESC limit $page,$pagesize";//这里的sql语句跟页码有关，返回当前和页码相对应的数据。
    }
}else{//分页
    $sql1 = "select * from goods_list limit $page,$pagesize";//这里的sql语句跟页码有关，返回当前和页码相对应的数据。
}

$res = $conn->query($sql1);//执行sql语句


//通过二维数组输出
// $result->num_rows; //记录集的条数
// $result->fetch_assoc(); //逐条获取记录集的值，结果是数组。
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
// echo json_encode($arr);

// 输出复杂接口(获取多个值)
// 将简单接口的值当中实例对象的属性。
class pagedata{//定义类

}

$page1 = new pagedata();//实例化对象

$page1->pagesize =  $pagenum; //将页数传递给实例对象  总的页数
$page1->pagecontent = $arr;//将数据传递给实例对象  接口的内容
echo json_encode($page1);//json格式:接口返回总的页数和当页对应的数据。



