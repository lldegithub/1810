require(["config"],function(){
    require(["jq","data","loginbar"],function(a,b){
        // 封装cookie的设置、获取、删除
        var Cookie = {
            setCookie : function(name,val,date,path){
                var str = name+"="+val;
                if(date){
                    str += "; expires="+date.toUTCString();
                }
                if(path){
                    str += "; path="+path;
                }
                document.cookie = str;
            },
            // 获取cookie
            getCookie : function(name){
                var cookie = document.cookie;//"left=300; age=17"
                if(cookie == ""){
                    return "";
                }else{
                    var cookieArr = cookie.split("; ");
                    for(var i=0;i<cookieArr.length;i++){
                        var arr = cookieArr[i].split("=");
                        if(arr[0] == name){
                            return arr[1];
                        }
                    }
                    return "";
                }
            },
            // 删除某条cookie
            delCookie : function(name,path){
                var d = new Date();
                d.setDate(d.getDate()-1);
                Cookie.setCookie(name,"",d,path);
            }
        };

        // 获取数据库中商品数据
        let itemArr = b;
        // 根据cookie获取数据库里用户购物车数据
        let cartArr = [];
        let cookie = Cookie.getCookie("uname");
        if(cookie){
            $.ajax({
                type : "post",
                url : "../api/cart.php",
                data : {"name":cookie},
                success : function(res){
                    if(!JSON.parse(res)[0].cart){
                        cart = "";
                    }else{
                        // console.log(666);
                        cart = JSON.parse((JSON.parse(res))[0].cart);
                    }
                    if(!cart){
                        cart = [];
                    }else{
                        cartArr = cart;
                    }
                    // console.log(cartArr);
                },
                async : false
            });
        }
        // console.log(cartArr);





        let $cartList = $(".cartList");
        cartListRendar(cartArr);
        let $yunfei = $(".yunfei");
        let youfei = 0;
        panduanyf(cartArr);
        let $tongji = $(".tongji");
        tongjiRendar(cartArr);
        let $mainb = $(".main_b");
        mainbRendar(cartArr);

        // 通过事件委托给cartList 绑定事件 控制数量加减 还有删除对应项
        $cartList.on("click",function(e){
            let $target = $(e.target);
            if($target.hasClass("jian")){
                let guid = $target.closest("li").attr("guid");
                // console.log($target.closest("li"));
                for(let i = 0;i < cartArr.length;i++){
                    if(itemArr[cartArr[i].id-1].id == guid){
                        cartArr[i].qty --;
                        if(cartArr[i].qty == 0){
                            alert("数量不能为0");
                            cartArr[i].qty = 1;
                        }
                    }
                }
            }
            if($target.hasClass("jia")){
                let guid = $target.closest("li").attr("guid");
                // console.log($target.closest("li"));
                for(let i = 0;i < cartArr.length;i++){
                    if(itemArr[cartArr[i].id-1].id == guid){
                        cartArr[i].qty ++;
                    }
                }
            }
            if($target.html() == "删除"){
                let guid = $target.closest("li").attr("guid");
                for(let i = 0;i < cartArr.length;i++){
                    if(itemArr[cartArr[i].id-1].id == guid){
                        cartArr.splice(i,1);
                    }
                }
            }
            // 点击商品图片和标题跳转
            if($target[0].parentElement.tagName == "FIGURE" ||
                $target[0].parentElement.parentElement.tagName == "FIGURE"){
                let guid = $target.closest("li").attr("guid");
                location.href = "../html/details.html?id="+guid;
            };
            shujuRendar(cartArr);
        }).on("blur",".num",function(e){
            let $target = $(e.target);
            let _target = $target.val();
            console.log(_target);
            if($target.hasClass("num")){
                let guid = $target.closest("li").attr("guid");
                // console.log($target.closest("li"));
                for(let i = 0;i < cartArr.length;i++){
                    if(itemArr[cartArr[i].id-1].id == guid){
                        cartArr[i].qty = _target;
                    }
                }
            }
        });


        // cartList渲染函数
        function cartListRendar(arr){
            let str = "";
            str += arr.map(function(item){
                let goods = itemArr[item.id - 1];
                let count = goods.newprice * item.qty;
                return `<li class="clearfix" guid="${item.id}">
                    <figure class="clearfix fig">
                        <img src="${goods.img1}" alt="">
                        <figcaption>
                            <p>
                                ${goods.title}
                            </p>
                            <span>规格:均码</span>
                        </figcaption>
                    </figure>
                    <div class="danjia fl">
                        <span>￥${goods.newprice}</span><br>
                        <del>￥${goods.oldprice}</del>
                    </div>
                    <div class="shuliang fl">
                        <input type="button" value="-" class="jian"><input
                            type="text" class="num" value="${item.qty}"><input
                            type="button" value="+" class="jia">
                    </div>
                    <div class="xiaoji fl">
                        <span>￥${count}</span>
                    </div>
                    <div class="caozuo fl">
                        <span>删除</span>
                    </div>
                </li>`;
            }).join("");
            $cartList.html(str);
        }

        //判断是否有运费函数 并渲染邮费区域函数
        function panduanyf(arr){
            let count = 0;
            let str = "";
            arr.forEach(function(item){
                let goods = itemArr[item.id-1];
                count += goods.newprice * item.qty;
            });
            if(count < 99){
                youfei = 10;
                str = `<span class="yunfei1" style="background:#ccc">运费</span>
                <span class="yunfei2">全场满99元包邮</span>`;
            }else if(count >= 99){
                youfei = 0;
                str = `<span class="yunfei1">运费</span>
                <span class="yunfei2">本单已免运费</span>`;
            }
            $yunfei.html(str);
        }

        //渲染tongji区域函数
        function tongjiRendar(arr){
            let count = 0;
            let num = 0;
            let str = "";
            for(let i = 0;i < arr.length;i++){
                let goods = itemArr[arr[i].id-1];
                count += parseInt(arr[i].qty);
                num += goods.newprice * arr[i].qty;
            }
            str = `<p style="color:#f00;">
                    ￥
                    <span style="font-size:18px;">${num}</span>
                </p>
                <p style="margin-right:30px;">
                    共
                    <span style="color:#f00;">${count}</span>
                    件商品 商品金额
                </p>`;
            $tongji.html(str);
        }

        //渲染 main_b区域函数
        function mainbRendar(arr){
            let num = 0;
            let str = "";
            for(let i = 0;i < arr.length;i++){
                let goods = itemArr[arr[i].id-1];
                num += goods.newprice * arr[i].qty;
            }
            if(youfei){
                str = ` <p class="youfei">
                <span>运费</span>
                ￥
                <span>10</span>
            </p>
            <p class="zongjia">
                <span>总金额</span>
                ￥
                <span style="font-weight:bold;">${num}</span>
            </p>`;
            }else{
                str = `<p class="zongjia">
                <span>总金额</span>
                ￥
                <span style="font-weight:bold;">${num}</span>
            </p>`;
            }
            $mainb.html(str);
        }

        // 点击一次修改数据库的函数
        function shujuRendar(arr){
            let cartStr = JSON.stringify(arr);
            $.ajax({
               type : "post",
               url : "../api/djxg.php",
               data : {"name":cookie,"cart":cartStr},
               success : function(res){
                    if(res.includes("成功")){
                        cartListRendar(cartArr);
                        panduanyf(cartArr);
                        tongjiRendar(cartArr);
                        mainbRendar(cartArr);
                    }
               }
            });
        }
    });
});