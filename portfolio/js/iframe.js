// Find the right method, call on correct element
function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else {
        console.log('what');
    }
}

// Whack fullscreen
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

$(document).ready(function(){
  
  $('a').click(function(event){
    event.preventDefault();
    //$(this).parent("div").prev('.col-md-7').css( "background-color", "red" );
    $if = $(this).parent("div").prev('.col-md-7');
    $id = $if.children('iframe').attr('id');
    //$c.css( "background-color", "red" );
    element= document.getElementById($id);
    launchIntoFullscreen(element);
    console.log(element);
  });
});

/*
document.getElementById('myLink').addEventListener('click', function(){
    var iframe = document.getElementById("div1");
    launchIntoFullscreen(iframe);
});

document.getElementById('salir').addEventListener('click', function(){
    exitFullscreen();
});
*/
