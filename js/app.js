
'use strict';
function Animals(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}
let pageNumber = './data/page-1.jsonn';

Animals.prototype.render = function (){
  let template = $('.photo-Mustache').html();
  let animalTemplate = Mustache.render(template,this);
  $('main').append(animalTemplate);
};

const ajaxsettings ={
  method:'get',
  datatype:'json'
};


let newDataArray = [];
let dataRender = function(pageUrl){
  console.log(pageUrl.substr(0,pageUrl.lengtha));
  $.ajax(`${pageUrl.substr(0,pageUrl.length -1)}`,ajaxsettings).then(data =>{
    newDataArray = [];
    data.forEach((element) => {
      let animalImage = new Animals(element);
      if (!newDataArray.includes(animalImage.keyword)){
        newDataArray.push(animalImage.keyword);
        $('#filter').append(`<option value="${animalImage.keyword}">${animalImage.keyword}</option>`);
      }
      animalImage.render();
    });
  });};

//filter//


$('#filter').on('change', function() {
  $( 'div' ).hide();
  let targetValue = $(this).val();
  console.log(targetValue);
  $( `.${targetValue}` ).show();
  if( targetValue === 'default' ){
    $('div').show();
  }
} );


// sortByhorn()
$('.page1').on('click',()=> { pageNumber = './data/page-1.jsonn' ;
  $('main').empty();
  $('#filter').empty();
  dataRender(pageNumber);
});
$('.page2').on('click',()=>{ pageNumber = './data/page-2.jsonn';
  $('main').empty();
  $('#filter').empty();
  dataRender(pageNumber);
});

dataRender(pageNumber);
