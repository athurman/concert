'use strict';

// Firebase Schema


// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#create-seats').click(clickCreateSeats);
  // initMap(36, -86, 5);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickCreateSeats() {
  var seatNumber = getValue('#seats-input', parseInt);
  var price = getValue('#price-input', parseFloat);
  var $vip = $('#vip');
  var $ga = $('#ga');
  debugger;
  if ($('#section-input > option:selected').val() === 'vip') {
    htmlAddDivs(seatNumber, $vip, 'V');
    $vip.attr('data-price', formatCurrency(price));
    $('#section-input > option').val('vip').addClass('disabled');
  } else {
    htmlAddDivs(seatNumber, $ga, 'GA');
    $ga.attr('data-price', price);
    $('#section-input > option').val('ga').remove();
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddDivs(seatNumber, section, sectionType) {
  for(var i = 0; i < seatNumber; i++) {
    var $seat = $('<div>');
    $seat.text(sectionType + i);
    section.prepend($seat);
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// function initMap(lat, lng, zoom){
//   var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
//   db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
