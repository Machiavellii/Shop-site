let template = $('#my-template').html();
let mainRow = $('#main-row');
let text = '';
let rg = new RegExp('{{productTitle}}', 'gi');
let inputF = $('.search-inp');
let slide = $('.intro-header');
let badge = $('.badge');
let colBtns = $('[data-col]');
let counter = localStorage.getItem("counter");
counter = JSON.parse(counter);
$(badge).html(counter);

$.ajax({
  url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
  type: 'get',
  dataType: 'json',
})
.done(function(res) {
  displayProducts(res)
  search(res)
  funId()
})


colBtns.on('click',function  (el) {
  let val = $(this).data('col');
  $('.cut').removeClass('active');
  $(this).parent().addClass('active');
  el.preventDefault();
  $.ajax({
    url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
    type: 'get',
    dataType: 'json',
    
  })
  .done(function(res) {
    let filterAll = res.filter(function  (el) {
      return el.colection == val || el[val];
    })
    displayProducts(filterAll)
    funId()
  })
  
})

function search (res) {
  inputF.on('keyup',function () {
    if (this.value.length >= 3) {
         let inputValue = this.value.toUpperCase()
         let filterSearch = res.filter(function  (el) {
           if (el.model.toUpperCase().includes(inputValue) || el.productTitle.toUpperCase().includes(inputValue)) {
            return el
           };
         })
         displayProducts(filterSearch)
         slide.hide('slow');
       }else{
        displayProducts(res);
        slide.show('slow')
       }
  })
}
function displayProducts(res) {
  let text = '';
  res.forEach(function(el) {
    text += template.replace('{{imgSrc}}', el.imgSrc)
      .replace(rg, el.productTitle)
      .replace('{{model}}', el.model)
      .replace('{{price}}', el.price)

  })
  mainRow.html("");
  mainRow.html(text)

}


function funId() {
  let product = $('.pro-img-holder')
  product.each(function (e) {
  let id =  $(this).children('a').children('img').attr('src').match(/\d/g);
  id = id.join("");
  $(this).attr('id', id);
  $(this).on('click',function () {
    localStorage.setItem('id',JSON.stringify(id));
  })
  })
}
