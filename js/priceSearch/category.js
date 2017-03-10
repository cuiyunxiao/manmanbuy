/**
 * Created by Administrator on 2017/3/7.
 */
$(function(){
    //方法调用
    init();

    //初始化

    function init(){


        getNavHeading();
        defaultToggle();
        getProduct();
        getBijia();
        getCom();



    }

    //首页导航栏渲染
    function getNavHeading() {
        $.get('http://139.199.157.195:9090/api/getcategorytitle', function (result) {
            var html = template('navHeadingtpl', result);
            //动态渲染
            $('.nav-group').html(html);
        });


    }

    //点击下滑
    function defaultToggle(){
        $('.nav-group').on("click",".nav-default", function(){

            var id = $(this).data("id");

            getNavdefault(id,this);


        });
    }


//首页导航栏子列表渲染
    function getNavdefault(id,target){
        //获取导航栏数据
        $.get('http://139.199.157.195:9090/api/getcategory?titleid='+id,function(result){
            var html = template('categoryListTpl',result);
            //动态渲染

            //动态渲染需要时间，所以给事件添加一个定时器，然视觉更流畅
            setTimeout(function(){

                //添加stop让它不会重复执行
                $(target).find(".nav-collapse").stop().slideToggle();
                //一个下滑时另一个上滑
                $(target).siblings('.nav-default').find('.nav-collapse').slideUp();
                },50)
            $(target).find(".row").html(html);


            //$(this).find(".nav-collapse").slideToggle();
            //$('.nav-collapse> .nav-body >.row').html(html);
        });


    }




    //商品列表渲染

    function getProduct() {
         //获取URL传递的参数
        var id = getQueryString('categoryid');
          var title =getQueryString('category');

        $.get('http://139.199.157.195:9090/api/getproductlist?categoryid='+id, function (result) {
            var html = template('productListtpl', result);
            //动态渲染
            $('.product-list').html(html);

            $('.title').html(title);
            //console.log(title);
        });



    }

    //比价
    function getBijia() {
        var id = getQueryString('productid');
        $.get('http://139.199.157.195:9090/api/getproduct?productid='+id, function (result) {
            var html = template('productbijia', result);
            //动态渲染
            $('.product-bijia').html(html);
        });


    }
    //评论
    function getCom() {
        var id = getQueryString('productid');
        $.get('http://139.199.157.195:9090/api/getproductcom?productid='+id, function (result) {
            var html = template('productpjtpl', result);
            //动态渲染
            $('.pcom').html(html);
        });


    }

    function getQueryString(key) {

        // 去掉字符串首字母?号
        var search = location.search.slice(1);

        // 使用&符号得到每一个key=val
        var searchArr = search.split('&');
        var tempArr = null;
        var searchObj = {};

        // 遍历数组中的每一个key=val字符串，使用=号劈开，
        // 然后以key为名，val为值添加到searchObj对象中。
        for( var i =0, len = searchArr.length; i < len; i++) {
            tempArr = searchArr[i].split('=');
            searchObj[ tempArr[0] ] = tempArr[1];
        }

        // 有参数返回指定值，没有参数返回全部值

        return arguments.length? decodeURI(searchObj[key]):searchObj;
        //return searchObj;
    };

});