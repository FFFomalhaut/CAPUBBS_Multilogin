// ==UserScript==
// @name         CAPUBBS Multilogin
// @namespace    https://github.com/FFFomalhaut/CAPUBBS_Multilogin
// @version      1.3.2
// @description  修复了 “归尘”的签过到 会让程序以为“归”也签过到 的问题。
// @author       FFFomalhaut
// @match        https://*.chexie.net/bbs/login/*
// @icon         https://chexie.net/assets/images/capu.jpg
// @grant        none
// @require      https://chexie.net/assets/js/jquery.min.js
// @require      file:///C:/Users/admin/Desktop/PlayWithBBS/Multilogin/users.js

// ==/UserScript==

(function() {
    'use strict';
    /* eslint-disable no-multi-spaces */
    /* globals $, users */
    // users defined in @require!

    var from = $("input#from").val();
    from = from ? from : "/bbs/index";

    var btn = $("<input type='button' value='全部登录' class='button' onclick='multilogin();'></input>");
    $("input.button:first").before(btn,"\n");
    $("input.button:first")[0].previousSibling.data=("\n    \n");
    $("input.button:last")[0].nextSibling.data=("\n    \n");

    window.onload = function() {
        var searchParams = new URLSearchParams(window.location.search);
        if (searchParams.get("fromdesktop") == 1) {
            $.get("/bbs/sign", (data) => {
                callback(data);
            });
        }
        function callback(data) {
            data = data.slice(0, data.indexOf("\n\n\n"));   // 防止有用户在Top100中，产生误判
            if (users.some((user) => {
                var reg = new RegExp(`^#\\d+: ${user[0]}$`, "gm")
                return !reg.test(data); // 有人没签到 -> 对应reg.test给出false -> 对应return 1 -> 最后users.some()返回1
            })) {
                window.multilogin();
            } else {
                var result = confirm("今天你签到过了！以主账号登录吗？");
                if (result) {
                    var [usrn, pswd] = users[0];    // 应确保主账号在users.js中的第一条
                    $.post("action.php",{
                        username:usrn,
                        password1:pswd,
                    }).done(() => {
                        window.location=from;
                    });
                }
            }
        }
    }

    window.multilogin = function() {
        var tip = $("#tip");
        tip.html("正在登录…");
        function Multilogin_single(index) {
            if (index == -1) {
                tip.append("<br>正在跳转…");
                window.location=from;
            }
            var [usrn, pswd] = users[index];
            $.post("action.php",{
                username:usrn,
                password1:pswd,
            }).done(function(data) {
                if (data == 0) {
                    tip.html(usrn+" 已登录")
                    Multilogin_single(index-1);
                } else {
                    tip.html(usrn+" 登录失败<br>"+data+"程序已中止。");
                }
            }).fail(function() {
                tip.html(usrn+" 登录失败<br>请求未响应，请重新登录");
            });
        }
        Multilogin_single(users.length-1);
    }

    // Your code here...
})();