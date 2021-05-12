//global variable, used to set default form
var login_form;

if (navigator.userAgent.indexOf('iPhone') != -1) {
    addEventListener('load', function() {
        setTimeout(hideURLbar, 0);
    }, false);
}

function hideURLbar() {
    window.scrollTo(0, 1);
}

function init(res) {
    if (getCookie('Lang') !== '#lang_en') {
    	seltype(1);
    }else{
    	seltype(2);
    }
    if (getCookie('HiNet_uRole') !== null) {
        if (getCookie('HiNet_uRole') === 'emome') {
            cookie_check(document.emome_form, res.key);
        } else if (getCookie('HiNet_uRole') === 'hinet') {
            seltype(2);
            cookie_check(document.hinet_form, res.key);
        } else if (getCookie('HiNet_uRole') === 'roaming') {
            seltype(3);
            cookie_check(document.roaming_form, res.key);
        }
    }

    deleteCookie("HiNet_ID", "/", "authweb.hinet.net");
    deleteCookie("Serial", "/", "authweb.hinet.net");
    deleteCookie("HiNet_Role", "/", "authweb.hinet.net");


    var expire = new Date();
    expire.setTime(expire.getTime() + (24 * 60 * 60 * 1000 * 30)); //30天

    var _hideLangBtn;
    if (getCookie('Lang') !== null) {
        _hideLangBtn = getCookie('Lang');
    } else {
        _hideLangBtn = '#lang_tw';
    }

    //Once the Btn is clicked, change the Lang Cookie, and switch the Lang Btn.
    //Request to the server to obtain new page with specified Lang
    $('.enBtn').click(function() {
        if (_hideLangBtn === '#lang_tw') {
            setCookie('Lang', '#lang_en', expire, '/', res.host);
        } else if (_hideLangBtn === '#lang_en') {
            setCookie('Lang', '#lang_tw', expire, '/', res.host);
        } else {
            setCookie('Lang', '#lang_tw', expire, '/', res.host);
        }

        location.replace(res.base_url+'auth/auth_login/login1?client_ip=' + encodeURIComponent(res.client_ip) + '&session=' + encodeURIComponent(res.session) + '&key=' + encodeURIComponent(res.key) + '&loginurl=' + encodeURIComponent(res.loginurl) + '&vendor=' + encodeURIComponent(res.vendor) + '&gwip=' + encodeURIComponent(res.gwip) + '&gwport=' + encodeURIComponent(res.gwport) + '&umac=' + encodeURIComponent(res.umac) + '&eqs_vlanid=' + encodeURIComponent(res.eqs_vlanid) + '');
    });

    //Take the event that pressing Enter key while in the password field. Then just do submit.
    $('input[type="password"]').keyup(function(e) {
        if (e.keyCode === 13) {
            login_form.submit();
        }
    });

    $('#submit').click(function() {
        login_form.submit();
    });

    $(document).pngFix();
}

function doPartnerRedirect(theSelect) {
    $('#origin_uname_label').show();
    $('#cmcc_uname_label').hide();
    $('#cmcc_otp').hide();
    if (theSelect.value == 'so-net/') {
        //document.location = 'https://www.so-net.net.tw/service/cht_wifi/login.html?action=' + encodeURIComponent(res.loginurl) + '';
        document.location = 'https://vas.so-net.net.tw/chtwifi/login?action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'eqs/') {
        document.location = 'http://wifiplus.cht.com.tw/index.jsp?umac=' + encodeURIComponent(res.umac) + '&gwport=' + encodeURIComponent(res.gwport) + '&gwip=' + encodeURIComponent(res.gwip) + '&vlanid=' + encodeURIComponent(res.eqs_vlanid) + '&action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'trustive/') {
        document.location = 'https://secure.trustive.com/wisp/?wisp=751&action=' + encodeURIComponent(res.loginurl) + '&otherparams=client_ip---' + res.client_ip + '|custom---' + res.vendor + '|data---' + encodeURIComponent(res.data) + '';
    } else if (theSelect.value == 'trustive/sfr/') {
        document.location = 'https://secure.trustive.com/p8/?wisp=751&action=' + encodeURIComponent(res.loginurl) + '&otherparams=client_ip---' + res.client_ip + '|custom---' + res.vendor + '|data---' + encodeURIComponent(res.data) + '';
    } else if (theSelect.value == 'trustive/vodafone/') {
        document.location = 'https://secure.trustive.com/p9/?wisp=751&action=' + encodeURIComponent(res.loginurl) + '&otherparams=client_ip---' + res.client_ip + '|custom---' + res.vendor + '|data---' + encodeURIComponent(res.data) + '';
    } else if (theSelect.value == 'trustive/tlf/') {
        document.location = 'https://secure.trustive.com/wisp/telefonica/capture/?wisp=751&action=' + encodeURIComponent(res.loginurl) + '&otherparams=client_ip---' + res.client_ip + '|custom---' + res.vendor + '|data---' + encodeURIComponent(res.data) + '';
    } else if (theSelect.value == 'trustive/swiss/') {
        document.location = 'https://secure.trustive.com/wisp/swisscom/capture/?wisp=751&action=' + encodeURIComponent(res.loginurl) + '&otherparams=client_ip---' + res.client_ip + '|custom---' + res.vendor + '|data---' + encodeURIComponent(res.data) + '';
    } else if (theSelect.value == 'twroam/') {
        document.location = 'https://login.twroam.org.tw/hinet?action=' + encodeURIComponent(res.loginurl) + '&otherparams=client_ip---' + res.client_ip + '|custom---' + res.vendor + '|data---' + encodeURIComponent(res.data) + '';
    } else if (theSelect.value == 'ct/') {
        document.location = 'https://authweb.hinet.net/roam/ct/auth_login/ch.php?action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'pccw/') {
        document.location = 'https://authweb.hinet.net/roaming/pccw/en/auth_ack.php?action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'aicent/ctm/') {
        document.location = 'https://wifi.aicent.net/ctm/login.jsp?op=cht&clientip=' + res.clientip + '&custom=' + res.vendor + '&action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'aicent/wirelessgate/') {
        document.location = 'https://wifi.aicent.net/tripletgate/login.jsp?op=cht&clientip=' + res.clientip + '&custom=' + res.vendor + '&action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'aicent/orange/') {
        document.location = 'https://wifi.aicent.net/orange/login.jsp?op=cht&action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'ntt/') {
        document.location = 'https://wifi.aicent.net/nttdcm/login.jsp?op=cht&action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'y5/') {
        document.location = 'https://www.y5zone.net/hotspot.net/roaming/hinet/?action=' + encodeURIComponent(res.loginurl) + '';
    } else if (theSelect.value == 'cmcc/') {
        //$('#origin_uname_label').hide();
        //$('#cmcc_uname_label').show();
        //$('#cmcc_otp').show();
        //$('#cmcc_otp').click(function() {
        //    $.ajax({
        //        url: 'https://authweb.hinet.net/auth/cmi_soap?gwip=' + encodeURIComponent(res.gwip) + '',
        //        data: 'acct=' + encodeURI($('#roaming2 input[name="cht_user"]').val()),
        //        type: 'POST',
        //        dataType: 'text',

        //        success: function(msg) {
        //            var matches = msg.match(/(\d)\|(.*)/);
        //            if (matches[1] == '0') {
        //                alert('已發送簡訊驗證碼，請使用您收到的簡訊驗證碼進行登入，過期時間:' + matches[2] + '。');
        //            } else {
        //                alert('無法發送簡訊驗證碼，請確認您使用中華電信漫遊網路或稍後再試!');
        //            }
        //        },

        //        error: function(xhr, ajaxOptions, thrownError) {
        //            alert('暫時無法使用簡訊驗證，請稍候再試!');
        //        }
        //    });
        //});
        document.location = 'http://authweb.hinet.net/roaming/cmcc/cn/index.php?action=' + encodeURIComponent(res.loginurl) + '';
    }
}
