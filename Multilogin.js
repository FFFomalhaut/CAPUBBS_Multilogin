// ==UserScript==
// @name         CAPUBBS Multilogin
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  分离账号密码数据到本地
// @author       FFFomalhaut
// @match        https://*.chexie.net/bbs/login/*
// @icon         https://chexie.net/assets/images/capu.jpg
// @grant        none
// @require      https://chexie.net/assets/js/jquery.min.js
// @require	 file:///C:/Users/admin/Desktop/PlayWithBBS/Multilogin/getUsers.js

// ==/UserScript==

(function() {
    'use strict';
    /* eslint-disable no-multi-spaces */
    /* globals $, getUsers */

    var from = $("input#from").val();
    from = from ? from : "/bbs/index";
    var users = getUsers();

    var btn = $("<input type='button' value='全部登录' class='button' onclick='multilogin();'></input>");
    $("input.button:first").before(btn,"\n");
    $("input.button:first")[0].previousSibling.data=("\n    \n");
    $("input.button:last")[0].nextSibling.data=("\n    \n");

    window.onload = function() {
        // console.log(window.location.href);
	var searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("fromdesktop") == 1) {
            window.multilogin();
        }
    }

    window.multilogin = function() {
        var tip = $("#tip");
        tip.html("正在登录…");
        function Multilogin_single(index) {
            // console.log(index);
            if (index == -1) {
                tip.append("<br>正在跳转…");
                window.location=from;
            }
            var [usrn, pswd] = users[index];
            $.post("action.php",{
                username:usrn,
                password1:pswd,
            }).done(function() {
                // console.log(`${index}:done`);
                tip.html(usrn+" 已登录")
                Multilogin_single(index-1);
            }).fail(function() {
                tip.html(usrn+" 登录失败");
                Multilogin_single(index-1);
            })
        }

        Multilogin_single(users.length-1);
    }

    // Your code here...
})();
