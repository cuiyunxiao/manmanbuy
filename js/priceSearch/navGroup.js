/**
 * Created by Administrator on 2017/3/7.
 */
$(function(){
    //方法调用
    init();

    //初始化

    function init(){

        //getNavdefault();
        getNavHeading();
        defaultToggle();
        getProduct();

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
            var id = $(this).attr('data-id');

            getNavdefault(id);
            $('.nav-collapse').slideToggle();

        });


    }


//首页导航栏子列表渲染
    function getNavdefault(id){
        //获取导航栏数据
        $.get('http://139.199.157.195:9090/api/getcategory?titleid=0'+id,function(result){
            var html = template('categoryListTpl',result);
            //动态渲染
            $('.nav-collapse> .nav-body >.row').html(html);
        });
    }


    //商品列表渲染
    function getProduct() {
        $.get('http://139.199.157.195:9090/api/getproductlist?categoryid=0', function (result) {
            var html = template('productListtpl', result);
            //动态渲染
            $('.product-list').html(html);
        });


    }

});