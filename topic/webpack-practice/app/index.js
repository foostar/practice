var str = require("./app")
var $ = require("jQuery")
require("./css/reset.css")
document.write("<div>"+str+"</div>")
$(function(){
    $("div").click(function(){
        alert('a')
    })
})
