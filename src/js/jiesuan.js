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

        console.log(cartArr);



        // 渲染函数
        zongRendar(cartArr);
        function zongRendar(arr){
            let count = 0;
            let youfei = 0;
            for(let i = 0;i < arr.length;i++){
                let goods = itemArr[arr[i].id-1];
                count += goods.newprice * arr[i].qty;
            }
            if(count < 99){
                youfei = 10;
            }else if(count>=99){
                youfei = 0;
            }
            let total = count + youfei;
            let $need = $(".need p span");
            $need.html(total);

            // 渲染商品列表
            jsRendar(cartArr);
            youRendar(count,youfei,total);
        };


        // 渲染商品列表函数
        function jsRendar(arr){
            let $jslist = $(".jslist");
            let str = "";
            str += arr.map(function(item){
                let goods = itemArr[item.id-1];
                return `<li class="clearfix" guid="${goods.id}">
                    <img src="${goods.img1}" alt="">
                    <p>
                        ${goods.title}
                    </p>
                    <span class="jg">￥${goods.newprice}</span>
                    <span class="sl">${item.qty}</span>
                    <span class="xj">￥${goods.newprice * item.qty}</span>
                </li>`;
            }).join("");
            $jslist.html(str);
        }

        // 渲染右下角数据函数
        function youRendar(count,youfei,total){
            let $br = $(".b_r");
            let str = "";
            str += `<p>商品金额 <span>￥${count}元</span></p>
                <p>乐蜂发货，运费 <span>￥${youfei}</span></p>
                <p>活动优惠 <span>-￥0</span></p>
                <p>卡券优惠 <span>-￥0</span></p>
                <p class="total">待支付 <span>￥${total}</span></p>
                <a href="#">提交订单</a>
                <p class="hf">可获得<span>${parseInt(count/2)}个</span>花粉</p>`;
            $br.html(str);
        }
    });
});