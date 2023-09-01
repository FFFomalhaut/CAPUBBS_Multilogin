// ==UserScript==
// @name         CAPUBBS Multilogin
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  rt
// @author       To Dust
// @match        https://*.chexie.net/bbs/login/*
// @icon         https://chexie.net/assets/images/capu.jpg
// @grant        none
// @require      https://chexie.net/assets/js/jquery.min.js

// ==/UserScript==

(function() {
    'use strict';

    var from = $("input#from").val();
    from = from ? from : "/bbs/index";
    var users = {
        "归尘":         "99b3209963cec83db54a48d1c9b1dd31",
        "歸塵":         "99b3209963cec83db54a48d1c9b1dd31",
        "2022飞行团":   "7f901d1e7bd1a1b5bc76061a4ff246b1",
        "22飞行团":     "7f901d1e7bd1a1b5bc76061a4ff246b1",
        "实践部":       "c5af0543407a6e8ba11db6a69f792014",
        "组织部":       "a1655b339c48a150da4809b3b1199dde",
        "23石花洞":     "f03c726ec264d1bc56cff2e72fba0d48"
    };

    var btn = $("<input type='button' value='全部登录' class='button' onclick='multilogin();'></input>");
    $("input.button:first").before(btn,"\n");
    $("input.button:first")[0].previousSibling.data=("\n    \n");
    $("input.button:last")[0].nextSibling.data=("\n    \n");


    window.multilogin = function() {
        for (var x in users) {
            $.post("action.php",{
                username:x,
                password1:users[x]
            })
        }
        window.location=from;
    };

    // Your code here...
})();