$(document).ready(function(){
  $(".bottom-search-bg").hide();
  var userdata = loginMethods.getUserInfo();
  var category=''
  var pk ='' ;
  
  $(document).bind("deviceready", function() {
			document.addEventListener("backbutton", function() {
						console.log("Disabled Back button");
			});
			});
  
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
  
  //View Item Details event
  $(document).on('click','.pic',function(e){
      mixpanel.track("view_item_details", {
      "id": '123'
    });
	//alert(e.target.id);
	localStorage.setItem('productid',' ')
	localStorage.setItem('productid',e.target.id)
 	
	
  window.location='product_Detail.html'
  
  });
  //preview event
   $(document).on('click','.items',function(){
      mixpanel.track("preview", {
      "id": '1234'
    });

  });
  //add to cart 
    $(document).on('click','.add-to-cart',function(){
      mixpanel.track("add_to_cart", {
      "id": '12345'
    });

  });  
  
  //remove from cart 
    $(document).on('click', '.remove',function(){
      mixpanel.track("remove_from_cart", {
      "id": '123remove'
    });
	});
	//filter by category
	/*$(".scrollable-menu-filter li:not(:first-child)").click(function(){
	alert('hello');
       mixpanel.track("filter_by_category", {
      "id": '123category'
    });
    });*/
	
	
	//display on basis of category 
	
 $(".dropdown-menu").on("click", "li", function(event){
           console.log(event.target.id)
		   var id = event.target.id;
		   
	if(userdata.fbGender == 'female')
     {	
		   if(id=='clothingimg')
		      {category='Women'+'\'s Clothing'
				console.log(category);}
		   else if(id=='sunglassimg')
		      {category='Women'+'\'s sunglass'
				console.log(category);}
		   else if(id=='necklaceimg')
		      {category='necklace'
				console.log(category);}
		   else if(id=='purseimg')
		      {category='purse'
				console.log(category);}
		   else
               {category = "The Perfect Present" ;
                 console.log(category);}			   
      }	

  else{
  
  if(id=='clothingimg')
		      {category='men'+'\'s clothing'
				console.log(category);}
		   else if(id=='watchimg')
		      {category='men'+'\'s watch'
				console.log(category);}
		   else if(id=='gadgetimg')
		      {category='gadget'
				console.log(category);}
		   else if(id=='cycleimg')
		      {category='cycling'
				console.log(category);}
		   else
               {category='men'+'\'s Sunglass' ;
                 console.log(category);}		
  
  
  
  }	  
		
  $.ajax({
	    type : 'GET',
	    url: "http://ec2-54-92-251-163.compute-1.amazonaws.com/item/list/",
		contentType: "application/json",
	    dataType: "json",
		data : {
		"category" :category,
},
	   success : function(data)
			    { 
				
				 var getitemdata = JSON.stringify(data);
				// alert(JSON.stringify(data));
			     localStorage.setItem('itemdata','');
                 localStorage.setItem('itemdata' ,getitemdata);
                 var parsedata =JSON.parse(localStorage.getItem('itemdata'));
                 loadprof();
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 

		
         });
});

function loadprof()
{
var parsedata =JSON.parse(localStorage.getItem('itemdata'));

$('.add-items').html(' ');
for(i=0 ; i<parsedata.length ;i+=2)
{

  if(parsedata[i].fields.price)
      {
	 // alert('val')
	  //parsedata[i].fields.price='100';
	  } 
	  else
	  parsedata[i].fields.price='100'
	  
	  if(parsedata[i+1].fields.price)
      {
	  //alert('val')
	  //parsedata[i].fields.price='100';
	  } 
	  else
	  parsedata[i+1].fields.price='100'
  
 $('.add-items').append('<div class="row ">\
            <div class="col-xs-6 right-padding ">\
                <img src="./assets/img/bag.jpg" class="img-responsive items ">\
                <p class="item-price">$'+parsedata[i].fields.price+'</p>\
                <div class="row border-outline">\
                    <div class="col-xs-12 pic" >\
                        <p id="'+parsedata[i].pk+'"><img src="./assets/img/like.png">'+parsedata[i].fields.brand+'\
                            <br> <span>'+parsedata[i].fields.description+'</span></p>\
                    </div>\
                </div>\
            </div>\
            <div class="col-xs-6 left-padding ">\
                <img src="./assets/img/bag.jpg" class="img-responsive items">\
                <p class="item-price">$'+parsedata[i+1].fields.price+'</p>\
                <div class="row border-outline">\
                    <div class="col-xs-12 pic" >\
                        <p id="'+parsedata[i+1].pk+'"><img src="./assets/img/like.png">'+parsedata[i+1].fields.brand+'\
                            <br> <span>'+parsedata[i+1].fields.description+'</span></p>\
                    </div>\
                </div>\
            </div>\
        </div>');
		}





}



