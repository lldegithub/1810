define(["jq","data"],function(jq,data){
    let itemArr = data;
    // let itemId = location.search().slice(1).split("=")[1];
    // let goods = {};
    // for(let i = 0;i < itemArr.length;i++){
    //     if(itemId == itemArr[i].id){
    //         goods = itemArr[i];
    //     }
    // }

    // 渲染购买了
    let $guessUl = $(".guess ul");
    let guessArr = itemArr.slice(0,10);
    guessRendar(guessArr);
    let $guessLi = $(".guessLi");
    $guessLi.on("click",function(){
         let guid = $(this).attr("guid");
         location.href = "../html/details.html?id="+guid;
    });
    function guessRendar(arr){
        let str = "";
        str += arr.map(function(item){
            return `<li class="guessLi" guid="${item.id}">
                    <img src="${item.img1}" alt="">
                    <p>${item.title}</p>
                    <span>￥${item.newprice}</span>
                    <del>￥${item.oldprice}</del>
                </li>`;
        }).join("");
        $guessUl.html(str);
    }
});