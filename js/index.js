$(function(){
    //方法调用
    init();

    //初始化

    function init(){
      getIndexMenu();
        menuToggle();
        getRecommen();
    }

    //获取首页菜单数据
    function getIndexMenu(){
        $.get('http://139.199.157.195:9090/api/getindexmenu',function(result){
            //引入模板
            var html =template('menutpl',result);
            //动态渲染
            $('.menu .row').html(html);
        });
    }

//获取首页折扣列表数据

    function getRecommen(){
        $.get('http://139.199.157.195:9090/api/getmoneyctrl',function(result){
            //引入模板
            var html =template('recommentpl',result);
            //动态渲染
            $('.recommen .recommen-list').html(html);
        });
    }
    //绑定切换菜单事件

    function menuToggle(){
        //
        //$('.menu .row>div:nth-child(8)').click(function(){
        //    $('.menu .row>div:nth-last-child(-n+4)').slideToggle();
        //});

        //事件委托
        $('.menu .row').on('click','>div:nth-child(8)',function(){
            $('.menu .row>div:nth-last-child(-n+4)').slideToggle();
        })
    }
    <!--获取字符串中的数字-->
    template.helper('getNum',function getNum(text){
        var value = text.replace(/[^0-9]/ig,"");
        return value;
    });
});