var $ = require("jQuery")
$(function(){
    document.write("<div>我就是试试，不允许么？</div>")
    $("div").click(function(){
        alert('a')
    })
})
