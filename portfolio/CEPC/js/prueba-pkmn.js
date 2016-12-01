$(document).ready(function(){
  var img = $('#contenedor');

  console.log("hola");
  img.each(function(i){
  	console.log(i);
    $(this).attr({"src" : i+".ico", "height" : "100px"});
  });

});