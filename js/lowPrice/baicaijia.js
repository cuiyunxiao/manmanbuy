//方法的调用
$(function () {
    //方法调用
    // 设一个变量存储位置
    var leDis = 0;

    // 弹簧距离
    var spring = 30;
    // 已经滑动了的距离
    var alrDis = 0;
    init();
    //方法封装
    function init() {
        getBaiCaiJiaTitle();
        getBaiCaijiaProduct(0);
        clickTitleEvent();
    }

//获取标题数列表的数据
    function getBaiCaiJiaTitle(titleid) {
        $.get("http://139.199.157.195:9090/api/getbaicaijiatitle", function (res) {
            //加载数据标题
            var html = template("baicaijiaTitleTmp", res);
            $(".content ul").html(html);
            $(".content ul  :first").addClass("active");
            var tmpWidth = 0;
            $.each($(".content ul li "), function (i, value) {
                tmpWidth += $(value).width();
            });
            $(".content ul").width(tmpWidth);
            //实现滑动
            move();

        })
    }

    //获取白菜价的商品列表
    function getBaiCaijiaProduct(titleid) {

        $.get("http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + titleid, function (res) {
            var html = template("baicaijiaProductTmp", res);
            $(".products ul").html(html);
        });
    }

//实现滑动
    function move() {
        //先记录开始时候位置
        var startX = 0;
        leDis = $(".content ul").width() - $(".content").width() + 38 + spring;
        //开始滑动
        $(".content ul").on("touchstart", function (e) {
            var _touch = e.originalEvent.targetTouches[0];
            startX = _touch.pageX;
        });

//正在滑动
        $(".content ul").on("touchmove", function (e) {
            var _touch = e.originalEvent.targetTouches[0];
            var dis = _touch.pageX - startX + alrDis
//开始移动
//判断是否大于移动弹簧距离
            if (dis >= spring) {
                dis = spring;
            }
            //往左滑动时候判断距离
            if (dis < (-leDis)) {
                dis = -leDis;
            }
            $(".content ul").css("transition", "none");
            $(".content ul").css("transform", "translateX(" + dis + "px)");

        });

//结束滑动
        $(".content ul").on(".touchend", function (e) {
            var _touch = e.originalEvent.changedTouches[0];
            //再次拖动后使用alrDis
            alrDis = _touch.pageX - startX + alrDis;
            //判断移动是否大于弹簧距离
            if (alrDis >= spring) {
                alrDis = 0;
                $(".content ul").css("transition", "all .2s");
                $(".content ul").css("transform", "translateX(" + 0 + "px)");
            }
            //往左滑动时候判断距离
            if (alrDis < (-leDis)) {
                alrDis = spring - leDis;
                $(".content ul").css("transition", "all .2s");
                $(".content ul").css("transform", "translateX(" + alrDis + "px)");
            }
        })
    }

//给标题添加事件使用事件委托
    function clickTitleEvent() {
        $('.content ul').on('click', "li a", function () {
            //获取当前的点击的因为是给a标签添加点击事件所以通过他的父元素的id
            var titleid = $(this).parent('li').data("titleid");
            //渲染标题 在当前titleid也是li标签的索引
            $(this).parent("li").addClass("active").siblings("").removeClass("active");
            //tmpwidth其实是往左边移动距离
            var tmpWidth = 0;
            $.each($(".content ul li"), function (i, v) {
                if (i < titleid) {
                    tmpWidth += $(v).width();
                }
            });

            if (tmpWidth >= leDis) {
                tmpWidth = leDis - spring;
            }
            $(".content ul").css("transition", "all .2s");
            $(".content ul").css("transform", "translateX(" + (-tmpWidth) + "px)");
            alrDis = -tmpWidth;
            getBaiCaijiaProduct(titleid);

        });
    }

})