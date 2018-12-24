define(["jq"],function(jq){
    // 二级导航首页
    // console.log(666);
    let $nav1 = $(".nav1");
    let $jiantou = $(".jiantou");
    $nav1.on("mouseenter",".kuai",function(){
        $(this).css("background","#fff");
    }).on("mouseleave",".kuai",function(){
        $(this).css("background","#F7F7F7");
    });
    $nav1.on("mouseenter",function(){
        $(this).animate({"height":580},500).css("box-shadow","0 3px 3px 3px #ccc");
        $jiantou.css("display","none");
    }).on("mouseleave",function(){
        $(this).animate({"height":360},500,function(){
            $jiantou.css("display","block");
        }).css("box-shadow","none");
    });
    // 轮播图
    let $banner = $(".banner");
    let idx = 0;
    let timer = null;
    let $img = $(".banner img");
    let $ul = $(".banner ul");
    let $li = $(".banner ul li");
    timer = setInterval(function(){
        idx++;
        change();
    },2000);
    $banner.on("mouseover",function(){
        clearInterval(timer);
    }).on("mouseout",function(){
        timer = setInterval(function(){
            idx++;
            change();
        },2000);
    });
    $ul.on("click","li",function(){
        idx = this.dataset.li;
        change();
    });
    function change(){
        if(idx >= $img.length){
            idx = 0;
        }
        $img.stop().animate({"opacity":0},500);
        $li.removeClass("cur");
        $img.eq(idx).stop().animate({"opacity":1},500);
        $li.eq(idx).addClass("cur");
    }
});