'use strict';

// Firebase Schema


// Local Schema (defined in keys.js)
var sum = 0;
var product = 1;

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#create-seats').click(clickCreateSeats);
  $('#ga, #vip').on('dblclick', '.seat', clickSeat);
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
    $vip.attr('data-price', formatCurrency(price));
    $('#section-input > option:selected').remove();
    $('#section-input').val('ga');
  } else {
    htmlAddDivs(seatNumber, $ga, 'GA');
    $ga.attr('data-price', formatCurrency(price));
    $('#section-input > option:selected').remove();
    $('#section-input').val('vip');
  }
  $('#section-input').trigger('change', true);
  if($('option').length === 1) {
    $('#add-seats').remove();
  }
}

function clickSeat() {
  var $seat = $(this);
  var $nameInput = $('<input>');
  $nameInput.attr('type', 'text').attr('placeholder', 'John Doe').addClass('name');
  var $submitBtn = $('<input>');
  $submitBtn.attr('type', 'button').val('Submit').addClass('button small radius name-submit');
  var $par = $('<p>');

  if($seat.hasClass('reserved')) {
    $('#seatModal > section').empty();
    $par.text('This seat is already reserved by ' + $seat.data('name') + '.');
    $('#seatModal > section').append($par);
    $('#seatModal').foundation('reveal', 'open');
    $('#seatModal span').text($seat.data('seat'));
  } else {
    $('#seatModal > section').empty();
    $('#seatModal > section').append($nameInput);
    $('#seatModal > section').append($submitBtn);
    $('#seatModal span').text($seat.data('seat'));
    $('#seatModal').foundation('reveal', 'open');
  }
}

function clickSubmitName() {
  var $submitBtn = $(this);
  var name = $submitBtn.prev().val();
  var $seatId = $(this).parents('#seatModal').find('span').text();

  reserveSeat($seatId, name);
  htmlListSeats($seatId, name);
  sumVipResults();
  sumGaResults();
  sumResults(parseFloat($('#vip-total').text().slice(12)),parseFloat($('#ga-total').text().slice(11)));
  sumPeeps(parseFloat($('#ga-people').text().slice(18)),parseFloat($('#vip-people').text().slice(19)));
  $submitBtn.prev().val('');
  $('#seatModal').foundation('reveal', 'close');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function reserveSeat(id,name) {
  var $body = $('body');
  var $seat = $body.find('div[data-seat="' + id + '"]');
  $seat.attr('data-name', name);
  $seat.addClass('reserved');
}

function htmlAddDivs(seatNumber, section, sectionType) {
  for(var i = 1; i <= seatNumber; i++) {
    var $seat = $('<div>');
    var seatId = sectionType + i;
    $seat.text(seatId).attr('data-seat', seatId);
    $seat.addClass('seat');
    section.append($seat);
  }
}

function htmlListSeats(id, name) {
  var row = '<tr><td class="seat-number"></td><td class="reserver-name"></td></tr>';
  var $row = $(row);
  $row.children('.seat-number').text(id);
  $row.children('.reserver-name').text(name);
  $('#seats-total').append($row);
}

function sumVipResults() {
  var results = [];
  product = 1;
  $('#vip > .reserved').each(function() {results.push(parseFloat($(this).text(), 10))});
  if($('#vip > div').hasClass('seat')){
    product = $('#vip').data('price');
    product = parseFloat(product.slice(1));
    product *= results.length;
  } else {
    product *= 0;
  }
  $('#vip-total').text('VIP Total: ' + formatCurrency(product));
  $('#vip-people').text('Total VIP Tickets: ' + results.length);
}

function sumGaResults() {
  var results = [];
  product = 1;
  $('#ga > .reserved').each(function() {results.push(parseFloat($(this).text(), 10))});
  if($('#ga > div').hasClass('seat')){
    product = $('#ga').data('price');
    product = parseFloat(product.slice(1));
    product *= results.length;
  } else {
    product *= 0;
  }
  $('#ga-total').text('GA Total: ' + formatCurrency(product));
  $('#ga-people').text('Total GA Tickets: ' + results.length);
}

function sumResults(ga,vip) {
  sum = ga + vip;
  $('#total-sum').text('Total Ticket Sum: ' + formatCurrency(sum));
}

function sumPeeps(ga,vip) {
  sum = 0;
  sum = ga + vip;
  $('#total-people').text('Total Concert Attendees: ' + sum);
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
