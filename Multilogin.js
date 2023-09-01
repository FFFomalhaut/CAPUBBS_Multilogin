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
    /* eslint-disable no-multi-spaces */
    /* globals $ */

    var from = $("input#from").val();
    from = from ? from : "/bbs/index";
    var users = [
        ["归尘",        "99b3209963cec83db54a48d1c9b1dd31"],
        ["歸塵",        "99b3209963cec83db54a48d1c9b1dd31"],
        ["2022飞行团",  "7f901d1e7bd1a1b5bc76061a4ff246b1"],
        ["22飞行团",    "7f901d1e7bd1a1b5bc76061a4ff246b1"],
        ["实践部",      "c5af0543407a6e8ba11db6a69f792014"],
        ["组织部",      "a1655b339c48a150da4809b3b1199dde"],
        ["23石花洞",    "f03c726ec264d1bc56cff2e72fba0d48"]
    ];

    var btn = $("<input type='button' value='全部登录' class='button' onclick='multilogin();'></input>");
    $("input.button:first").before(btn,"\n");
    $("input.button:first")[0].previousSibling.data=("\n    \n");
    $("input.button:last")[0].nextSibling.data=("\n    \n");

    window.multilogin = function() {
        var index = users.length;
        function Multilogin_single() {
            // console.log(index);
            index--;
            if (index == -1) {
                clearInterval(Interval_Multilogin);
                window.location = from;
            } else {
                var [usrn, pswd] = users[index];
                $.post("action.php",{
                    username:usrn,
                    password1:pswd,
                })
                // console.log(usrn,pswd);
            }
        }
        var Interval_Multilogin = setInterval(Multilogin_single, 2000);
    };

    // Your code here...
})();