
let template = $('#my-template').html();
let productHolder = $('#product-holder');
let buyBtn;
let counter = localStorage.getItem("counter");
let badge = $('.badge').html(counter)
let imgH = $('#img-H');
let id = localStorage.getItem("id");
id = JSON.parse(id);
let imgSrc = "product".concat(id)
let text = '';
let modal = $('#modal');
let save = $('#save');
let btndelete = $('#delete');
let close = $('.close')
close.on('click',function  () {
	modal.css('display', 'none');
})




$.ajax({
  	url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
    type: 'GET',
    dataType: 'json',
})
.done(function(res) {
	res.forEach(function (el) {
		if (el.imgSrc === imgSrc) {
			text += template.replace('{{imgSrc}}', el.imgSrc)
							.replace('{{productTitle}}', el.productTitle)
							.replace('{{price}}', el.price)

		}
	})
	productHolder.append(text);
	 $('.pictures').on('click',function (e) {
	e.preventDefault()
	let src = $(this).attr('src');
	$('.placeholder').attr('src', src);
	
	})
	 
	 let imgAnim = $('.placeholder');
	 let btnR = $('.product-item-btn');
	 let selff= $(imgAnim);
	 let copy = selff.clone();

	 btnR.on('click',function () {
			
	 	copy.css({
	 		position : 'absolute',
	 		top: selff.offset().top,
	 		left: selff.offset().left,
	 		width:selff.width(),
	 		height:selff.height()
	 	});
	 	copy.animate({
           width: imgH.width(),
           height: imgH.height(),
           top: imgH.offset().top,
           left: imgH.offset().left,
	 	}, 1000)
	 	
	 	productHolder.append(copy);
	 
	 })
	badge.on('click',function  () {
	 		modal.css('display', 'block');
	 		copy.css({
	 			width: '40px',
	 			height: '40px',
	 			left: '0'
	 		});
	 		modal.append(copy)
	 		localStorage.setItem('copy', 'counter');
	 		btndelete.on('click',function  () {
	 			copy.css('display', 'none');
	 		})
	 	})

	buyBtn = $('.product-item-btn');
	buyBtn.on('click',function (res) {
		addTocart(res)
	})


})

function addTocart(res) {
	$(badge).html(counter);
	counter++
	$(badge).html(counter);
	localStorage.setItem('counter',JSON.stringify(counter));
}

