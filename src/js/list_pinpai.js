define(["jq","data"],function(jq,data){
    let itemArr = data;
    // console.log(itemArr);
    // 点击更多打开,收起
    let $more = $(".more");
    let $strong = $(".more strong");
    let $i = $(".more i");
    let $pinpais = $(".pinpais");
    let flag1 = true;
    $more.on("click",function(){
        if(flag1){
            $strong.html("收起");
            $i.css("background-position","-105px 0");
            $pinpais.css("height",100);
        }else{
            $strong.html("更多");
            $i.css("background-position","-113px 0");
            $pinpais.css("height",50)
        }
        flag1 = !flag1;
    });

    // 点击多选按钮 多选
    let $duoxuan = $(".duoxuan");
    let flag2 = true;
    $duoxuan.on("click",function(){
        if(flag2){
            $(this).css("background-position","-150px -76px");
        }else{
            $(this).css("background-position","-150px -54px");
        }
        flag2 = !flag2;
    });

    //点击li把对应的商标渲染到上面 高亮
    let $li = $pinpais.children("li");
    // 获取要渲染到的p
    let $p = $(".hufutaozhuang p");
    $li.on("click",function(){
        // 如果被已经被选中了 那么再次点击 会取消高亮和删除上面的span
        if($(this).hasClass("check")){
            let target = $(`em:contains(${$(this).attr("data-title")})`);
            target.parent().remove();
            $(this).children("span,i").css("display","none");
            $(this).removeClass("check");
            return;
    }
    // 点击添加一个class用于判断是否被选中
        let $checks = $(".pinpais .check");
        if($checks.length >= 6){
            alert("品牌最多选取6个");
            return ;
        }
        $(this).addClass("check");
        // 点击之后创建一个 span
        let $sp = $("<span>");
        $sp.addClass("pp");
        let $em = $("<em>");
        let $title = $(this).attr("data-title");
        $em.html($title);
        let $b = $("<b>×</b>");
        // 给b一个点击事件 点击了能删除span
        $b.on("click",(e)=>{
            $(e.target).parent().remove();
            $(this).children("span,i").css("display","none");
            $(this).removeClass("check");
        });
        $sp.append($em).append($b);
        // 如果没选多选那么只能选一个高亮
        if(flag2){
            $li.children("span,i").css("display","none");
            // 高亮
            $(this).children("span,i").css("display","block");
            // 点击之后创建一个 span添加到 上面的p
            //单选的时候只能添加一个
            $p.children("span.pp").remove();
            $p.append($sp);
        }else{
            $(this).children("span,i").css("display","block");
            $p.append($sp);
        }
    });

    // 渲染价格区间商品数量
    let sp1 = 0,sp2 = 0,sp3 = 0,sp4 = 0;
    itemArr.forEach(function(item){
        let jiage = item.newprice;
        // console.log(jiage);
        if(jiage > 0 && jiage < 100){
            sp1++;
        }else if(jiage >= 100 && jiage < 200){
            sp2++;
        }else if(jiage >=200 && jiage <300){
            sp3++;
        }else if(jiage >=300){
            sp4++;
        }
    });
    $(".c_r ul li .sp1").html("("+sp1+")");
    $(".c_r ul li .sp2").html("("+sp2+")");
    $(".c_r ul li .sp3").html("("+sp3+")");
    $(".c_r ul li .sp4").html("("+sp4+")");

    $oLi = $(".c_r ul li");
    $oLi.on("click",function(){
        let $span = $("<span>");
        $span.addClass("jg");
        let $em = $("<em>");
        let $b = $("<b>×</b>");
        $b.on("click",function(e){
            $(e.target).parent().remove();
        });
        let str = $(this).text();
        str = str.match(/\d+\-?\d+\S/)[0];
        // console.log(str);
        $em.html(str);
        $p.children("span.jg").remove();
        $span.append($em).append($b).appendTo($p);
    });


    // 折扣渲染
    let zhe0=0,zhe1=0,zhe2=0,zhe3=0,zhe4=0,zhe5=0,zhe6=0,zhe7=0,zhe8=0,zhe9=0;
    itemArr.forEach(function(item){
        let zhekou = item.zhe;
        if(zhekou > 0 && zhekou < 1){
            zhe0++;
        }else if(zhekou >= 1 && zhekou < 2){
            zhe1++;
        }else if(zhekou >=2 && zhekou < 3){
            zhe2++;
        }else if(zhekou >= 3 && zhekou < 4){
            zhe3++;
        }else if(zhekou >= 4 && zhekou < 5){
            zhe4++;
        }else if(zhekou >= 5 && zhekou < 6){
            zhe5++;
        }else if(zhekou >= 6 && zhekou < 7){
            zhe6++;
        }else if(zhekou >= 7 && zhekou < 8){
            zhe7++;
        }else if(zhekou >= 8 && zhekou < 9){
            zhe8++;
        }else if(zhekou >= 9){
            zhe9++;
        }
    });
    $(".zhe0").html("("+zhe0+")");
    $(".zhe1").html("("+zhe1+")");
    $(".zhe2").html("("+zhe2+")");
    $(".zhe3").html("("+zhe3+")");
    $(".zhe4").html("("+zhe4+")");
    $(".zhe5").html("("+zhe5+")");
    $(".zhe6").html("("+zhe6+")");
    $(".zhe7").html("("+zhe7+")");
    $(".zhe8").html("("+zhe8+")");
    $(".zhe9").html("("+zhe9+")");
    let $zheLi = $(".b_r ul li");
    $zheLi.on("click",function(){
        let $span = $("<span>");
        $span.addClass("zk");
        let $em = $("<em>");
        let $b = $("<b>×</b>");
        $b.on("click",function(e){
            $(e.target).parent().remove();
        });
        let str = $(this).text();
        str = str.match(/\d+\-?\d?\S+/)[0];
        $em.html(str);
        $p.children("span.zk").remove();
        $span.append($em).append($b).appendTo($p);
    });
    // 点击各种筛选时获取数据
    let $filter_ul = $(".filter_ul");
    let ppArr = [];
    let jgArr = [];
    let zkArr = [];
    fltdianji();
    function fltdianji(){
        $filter_ul.on("click","ul li",function(e){
            ppArr = [];
            let $pp = $(".pp");
            let $jg = $(".jg");
            let $zk = $(".zk");
            // console.log($pp,$jg,$zk);
            for(let i = 0;i < $pp.length;i++){
                let item = $pp[i];
                item = item.innerText.slice(0,-1);
                if(ppArr.indexOf(item) == -1){
                    ppArr.push(item);
                }
            }

            if($jg.length > 0){
                jgArr = $jg.text().split("-");
                for(let i = 0;i < jgArr.length;i++){
                    if(jgArr.length == 1){
                        jgArr = [300,10000];
                    }
                    jgArr[i] = parseInt(jgArr[i]);
                }
            }else{
                jgArr = [];
            }
            if($zk.length > 0){
                zkArr = $zk.text().split("-");
                for(let i = 0;i < zkArr.length;i++){
                    if(zkArr.length == 1){
                        zkArr = [9,10]
                    }
                    zkArr[i] = parseInt(zkArr[i]);
                }
            }else{
                zkArr = [];
            }
            // console.log(ppArr,jgArr,zkArr);
            let cloneArr = [];
            for(let i = 0;i < itemArr.length;i++){
                cloneArr.push(itemArr[i]);
            }
            shuju(cloneArr);
        });
    }


    // 排序方式
    let $paixuLi = $(".paixu_l li");
    for(let i = 0;i < $paixuLi.length;i++){
        $paixuLi[i].flag = true;
    }
    let paixu = "id";
    $paixuLi.on("click",function(){
       $paixuLi.removeClass("cur");
       $(this).addClass("cur");
       // console.log($(this).text());
       // console.log(this.flag);
       if(!this.flag){
           $(this).children("i").addClass("active");
       }else{
           $(this).children("i").removeClass("active");
       }
       if($(this).text()=="默认"){
           paixu = "id";
       }else if($(this).text().includes("价格")){
           if(this.flag){
               // 价格升序排列
               paixu = "jgsx";
           }else{
               // 价格降序排列
               paixu = "jgjx";
           }
       }else if($(this).text().includes("销量")){
           if(this.flag){
               // 销量升序排列
               paixu = "xlsx";
           }else{
               // 销量降序排列
               paixu = "xljx";
           }
       }
       console.log(paixu);
       shuju();
        this.flag = !this.flag;
    });

    let list_ul = $(".list ul")[0];
    let pageIdx = 1;
    let $leftBtn = $(".leftBtn");
    let $rightBtn = $(".rightBtn");
    shuju();
    paixuRendar();
    pageRendar();
    let $pageLi = $(".pageLi");
    $leftBtn.on("click",function(){
        pageIdx--;
        change();
    });
    $rightBtn.on("click",function(){
        pageIdx++;
        change();
    });
    $pageLi.on("click",function(){
        pageIdx = this.innerText;
        change();
    });
    let $firstLi = $(".firstLi");
    $firstLi.on("click",function(){
        pageIdx--;
        change();
    });
    let $lastLi = $(".lastLi");
    $lastLi.on("click",function(){
        pageIdx++;
        change();
    });
    // 获取数据

    function shuju(arr){
        $.ajax({
            type:"get",
            url:"../api/list.php?qty=8&currentPage="+pageIdx+"&paixu="+paixu,
            success : function(res){
                res = JSON.parse(res);
                let cartArr = arr;
                console.log(cartArr);
                if(ppArr.length > 0){
                    for(let i = cartArr.length - 1;i >= 0;i--){
                        let item = cartArr[i];
                        for(j=0;j<ppArr.length;j++){
                            if(ppArr[j] == item.pp){
                                // cartArr.push(item);
                            }else{
                                cartArr.splice(i,1);
                            }
                        }
                    }
                }
                if(jgArr.length > 0){
                    console.log(jgArr);
                    for(let i = cartArr.length - 1;i >= 0;i--){
                        let item = cartArr[i];
                        if(item.newprice > jgArr[0] && item.newprice < jgArr[1]){
                            // cartArr = [item];
                            // console.log(item);
                        }else{
                            // console.log(item.newprice);
                            cartArr.splice(i,1);
                        }
                    }
                }
                if(zkArr.length > 0){
                    for(let i = cartArr.length - 1;i >= 0;i--){
                        let item = cartArr[i];
                        item.zhe = (item.newprice / item.oldprice)*10;
                        if(item.zhe > zkArr[0] && item.zhe < zkArr[1]){
                            // cartArr.push(item);
                        }else{
                            cartArr.splice(i,1);
                        }
                    }
                }
                console.log(cartArr);
                listRendar(res.data);
                // if(jgArr.length>0 || ppArr.length>0 || zkArr.length>0){
                //     listRendar(cartArr);
                // }
                // console.log(res);
                let $lilist = $(".lilist");
                // console.log($lilist);
                $lilist.on("click",function(){
                    let guid = $(this).attr("guid");
                    location.href = "../html/details.html?id="+guid;
                });
            },
            async : false
        });
    }


    // 渲染商品列表
    function listRendar(arr){
        list_ul.innerHTML = arr.map(function(item){
            let zhekou = (item.newprice / item.oldprice).toFixed(2);
            item.zhe = (zhekou * 10 + "").slice(0,3);
            return `<li class="lilist" guid="${item.id}">
                    <img src="${item.img1}" alt="">
                    <p>
                        ${item.title}
                    </p>
                    <span style="color:#f00;margin-left:22px;">
                        ￥
                    </span>
                    <span style="color:#f00;font-size:14px;">
                        ${item.newprice}
                    </span>
                    <span style="color:#f00">
                        （${item.zhe}折）
                    </span>
                    <del style="color:#ccc;">
                        ￥${item.oldprice}
                    </del><br>
                    <button class="cartBtn">
                        加入购物车
                    </button>
                    <div class="tips">
                        <span>${item.tip}</span>
                    </div>
                </li>`;
        }).join("")
    }
    //渲染paixu_r
    function paixuRendar(){
        let $itemNum = $(".itemNum");
        let $pageCur = $(".pageCur");
        let $pageTotal = $(".pageTotal");
        $itemNum.html(itemArr.length);
        $pageCur.html(pageIdx);
        $pageTotal.html(Math.ceil(itemArr.length / 8));
    }

    // 渲染下面的页数
    function pageRendar(){
        let pages = Math.ceil(itemArr.length / 8);
        for(let i = 1;i <= pages;i++){
            let $li = $("<li>");
            $li.addClass("pageLi");
            if(i == 1){
                $li.addClass("cur");
            }
            $li.html(i).insertBefore($(".lastLi"));
        }
    }

    // pageIdx变化时的change函数
    function change(){
        let pages = Math.ceil(itemArr.length / 8);
        if(pageIdx < 1){
            pageIdx = 1;
        }
        if(pageIdx > pages){
            pageIdx = pages;
        }
        if(pageIdx == 1){
            $(".leftBtn").css("background-position","-143px -38px");
            $(".firstLi").css("background-color","#ccc");
        }else{
            $(".leftBtn").css("background-position","-96px -38px");
            $(".firstLi").css("background-color","#fff");
        }
        if(pageIdx == pages){
            $(".rightBtn").css("background-position","-159px -38px");
            $(".lastLi").css("background-color","#ccc");
        }else{
            $(".rightBtn").css("background-position","-112px -38px");
            $(".lastLi").css("background-color","#fff");
        }
        shuju();
        paixuRendar();
        $pageLi.removeClass("cur");
        $pageLi.eq(pageIdx - 1).addClass("cur");
    }
});