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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzbG93U2Nyb2xsKGlkKSB7XHJcbiAgICAkKCdodG1sJywnYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICBzY3JvbGxUb3A6ICQoaWQpLm9mZnNldCgpLnRvcFxyXG4gICAgfSw1MDApO1xyXG4gIH1cclxuICBcclxuICAkKGRvY3VtZW50KS5vbihcInNjcm9sbFwiLCBmdW5jdGlvbigpIHtcclxuICAgIGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSA9PT0gMClcclxuICAgICQoXCJoZWFkZXJcIikucmVtb3ZlQ2xhc3MoXCJmaXhlZFwiKTtcclxuICAgIGVsc2VcclxuICAgICQoXCJoZWFkZXJcIikuYXR0cihcImNsYXNzXCIsXCJmaXhlZFwiKTtcclxuICAgIH0pOyJdLCJmaWxlIjoianMvaW5kZXguanMifQ==