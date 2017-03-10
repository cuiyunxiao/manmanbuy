/**
 * Created by Administrator on 2017/3/9.
 */
$(function(){
    //方法调用
    init();

    //初始化

    function init(){
        getProductlist();

    }

    //获取首页菜单数据
    function getProductlist(){
        $.get('http://139.199.157.195:9090/api/getproductlist?categoryid=1',function(result){
            //引入模板
            var html =template('productListtpl',result);
            //动态渲染
            $('.product-list').html(html);
        });
    }


});