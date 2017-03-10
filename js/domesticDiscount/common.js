/**
 * Created by boning on 2017/3/7.
 */
$(function () {
    var Data = {};
    /*===========方法的调用===============*/
    init();
    /*===========方法的定义===============*/

    function init() {
        getInlandDiscount();
    }
    /*获取国内折扣列表*/
    function getInlandDiscount() {
        $(".loader1").show();
        $.get("http://139.199.157.195:9090/api/getinlanddiscount", function (res) {
        //$.get("http://139.199.157.195:9090/api/getdiscountproduct?productid= i ", function (res) {

            /* 复制多个数组数据*/
            Data.result = res.result.concat(res.result);
            Data.result = Data.result.concat(Data.result);
            console.log(Data.result.length);
            render();
            $(".loader1").hide();
        });
    }


    function render() {
        // 已经加载了的li标签的个数
        if (Data.result.length == 0) {
            return;
        }
        var newRes = { result: [] };
        var length = 8;
        if (Data.result.length <= 8) {
            length = Data.result.length;
        }
        for (var i = 0; i < length; i++) {
            //  shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
            newRes.result.push(Data.result.shift());
        }

        var html = template("inlandTpl", newRes);
        $("#inlanddiscount ul").append(html);
    }

    /*加载数据的开关*/
    var isLoad = false;
    window.onscroll = function () {
        if (isLoad == true) {
            return;
        } else {
            var height = $("#inlanddiscount ul").height() +$("#header").height()+$("#footer").height()- $(document.body).height();
            var distanceBottom = height - $(document.body).scrollTop();
            if (distanceBottom < 50) {
                isLoad = true;
                render();
                isLoad = false;
            }

        }

    }
})