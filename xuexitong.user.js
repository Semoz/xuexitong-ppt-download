// ==UserScript==
// @name         学习通课件下载
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Semoz
// @match        *://*.chaoxing.com/mycourse/studentstudy*
// @grant        none
// ==/UserScript==

(function() {

var btn  = document.createElement ('div');
var div = document.createElement('div');
btn.innerHTML = '<button id="myButton" type="button">点击查询课件</button>';
btn.setAttribute ('id', 'myContainer');
btn.setAttribute ('style', 'margin-left:400px');
div.setAttribute ('id', 'contentdiv');
div.setAttribute ('style', 'margin-left:400px');
var body = document.body;
body.insertBefore(btn, body.firstChild);
body.insertBefore(div, body.firstChild);
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {

    var html = "<div></br>";
    var windowHtml = "<input type ='button' value ='打印此页' onClick ='window.print()'></br>";
    var title = $(document.getElementById('coursetree')).find("h4.currents a span:first").html();
    if(title === null){
        var div = document.getElementById("contentdiv");
        div.innerHTML = "暂无数据";
        return;
    }
    console.log(title);
    title = title.replace(/<[^>]+>/g,"");
    console.log(title);
    title = title.replace(/\n|\r/g,"");
    console.log(title);
    title = title.replace(/\s/g,"").trim();
    console.log(title);
    html += "</br>";
    html += "<h1>" + title + "</h1></br>";
    var image;
    var max;
    $(document.getElementById('iframe').contentWindow.document.body).find("iframe").each(function() {
    	console.log(image);
    	if(image === undefined){
    		image = $(this.contentWindow.document.body).find("#img").find("img:first").attr("src");
        max = $(this.contentWindow.document.body).find("#navigation").find(".all").html();
    	}

    });
    if(image === undefined){
        var div = document.getElementById("contentdiv");
        div.innerHTML = "暂无数据";
        return;
    }

    var baseimg = image.substring(0, image.lastIndexOf("/"));

    if(max!=undefined){
        html += "共" + max + "张</br>";
        html += "</br>";
        html += "复制后使用迅雷批量下载或直接点击图标下载</br>";
        html += "</br>";
        for (var i=1;i<=max;i++){
            var filename = baseimg + "/" + i + ".png";
            windowHtml += "<img src='" + filename+ "' alt=''>";
            html += "<a target='_blank' href='" + filename + "''>"+filename+"</a>" + "</br>";
        }
    }
    html += "</div>";
    html += "</br>";
    html += "</br>";
    html += "</br>";
    html += "</br>";
    var div = document.getElementById("contentdiv");
    var newWindow = window.open("");
    newWindow.document.body.innerHTML = windowHtml;
    newWindow.document.title = title;
    div.innerHTML = html;

}


})();
