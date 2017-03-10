$(function () {
    /*===========方法的调用=================*/
    init();
    /*===========方法的定义=================*/

    /*初始化*/
    function init() {
        var pageid = getQueryString("pageid") || 1;
        getMoneyCtrl(pageid);
        addPageClick();
    }
	
	/*function getMoneyCtrl(){
        $.get('http://139.199.157.195:9090/api/getmoneyctrl',function(result){
            //引入模板
            var html =template('moneyCtrlTpl',result);
            //动态渲染
            $('#moneyCtrl .recommen-list').html(html);
        });
    }
	
    /*获取首页折扣列表*/
    function getMoneyCtrl(pageid) {
        $('.loader1').show();
        $.get("http://139.199.157.195:9090/api/getmoneyctrl?pageid=" + pageid, function (res) {
            var html = template("moneyCtrlTpl", res);
            $("#moneyCtrl .recommen-list").html(html);
            var pageTotal = res.totalCount / res.pagesize;
            var arr = [];
            for (var i = 0; i < pageTotal; i++) {
                arr.push('<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:">第' + (i + 1) + '页</a></li>');
            }
            /* join的用法*/
            $(".product-page ul").html(arr.join(''));
            $(".product-page button").html("第" + pageid + "页");
            $('.loader1').hide();
        });
    }



    /*绑定分页点击事件*/
    function addPageClick() {
        $(".product-page ul").on("click", " li a", function () {
            var index = getNum($(this).html());
            $(".product-page button").html("第" + index + "页");
            getMoneyCtrl(index);
        });

        $(".product-page .pre").on("click", function () {
            var index = getNum($(".product-page button").html());
            if (index <= 1) {
                return;
            }
            index--;
            $(".product-page button").html("第" + index + "页");
            getMoneyCtrl(index);
        });

        /*下一页*/
        $(".product-page .nex").click(function () {
            var index = getNum($(".product-page button").html());
            var totalPage = getNum($(".product-page ul li:last-child a").html());
            if (index >= totalPage) {
                return;
            }
            index++;
            $(".product-page button").html("第" + index + "页");
            getMoneyCtrl(index);
        });


    }
})