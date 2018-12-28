define(["jq"],function(jq){
    // 先生成随机验证码
    let $yzm = $(".yzm i");
    $yzm.html(yzmRendar(4)).css({"color":randomColor(),"background":randomColor()});
    let $span = $yzm.next();
    $yzm.on("click",function(){
        $yzm.html(yzmRendar(4)).css({"color":randomColor(),"background":randomColor()});
    });
    $span.on("click",function(){
        $yzm.html(yzmRendar(4)).css({"color":randomColor(),"background":randomColor()});
    });

    // 用户名验证
    let $username = $("#username");
    let uflag = false;
    $username.on("blur",function(){
        let _username = $(this).val();
        if(/^1[34578]\d{9}$/.test(_username)){
            uflag = true;
            $.ajax({
                type : "post",
                url : "../api/zc.php",
                data : {"name":_username},
                success : function(res){
                    if(res.includes("注册")){
                        $(".utip").html("该用户名已被注册");
                        uflag = false;
                    }else if(res.includes("可用")){
                        $(".utip").html("该用户名可用");
                    }
                }
            });
        }else{
            uflag = false;
            $(".utip").html("用户名不合法");
        }
    });

    // 密码强度验证
    let $pw = $("#pw");
    let pwflag = false;
    $pw.on("keyup",function(){
        let pwIdx = 0;
        let _pw = $pw.val();
        if(_pw.length < 8 || _pw.length > 20){
            pwflag = false;
            return;
        }else{
            if(/[a-zA-Z]/.test(_pw)){
                pwIdx++;
            }
            if( /[0-9]/.test(_pw) ){
                pwIdx++;
            }
            if( /[^0-9a-zA-Z]/.test(_pw) ){
                pwIdx++;
            };
            pwflag = true;
            $(this).next("p").css("visibility","visible").
                children().css("opacity",.1);
            if(pwIdx == 1){
                $(".ruo").css("opacity",1);
            }else if(pwIdx == 2){
                $(".zhong").css("opacity",1);
            }else if(pwIdx == 3){
                $(".qiang").css("opacity",1);
            }
        }
    });



    // 点击按钮验证数据
    let $btn = $(".btn");
    $btn.on("click",function(){
        // 验证验证码和密码确认
        let _yzm = $("#yzm").val();
        let iyzm = $yzm.html();
        let _pw = $pw.val();
        let qrpw = $("#qr").val();
        if(uflag){
            if(_yzm == iyzm){
                if(pwflag){
                    if(_pw == qrpw){
                        // console.log(666);
                        $.ajax({
                            type : "post",
                            url : "../api/zc.php",
                            data : {"name":$username.val(),"upwd":_pw,"register":true},
                            success : function(res){
                                //验证成功 存入数据库
                                if(res.includes("成功")){
                                    document.cookie = "uname="+$username.val();
                                    location.href = "../index.html";
                                }else{
                                    alert("注册失败");
                                }
                            }
                        });
                    }else{
                        alert("两次密码不一致");
                        return false;
                    }
                }else{
                    alert("密码长度不合法");
                    return false;
                }
            }else{
                alert("验证码错误");
                return false;
            }
        }else{
            alert("用户名不合法");
            return false;
        }
    });




    // n位验证码函数
    function yzmRendar(n){
        let yzmArr = w();
        let randomMa = "";
        for(let i = 0;i < n;i++){
            randomMa += yzmArr[randomNum(0,yzmArr.length - 1)];
        }
        return randomMa;
    }

    // 封装一个含有数字 大小写字母的数组;
    function w(){
        var arr = [];
        for(var i = 48;i < 58;i++){
            arr.push(String.fromCharCode(i));
        }
        for(var i = 65;i < 91;i++){
            arr.push(String.fromCharCode(i));
        }
        for(var i = 97;i < 122;i++){
            arr.push(String.fromCharCode(i));
        }
        return arr;
    };
    // 随机数字
    function randomNum(a,b){
        return parseInt(Math.random()*(b + 1- a) + a);
    }
    // 随机颜色
    function randomColor(){
        return "rgb("+randomNum(0,255)+","+randomNum(0,255)+","+randomNum(0,255)+")";
    }
});