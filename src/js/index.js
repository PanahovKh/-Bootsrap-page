var modal = document.getElementById('myModal');


var btn = document.getElementById("like");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



function slowScroll(id) {
    $('html','body').animate({
      scrollTop: $(id).offset().top
    },500);
  }
  
  $(document).on("scroll", function() {
    if($(window).scrollTop() === 0)
    $("header").removeClass("fixed");
    else
    $("header").attr("class","fixed");
    });