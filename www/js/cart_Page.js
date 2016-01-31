$(document).ready(function(){
$(".bottom-search-bg").hide();
  var userdata = loginMethods.getUserInfo();
  
  //for hiding search-bar
	$(window).scroll(
    {
        previousTop: 0
    }, 
    function () {
	console.log('scrolled');
	
    var currentTop = $(window).scrollTop();
    if (currentTop=='0') {
       $(".bottom-search-bg").hide();
    } else {
       $(".bottom-search-bg").show();
    }
      this.previousTop = currentTop;
});

});