$(function() {
    /*=========�����ĵ����============*/
    var ShopData;
    var AreaData;
    init();
    /*=========�����ĵ㶨��============*/

    /*��ʼ��*/
    function init() {

        getGsShop();
    }

    /* ��ȡ������Ϣ*/
    function getGsShop() {
        $.get("http://139.199.157.195:9090/api/getgsshop", function(res) {
            var data = res.result;
            ShopData = data;
           //���ص��̱���
            $(".filter ul").html('<li class="on"><a href="javascript:" data-shopid="' + data[0].shopId + '">' + data[0].shopName + '<i></i></a></li>');
            var arrTmp = [];
            $.each(data, function(i, v) {
                arrTmp.push(' <li class=""><a href="javascript:" data-shopid="' + v.shopId + '">' + v.shopName + '</a></li>');
            });

            $("#shop ul").html(arrTmp.join(''));

            // ����̵�չ���¼� popsort popbox   ʹ���¼�ί�еķ�ʽ����Ϊ�����ı��Ⲣû�м������
            $(".filter ul").on("click", "ul>li", function(e) {
                var index = $(this).index();
                $(".hd .popbox:eq(" + index + ")").toggle().siblings('.popbox').hide();;
            });

            getArea();
        });
    }

    /*��ȡ������Ϣ*/
    function getArea() {
        $.get("http://139.199.157.195:9090/api/getgsshoparea", function(res) {
            var data = res.result;
            AreaData = data;
            var arr = [];
            $.each(data, function(i, v) {
                arr.push(' <li class=""><a href="javascript:" title=' + v.areaName + ' data-areaid="' + v.areaId + '">' + v.areaName + '</a></li>');
            });
            // �����������
            $(".filter ul ").append('<li><a href="javascript:" data-areaid="' + data[0].areaId + '">' + data[0].areaName.substr(0, 2) + '<i></i></a></li>');
            //  ���ؼ۸�
            $(".filter ul ").append('   <li class=""><a href="javascript:;">1Ԫ<i></i></a></li>');
            $("#area ul").html(arr.join(''));

            var shopid = $(".filter ul li:first a").data('shopid');
            var areaid = $(".filter ul li:eq(1) a").data('areaid');
            getgsproduct(shopid, areaid);

            titleClick(shopid, areaid);
        });
    }
    /*������ʱ��  1 �л���ǰ����  2 ����ajax*/
    function titleClick(shopid, areaid) {
        $(".hd div ul").on("click", "li a", function() {
            if ($.isNumeric($(this).data('shopid'))) {
                shopid = $(this).data('shopid');
                $(".filter ul li:first").replaceWith('<li class="on"><a href="javascript:" data-shopid="' + ShopData[shopid].shopId + '">' + ShopData[shopid].shopName + '<i></i></a></li>');
            } else if ($.isNumeric($(this).data('areaid'))) {
                // �л��������
                areaid = $(this).data('areaid');
                $(".filter ul li:eq(1)").replaceWith('<li class="on"><a href="javascript:" data-areaid="' + AreaData[areaid].areaId + '">' + AreaData[areaid].areaName.substr(0, 2) + '<i></i></a></li>');
            } else {
                return;
            }
            // ���ز˵�
            $(this).closest(".popsort,.popbox").hide();
            getgsproduct(shopid, areaid);

        })
    }

    /*��ȡ��Ʒ�б���Ϣ*/;
    function getgsproduct(sid, aid) {
        // ���ݵ��̺�����id����ʱ��
        $.get("http://139.199.157.195:9090/api/getgsproduct", { shopid: sid, areaid: aid }, function(res) {
            // console.table(res.result);
            var html = template("proLstTpl", res);
            $("#container").html(html);
        });
    }
})