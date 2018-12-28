require(["config"],function(){
    require(["jq","loginbar","data"],function(){
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
        // 点击登录按钮发送数据验证 用户名密码
        let $btn = $(".btn");
        $btn.on("click",function(){
            let _yzm = $("#yzm").val();
            let _name = $("#username").val();
            let _pwd = $("#pw").val();
            if(_yzm == $yzm.html()){
                $.ajax({
                    type : "post",
                    url : "../api/reg.php",
                    data : {"name":_name,"pwd":_pwd},
                    success : function(res){
                        if(res.includes("成功")){
                            document.cookie = "uname="+_name+"; path=/";
                            location.href = "../index.html";
                        }else if(res.includes("错误")){
                            alert("用户名或者密码错误");
                        }
                    }
                })
            }else{
                alert("验证码错误");
                return;
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
    })
});