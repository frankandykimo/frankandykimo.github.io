if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}
function cookie_check(login_form, key) {
    var frm = login_form;
    var remember;

    if (frm.name === 'hinet_form') {
        remember = document.getElementById('rememberme_hinet');
    } else if (frm.name === "emome_form") {
        remember = document.getElementById('rememberme_emome');
    } else if (frm.name === "roaming_form") {
        remember = document.getElementById('rememberme_roaming');
    }

    if (getCookie("HiNet_uID") !== null) {
        frm.cht_user.value = Aes.Ctr.decrypt(getCookie("HiNet_uID"), key, 256);
        remember.checked = true;
    }
    if (getCookie("uSerial") !== null) {
        frm.passwd.value = Aes.Ctr.decrypt(getCookie("uSerial"), key, 256);
    }
}

function login_check(login_form, role, prefix, suffix, key, rememberme) {
    var frm = login_form;
    var errfound = false;
    var expire = new Date();
    expire.setTime(expire.getTime() + (24 * 60 * 60 * 1000 * 30)); //30天
    var remember = document.getElementById(rememberme);

    if (frm.cht_user.value == '' || frm.cht_user.value.match(/範例/) != null || frm.cht_user.value.match(/請輸入會員帳號/) != null) {
        window.alert('請輸入帳號');
        errfound = true;
    } else if (frm.passwd.value == '') {
        window.alert('請輸入密碼');
        errfound = true;
    /*} else if (frm.name === 'emome_form' && frm.cht_user.value.match(/^09[0-9]{8}$/) == null) {
        window.alert('請輸入手機號碼!若您為HiNet用戶，請點選【HiNet用戶】頁籤進行登入!');
        errfound = true;*/
    } else if (frm.name === 'emome_form' && frm.cht_user.value.match(/^[87]\d{7}$/) != null) {
        window.alert('若您為HiNet用戶，請點選【HiNet或預付卡】身分進行登入!');
        errfound = true;
    } else if (frm.name === 'hinet_form' && frm.cht_user.value.match(/^HN/) != null) {
        window.alert('請輸入用戶識別碼，開頭不需加\"HN\"!');
        errfound = true;
    } else if (frm.name === 'hinet_form' && frm.cht_user.value.match(/^09[0-9]{8}$/) != null) {
        window.alert('手機門號請選擇【中華行動門號/會員】身分進行登入!');
        errfound = true;
    } else if (frm.name === 'emome_form') {
        if ((frm.cht_user.value.match(/^[Pp][Hh][0-9]{6}/) != null)) {
                window.alert('熱點測試帳號請選取【漫遊用戶】身分進行登入，帳號格式為phxxxxxx@hotspot。');
                errfound = true;
            }
            frm.username.value = prefix + frm.cht_user.value.trim();
            frm.password.value = frm.passwd.value;    
            frm.account.value = prefix + frm.cht_user.value.trim();
            frm.credential.value = frm.passwd.value;
        } else if (frm.name === 'roaming_form') {
            if (frm.menu_roaming.value !== "") {
                if (frm.menu_roaming.value == "cmcc/") {
                    if (frm.cht_user.value.match(/^\d+/) != null) {
                        frm.username.value = "CMI/" + frm.cht_user.value + "@10086.cn";
                        if (frm.passwd.value.length == 6) {
                            frm.passwd.value = "##" + frm.passwd.value + "##";
                        }
                    } else {
                        window.alert('請確認您所輸入的帳號格式為全數字格式。');
                        errfound = true;
                    }
                } else if (frm.menu_roaming.value == "ctm/") {
                        frm.username.value = "CTM/" + frm.cht_user.value + "@455001";
                } else {
                    frm.username.value = frm.menu_roaming.value + frm.cht_user.value;
                }
            } else {
                if (frm.cht_user.value.match("@itri.org.tw") !== null) {
                    frm.username.value = "twroam/" + frm.cht_user.value;
                } else if (frm.cht_user.value.match(/^PH[0-9]{6}/) != null) {
                    window.alert('請確認您所輸入的熱點帳號格式為phxxxxxx@hotspot。');
                    errfound = true;
                } else if (frm.cht_user.value.match(/^ph[0-9]{6}/) != null) {
                    if (frm.cht_user.value.match(/@hotspot/) == null) {
                        window.alert('請確認您所輸入的熱點帳號格式為phxxxxxx@hotspot。');
                        errfound = true;
                    }
                    frm.username.value = frm.cht_user.value;
                } else {
                    frm.username.value = frm.cht_user.value;
                }
            }
            frm.password.value = frm.passwd.value;
        } else if (frm.cht_user.value.match('@') === null) {
            frm.username.value = frm.cht_user.value + suffix;
            frm.password.value = frm.passwd.value;
        } else {
            frm.username.value = frm.cht_user.value;
            frm.password.value = frm.passwd.value;
        }

        if (!errfound) {
            deleteCookie("Autologin", "/", "authweb.hinet.net");
            deleteCookie("HiNet_uID", "/", "authweb.hinet.net");
            deleteCookie("uSerial", "/", "authweb.hinet.net");
            deleteCookie("HiNet_uRole", "/", "authweb.hinet.net");

            setCookie('HiNet_uRole', role, expire, '/', 'authweb.hinet.net', true);

            if (remember != null && remember.checked === true) {
                setCookie("HiNet_uID", Aes.Ctr.encrypt(frm.cht_user.value, key, 256), expire, "/", "authweb.hinet.net", true);
                setCookie("uSerial", Aes.Ctr.encrypt(frm.passwd.value, key, 256), expire, "/", "authweb.hinet.net", true);
            }
        }
        return errfound;
    }

    function hinet_login(login_form, key) {
        var errfound = false;
        var frm = login_form;

        if (frm.name === 'hinet_form') {
            if (frm.cht_user.value.match(/^2\d{7}/) != null) {
                errfound = login_check(frm, 'hinet', '', '@value.hinet.net', key, 'rememberme_hinet');
            } else {
                errfound = login_check(frm, 'hinet', '', '@hinet.net', key, 'rememberme_hinet');
            }
        } else if (frm.name === "emome_form") {
            errfound = login_check(frm, 'emome', 'member/', '', key, 'rememberme_emome');
        } else if (frm.name === "roaming_form") {
            errfound = login_check(frm, 'roaming', '', '', key, 'rememberme_roaming');
        }

        return !errfound;
    }
