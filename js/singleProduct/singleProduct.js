$(function() {
    /*=========方法的点调用============*/
    var ShopData;
    var AreaData;
    init();
    /*=========方法的点定义============*/

    /*初始化*/
    function init() {

        getGsShop();
    }

    /* 获取店铺信息*/
    function getGsShop() {
        $.get("http://139.199.157.195:9090/api/getgsshop", function(res) {
            var data = res.result;
            ShopData = data;
           //加载店铺标题
            $(".filter ul").html('<li class="on"><a href="javascript:" data-shopid="' + data[0].shopId + '">' + data[0].shopName + '<i></i></a></li>');
            var arrTmp = [];
            $.each(data, function(i, v) {
                arrTmp.push(' <li class=""><a href="javascript:" data-shopid="' + v.shopId + '">' + v.shopName + '</a></li>');
            });

            $("#shop ul").html(arrTmp.join(''));

            // 点击商店展开事件 popsort popbox   使用事件委托的方式，因为其他的标题并没有加载完成
            $(".filter ul").on("click", "ul>li", function(e) {
                var index = $(this).index();
                $(".hd .popbox:eq(" + index + ")").toggle().siblings('.popbox').hide();;
            });

            getArea();
        });
    }

    /*获取区域信息*/
    function getArea() {
        $.get("http://139.199.157.195:9090/api/getgsshoparea", function(res) {
            var data = res.result;
            AreaData = data;
            var arr = [];
            $.each(data, function(i, v) {
                arr.push(' <li class=""><a href="javascript:" title=' + v.areaName + ' data-areaid="' + v.areaId + '">' + v.areaName + '</a></li>');
            });
            // 加载区域标题
            $(".filter ul ").append('<li><a href="javascript:" data-areaid="' + data[0].areaId + '">' + data[0].areaName.substr(0, 2) + '<i></i></a></li>');
            //  加载价格
            $(".filter ul ").append('   <li class=""><a href="javascript:;">1元<i></i></a></li>');
            $("#area ul").html(arr.join(''));

            var shopid = $(".filter ul li:first a").data('shopid');
            var areaid = $(".filter ul li:eq(1) a").data('areaid');
            getgsproduct(shopid, areaid);

            titleClick(shopid, areaid);
        });
    }
    /*标题点击时间  1 切换当前标题  2 发送ajax*/
    function titleClick(shopid, areaid) {
        $(".hd div ul").on("click", "li a", function() {
            if ($.isNumeric($(this).data('shopid'))) {
                shopid = $(this).data('shopid');
                $(".filter ul li:first").replaceWith('<li class="on"><a href="javascript:" data-shopid="' + ShopData[shopid].shopId + '">' + ShopData[shopid].shopName + '<i></i></a></li>');
            } else if ($.isNumeric($(this).data('areaid'))) {
                // 切换区域标题
                areaid = $(this).data('areaid');
                $(".filter ul li:eq(1)").replaceWith('<li class="on"><a href="javascript:" data-areaid="' + AreaData[areaid].areaId + '">' + AreaData[areaid].areaName.substr(0, 2) + '<i></i></a></li>');
            } else {
                return;
            }
            // 隐藏菜单
            $(this).closest(".popsort,.popbox").hide();
            getgsproduct(shopid, areaid);

        })
    }

    /*获取商品列表信息*/;
    function getgsproduct(sid, aid) {
        // 根据店铺和区域id请求时间
        $.get("http://139.199.157.195:9090/api/getgsproduct", { shopid: sid, areaid: aid }, function(res) {
            // console.table(res.result);
            var html = template("proLstTpl", res);
            $("#container").html(html);
        });
    }
})