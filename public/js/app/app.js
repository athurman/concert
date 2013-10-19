'use strict';

// Firebase Schema


// Local Schema (defined in keys.js)
var names = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#create-seats').click(clickCreateSeats);
  $('#ga, #vip').on('dblclick', '.seat', clickReserveSeat);
  $('#seatModal').on('click', '.name-submit', clickSubmitName);
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
  if ($('#section-input > option:selected').val() === 'vip') {
    htmlAddDivs(seatNumber, $vip, 'V');
    $vip.data('price', formatCurrency(price));
    $('#section-input > option:selected').remove();
    $('#section-input').val('ga');
  } else {
    htmlAddDivs(seatNumber, $ga, 'GA');
    $ga.data('price', formatCurrency(price));
    $('#section-input > option:selected').remove();
    $('#section-input').val('vip');
  }
  $('#section-input').trigger('change', true);
  if($('option').length === 1) {
    $('#add-seats').remove();
  }
}

function clickReserveSeat() {
  var $seat = $(this);
  var $nameInput = $('<input>');
  $nameInput.attr('type', 'text').attr('placeholder', 'Jane Doe').addClass('name');
  var $submitBtn = $('<input>');
  $submitBtn.attr('type', 'button').val('Submit').addClass('button small radius name-submit');
  var $par = $('<p>');

  if($seat.hasClass('reserved')) {
    $('#seatModal > section').empty();
    $par.text('This seat is already reserved.');
    $('#seatModal > section').append($par);
    $('#seatModal').foundation('reveal', 'open');
  } else {
    $seat.addClass('reserved');
    $('#seatModal > section').empty();
    $('#seatModal > section').append($nameInput);
    $('#seatModal > section').append($submitBtn);
    $('#seatModal').foundation('reveal', 'open');
    $('#seatModal span').text($seat.data('seat'));
  }
}

function clickSubmitName() {
  var $submitBtn = $(this);
  var name = $submitBtn.prev().val();
  names.push(name);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddDivs(seatNumber, section, sectionType) {
  for(var i = 1; i <= seatNumber; i++) {
    var $seat = $('<div>');
    var seatId = sectionType + i;
    $seat.text(seatId).data('seat', seatId);
    $seat.addClass('seat');
    section.append($seat);
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
