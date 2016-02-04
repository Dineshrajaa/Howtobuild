$(document).ready(function(){
//alert(localStorage.getItem('productid'));
var pk =localStorage.getItem('productid')
 $(document).bind("deviceready", function() {
			document.addEventListener("backbutton", function() {
						
						localStorage.setItem('productid',' ');
						parent.history.back();
			});
			});
  $body = $("body");
  $.ajax({
	    type : 'GET',
	    url: 'http://staging12.getpriceapp.com/item-details/'+pk+'/',
		beforeSend: function() { 
		console.log('moni');
		$body.addClass("loading"); 
		},
        complete: function() { 
		console.log('moni')
		$body.removeClass("loading"); 
		},
		contentType: "application/json",
		dataType: "json",
		data :{
	
},
	   success : function(data)
			    { 
				
				 var getitemdetails = JSON.stringify(data);
				 //alert(getitemdetails);
			     localStorage.setItem('itemdetails','');
                 localStorage.setItem('itemdetails' ,getitemdetails);
                 var parsedetails =JSON.parse(localStorage.getItem('itemdetails'));
				 //alert(parsedetails);
                 loadprof();
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr.responseText);					 
	//alert(xhr.status);	
	}						 
		
		
		});//end of ajax call 

});

function loadprof()
{
var parsedetails =JSON.parse(localStorage.getItem('itemdetails'));
if(parsedetails.price_sold)
{console.log('present');}
else 
parsedetails.price_sold='15';

if(parsedetails.amount_saved)
{console.log('present')}
else 
parsedetails.amount_saved='2';
if(parsedetails.price)
{console.log('present')}
else 
parsedetails.price='21';
url =parsedetails.photo_set[0].url_large
//alert(JSON.stringify(parsedetails.photo_set[1]))
//alert(JSON.stringify(parsedetails.photo_set[2]))
//alert(JSON.stringify(parsedetails.photo_set[3]))
//var urls =JSON.stringify(parsedetails.photo_set)


//alert(url)
$('.product-name').text(parsedetails.brand);
$('.product-description').text(parsedetails.description);
$('#price_sold').text('$'+parsedetails.price_sold+'')
$('#amount_saved').text('$'+parsedetails.amount_saved+'')
$('.carousel-inner').html('');
$('.carousel-inner').append('<div class="item active">\
           <img src="'+url+'"  class="img-responsive">\
            </div>\
            <div class="item">\
            <img src="./assets/img/bag.jpg"  class="img-responsive">\
            </div>\
            <div class="item">\
            <img src="./assets/img/bag.jpg"  class="img-responsive">\
            </div>\
	        <div class="item">\
            <img ssrc="./assets/img/bag.jpg"  class="img-responsive">\
            </div>');

$('#originalprice').text('$'+parsedetails.price+'');
$('.item-description').text(parsedetails.title);





}