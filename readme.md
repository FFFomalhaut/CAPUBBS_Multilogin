# CAPUBBS_Multilogin
## 使用说明
0. 将本仓库中的文件下载到自己的电脑上。
0. 在浏览器中下载并安装Tampermonkey插件。在浏览器的插件管理页打开“允许访问文件网址”开关。在插件自身设置页中“允许脚本访问本地文件”中选择“外部(@require 和 @resource)”.
0. 按下Tampermonkey的“实用工具”选项卡中的“导入”栏中的“选择文件”按钮，选择刚才下载的Multilogin.js，点击“打开”。然后导入。
0. 找到刚才下载的users.sample.js。将其中的用户名改为自己的用户名，密码改为用MD5加密过的自己的密码（32位小写的表示形式）。然后将文件重命名为users.js。
0. 在Tampermonkey的“已安装脚本”选项卡中找到刚才导入的脚本。打开。找到第11行的`// @require      file:///C:/Users/admin/Desktop/PlayWithBBS/Multilogin/users.js`
将`file:///`后的路径改为users.js在你自己电脑中的路径。

## 扩展功能
——如果你乐意的话
（以下以Windows 10为例）

1. 在电脑桌面上（或者其他任何文件夹中）单击右键，选择新建-快捷方式
1. 输入对象的位置。请输入`https://chexie.net/bbs/login/?fromdesktop=1`，点击“下一步”
1. 输入该快捷方式的名称。可以填写任意值，不影响使用。填写完毕后点击“完成”

从桌面快捷方式运行时，将自动进行全部登录。如果所有账号均已签到过，则不自动进行全部登录。
