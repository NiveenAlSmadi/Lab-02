
'use strict';
let newarry=[];
let optionarr=[];

// construct function
function X(value){
  this.name = value.title;
  this.src = value.image_url;
  this.detals = value.description;
  this.keyword=value.keyword;
  this.horn=value.horn;
  newarry.push(this);
  // optionarr.push(this.keyword);
}

// git data from json

// function data1(){

$.ajax('./data/page-1.json').then((data) => {
  data.forEach((animals) => {
    let title = new X(animals);
    // console.log(title);
    title.render();
    // title.optionRender();
    // sortByname(data);
  });
});

// data1();
// function data2(){

$.ajax('./data/page-2.json').then((data) => {
  data.forEach((animals) => {
    let title = new X(animals);
    // console.log(title);
    title.render();
    title.optionRender();
    // sortByhorn(data);
  });
});


// data2();

//render  //
X.prototype.render = function() {
  let animal = $('#photo-template').clone();
  animal.find('h2').text(this.name);
  animal.find('img').attr('src',`${this.src}`);
  animal.addClass( this.keyword );
  animal.find('p').text(this.detals);
  $('main').append(animal);

  this.optionRender();


};


// render options  //
X.prototype.optionRender=function() {
  let option = `<option>${this.keyword}</option>`;
  if(!optionarr.includes(this.keyword)){
    newarry.push(this.keyword);
    $('.keyword').append(option);
  }
};



//filter//
$( '.keyword' ).change( ( e ) => {
  $( 'div' ).hide();
  let targetValue = e.target.value;
  $( `.${targetValue}` ).show();
  if( targetValue === 'default' ){
    $( 'div' ).show();
  }
} );

// // mostach //
// let Template=$('#photo-Mustache').html();
// let renderTemplate=Mustache.render(Template,this);
// $('main').append(renderTemplate);

$( '#page1' ).change( ( e ) => {
  $( 'div' ).hide();
  let targetValue = e.target.value;
  $( `.${targetValue}` ).show();
  if( targetValue === 'default' ){
    $( 'div' ).show();
  }
} );


sortByname();

function sortByname(arr) {
  arr.sort((a, b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()) {
      return -1;
    } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
      return 1;
    }
    return 0;
  });
  return arr;
}

function sortByhorn(arr) {
  arr.sort((a, b) => {
    if (a.horns < b.horns) {
      return -1;
    } else if (a.horns > b.horns) {
      return 1;
    }
    return 0;
  });
  return arr;
}

sortByhorn()