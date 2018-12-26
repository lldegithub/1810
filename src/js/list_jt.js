define(["jq","data"],function(jq,data){
    // 控制商品分类那里的那个箭头转
    let $classify = $(".classify");
    console.log($classify);
    let $i = $classify.children(".classify_i");
    $classify.on("mouseenter",function(){
        $i.css({"transform":"rotate(180deg)","transition":"all .3s"});
    }).on("mouseleave",function(){
        $i.css({"transform":"rotate(0deg)","transition":"all .3s"});
    });
    // 搜索框
    let $ipt = $(".ipt");
    let $sousuo_t = $(".sousuo_t");
    $ipt.on("focus",function(){
        $sousuo_t.css("background-position","0 -483px");
    }).on("blur",function(){
        $sousuo_t.css("background-position","0 -443px");
    });
    // 轮播图
    let $lunbo_b = $(".lunbo_b");
    let $ul = $("<ul>");
    $ul.appendTo($lunbo_b);
    let itemArr = data;
    // console.log(itemArr,$ul);
    let $curlunbo = $(".curlunbo");
    let qty = 4;
    let len = itemArr.length;
    let pageTotal = len / qty;
    let pageIdx = 1;
    $ul.css("width",250 * len);
    $(".totallunbo").html(pageTotal);

    lunboRendar(itemArr);

    let $lunboli = $(".lunboli");
    $lunboli.on("click",function(){
        let guid = $(this).attr("guid");
        location.href = "../html/details.html?id="+guid;
    });
    let $leftSp = $(".leftSp");
    let $rightSp = $(".rightSp");
    let $shangBtn = $(".shangBtn");
    let $xiaBtn = $(".xiaBtn");
    $lunbo_b.on("mouseover",function(){
        $leftSp.css("display","block");
        $rightSp.css("display","block");
    }).on("mouseout",function(){
        $leftSp.css("display","none");
        $rightSp.css("display","none");
    });
    $leftSp.on("click",function(){
        pageIdx--;
        change();
    });
    $rightSp.on("click",function(){
        pageIdx++;
        change();
    });
    $shangBtn.on("click",function(){
        pageIdx--;
        change();
    });
    $xiaBtn.on("click",function(){
        pageIdx++;
        change();
    });
    // 渲染轮播图函数
    function lunboRendar(arr){
        let str = "";
        str += arr.map(function(item){
            return `<li class="lunboli" guid="${item.id}">
                        <img src="${item.img1}" alt="">
                        <p>
                            ${item.zhe}${item.title}
                        </p>
                        <span>￥${item.newprice}</span>
                        <del>￥${item.oldprice}</del>
                    </li>`;
        }).join("");
        $ul.html(str);
    }

    // change函数
    function change(){
        if(pageIdx <  1){
            pageIdx = 1;
        }
        if(pageIdx > pageTotal){
            pageIdx = pageTotal;
        }
        if(pageIdx == 1){
            $shangBtn.css("background-position","-143px -38px")
        }else{
            $shangBtn.css("background-position","-96px -38px")
        }
        if(pageIdx == pageTotal){
            $xiaBtn.css("background-position","-159px -38px")
        }else{
            $xiaBtn.css("background-position","-112px -38px")
        }
        $curlunbo.html(pageIdx);
        $ul.animate({"left":-(pageIdx - 1)* qty * 250},500);
    }
});