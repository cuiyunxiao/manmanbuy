commonInit();

/*ȡ���ַ������������ */
function getNum(str) {
    // console.dir(/\d+/.exec(str));
    if (!str || str.length == 0) {
        return "";
    } else {
        var ret = /\d+/.exec(str);
        if (!ret) {
            return "";
        }
        return parseInt(/\d+/.exec(str)[0]);
    }
}


/*ȡ��url�Ĳ���*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    // if (r != null) return unescape(r[2]);
    if (r != null) return decodeURI(r[2]);
    return null;
}


function commonInit() {
    /* ��ģ����ע�᷽�� */
    template.helper("getNum", getNum);
}