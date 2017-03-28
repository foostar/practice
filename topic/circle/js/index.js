function setLayout(){
    var div = document.getElementsByClassName("roundWrap")[0];
    var str = "";
    for(var i=0; i<10; i++){
        str =  "<div><span>"+(9-i)+"</span>"+str+"</div>";
    }
    div.innerHTML=str;
}
window.onload = function(){
    var Scroll = new MScroll("box","y",false,true,true)
    Scroll.onscroll = function() {
        var deg = -this.iScroll 
        this.oScroll.style.transform="rotateX("+deg+"deg)";
    }
    setLayout()
}