/**
 * Created by Ville on 2017/3/9.
 */
$(function () {
    var path = "http://139.199.157.195:9090";
    var clickTimes = 0;
    /*================�����ĵ���================*/
    init();
    /*================�����Ķ���================*/

    /*��ʼ��*/
    function init() {
        getcategoryList(1);
        setlocation();
        addPageClick();
    }


    /* ��ʼҳ���·����ҳ�� */
    function setlocation() {
        /* var name=getQueryString("category");
         $(".breadcrumb li:last-child").html(name);*/
        var id = getQueryString("categoryid");
        $.get(path + "/api/getcategorybyid?categoryid=" + id, function (res) {
            // console.dir(res);
            var n = res.result[0].category;
            $(".breadcrumb li:last-child").html(n);
        });
        // var index = getQueryString("pageid") || 1;
        // $(".product-page button").html("��" + index + "ҳ");
    }

    /*��ҳ��*/
    // var Total = 0;

    /*���ݷ���id��ȡ�б���Ϣ*/
    function getcategoryList(pageid) {
        var id = getQueryString("categoryid");
        // var pageid = getQueryString("pageid") || 1;
        // $.get("http://139.199.157.195:9090/api/getproductlist?categoryid=" + id, function (res) {
        $.get(path + "/api/getproductlist?categoryid=" + id + "&pageid=" + pageid, function (res) {
            // console.dir(res);
            var html = template("productListTpl", res);
            $(".product-list").html(html);

            // һ��ҳ���ϵ�����������pagesize
            // ������ totalCount

            var pageTotal = res.totalCount / res.pagesize;

            // Total = pageTotal;
            // ��ȡ��ҳ��
            var arr = [];
            // var str="";
            for (var i = 0; i < pageTotal; i++) {
                // $(".product-page ul li:nth-child("i")").find("a").html(i);
                arr.push('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">��' + (i + 1) + 'ҳ</a></li>');
                // str=str+'<li role="presentation"><a role="menuitem" tabindex="-1" href="#">��'+(i+1)+'ҳ</a></li>';
            }
            // var arrStr=arr.join('');
            // console.log(str);
            /* join���÷�*/
            $(".product-page ul").html(arr.join(''));
            // $(".product-page ul").html(str);
            // console.log(pageTotal);
            //  addPageClick();
        });
        // $.ajax({url:"http://139.199.157.195:9090/api/getproductlist?categoryid=1&pageid=0",success:function(res){
        //     console.log("ok");
        // },error:function(err){
        //     console.error("=================");
        //     console.error(err);
        // }});
    }


    /*�󶨷�ҳ����¼�*/
    function addPageClick() {
        $(".product-page ul ").on("click", " li a", function () {
            var pageid = getNum($(this).html());
            var categoryid = getQueryString("categoryid");
            // var pageid = getQueryString("pageid");
            // window.location.href = "http://localhost:3000/productlist.html?categoryid=" + categoryid + "&pageid=" + pageid + "";
            getcategoryList(pageid);
            $(".product-page button").html("��" + pageid + "ҳ");
        });

        /*��һҳ*/

        /* $(".product-page .pre").click(function(){
         console.log(11);
         });*/

        $(".product-page .pre").on("click", function () {
            var pageid = getNum($(".product-page button").html());
            if (pageid <= 1) {
                return;
            }
            pageid--;
            getcategoryList(pageid);
            $(".product-page button").html("��" + pageid + "ҳ");
        });

        /*��һҳ*/
        $(".product-page .nex").click(function () {
            var pageid = getNum($(".product-page button").html());
            var totalPage = getNum($(".product-page ul li:last-child a").html());
            if (pageid >= totalPage) {
                return;
            }
            pageid++;
            getcategoryList(pageid);
            $(".product-page button").html("��" + pageid + "ҳ");
            clickTimes++;
            console.log(clickTimes);
        });


    }



})