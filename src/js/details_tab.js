define(["jq"],function(jq){
    let $tabUl = $(".tabUl");
    let $lis = $tabUl.children("li");
    let $img = $(".tab img");
    $lis.on("mouseover",function(){
        if($(this).hasClass("l1")){
            $(this).children("i").css("background-position","-72px -183px");
            $img.attr("src","../img/tab1.jpg");
        }else if($(this).hasClass("l2")){
            $(this).children("i").css("background-position","-72px -122px");
            $img.attr("src","../img/tab2.jpg");
        }else if($(this).hasClass("l3")){
            $(this).children("i").css("background-position","-72px -61px");
            $img.attr("src","../img/tab3.jpg");
        }else if($(this).hasClass("l4")){
            $(this).children("i").css("background-position","-72px -244px");
            $img.attr("src","../img/tab4.jpg");
        }else if($(this).hasClass("l5")){
            $(this).children("i").css("background-position","-72px -0");
            $img.attr("src","../img/tab5.jpg");
        }
    }).on("mouseout",function(){
        if($(this).hasClass("l1")){
            $(this).children("i").css("background-position","0px -183px");
        }else if($(this).hasClass("l2")){
            $(this).children("i").css("background-position","0px -122px");
        }else if($(this).hasClass("l3")){
            $(this).children("i").css("background-position","0px -61px");
        }else if($(this).hasClass("l4")){
            $(this).children("i").css("background-position","0px -244px");
        }else if($(this).hasClass("l5")){
            $(this).children("i").css("background-position","0px -0");
        }
    })
});