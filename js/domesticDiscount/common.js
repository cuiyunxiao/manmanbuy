/**
 * Created by boning on 2017/3/7.
 */
$(function () {
    var Data = {};
    /*===========�����ĵ���===============*/
    init();
    /*===========�����Ķ���===============*/

    function init() {
        getInlandDiscount();
    }
    /*��ȡ�����ۿ��б�*/
    function getInlandDiscount() {
        $(".loader1").show();
        $.get("http://139.199.157.195:9090/api/getinlanddiscount", function (res) {
        //$.get("http://139.199.157.195:9090/api/getdiscountproduct?productid= i ", function (res) {

            /* ���ƶ����������*/
            Data.result = res.result.concat(res.result);
            Data.result = Data.result.concat(Data.result);
            console.log(Data.result.length);
            render();
            $(".loader1").hide();
        });
    }


    function render() {
        // �Ѿ������˵�li��ǩ�ĸ���
        if (Data.result.length == 0) {
            return;
        }
        var newRes = { result: [] };
        var length = 8;
        if (Data.result.length <= 8) {
            length = Data.result.length;
        }
        for (var i = 0; i < length; i++) {
            //  shift() �������ڰ�����ĵ�һ��Ԫ�ش�����ɾ���������ص�һ��Ԫ�ص�ֵ��
            newRes.result.push(Data.result.shift());
        }

        var html = template("inlandTpl", newRes);
        $("#inlanddiscount ul").append(html);
    }

    /*�������ݵĿ���*/
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