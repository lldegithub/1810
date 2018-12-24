define(["jq"],function(jq){
    //点击选取省份的部分
    let $city = $(".city");
    let $city_p = $city.parent();
    let $add = $(".add");
    let $d_city = $(".d_city");
    let $li = $(".d_city ul li");
    // console.log($city);
    $city.on("mouseenter",function(){
        $city_p.addClass("city_p");
        $d_city.css("display","block");
    });
    $add.on("mouseleave",function(){
        $d_city.css("display","none");
        $city_p.removeClass("city_p");
    });
    $li.on("click",function(){
        $city.children()[0].innerText = this.innerHTML;
        $d_city.css("display","none");
    });
    //手机乐蜂
    let $tel_sp = $(".tel_sp");
    let $tel_d = $(".tel_d");
    let $tellf = $(".tellf");
    $tel_sp.on("mouseenter",function(){
        $tel_sp.addClass("tel_change");
        $tel_d.css("display","block");
    });
    $tellf.on("mouseleave",function(){
        $tel_sp.removeClass("tel_change");
        $tel_d.css("display","none");
    });
    // 收藏乐蜂
    let $save = $(".loginbar-save");
    $save.on("click",function(){
        alert("请使用Ctrl+D加入收藏");
    });
    //快速导航
    let $links = $(".loginbar-links");
    let $links_a = $links.children().eq(0);
    let $links_h = $(".links_h");
    $links_a.on("mouseenter",function(){
        $(this).addClass("change");
        $links_h.css("display","block");
    });
    $links.on("mouseleave",function(){
        $links_a.removeClass("change");
        $links_h.css("display","none");
    });
    // 我的订单
    let $my = $(".loginbar-my");
    let $myorder = $(".myorder");
    let $mydiv = $(".loginbar-my div");
    $myorder.on("mouseenter",function(){
        $(this).addClass("change");
        $mydiv.css("display","block");
    });
    $my.on("mouseleave",function(){
        $myorder.removeClass("change");
        $mydiv.css("display","none");
    });
    // 登录和注册位置的渲染
    $wel = $(".loginbar-wel");
    // 判断有没有cookie
    let cookie = document.cookie;
    let user;
    if(cookie = ""){
        user = "";
    }else{
        let cookieArr = cookie.split("; ");
        for(let i = 0;i < cookieArr.length;i++){
            let arr = cookieArr[i].split("=");
            if(arr[0] == "username"){
                user = arr[1];
                break;
            }
        }
        user = "";
    }
    // 有cookie说明登录了,用登录名渲染页面
    if(user){
        $wel.html(`嗡，欢迎来乐蜂，&nbsp;
            <a href="#" class="login">
            ${user}&nbsp;&nbsp;&nbsp;
            </a>
            <a href="#" class="login">
            &nbsp;&nbsp;退出登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </a>`);
    }else{
        // 没有cookie说明没有登录
        $wel.html(`欢迎来到乐蜂，请&nbsp;
                <a href="#" class="login">
                    登录&nbsp;&nbsp;&nbsp;
                </a>
                <a href="#" class="login">
                    &nbsp;&nbsp;免费注册&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </a>`);
    }
});