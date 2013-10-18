'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

function createSeats(section,seats,price){
	$('#secion-input').val(section);
  $('#seats-input').val(seats);
  $('#price-input').val(price);
}

function existAndVisible(element){
	deepEqual(element.length?, true, element.selector + 'should exist');
  deepEqual(element.is(":visible"), true, element.selector + 'should be visible');
}

test('Select Section Dropdown Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#secion-input'));
});

test('Seat Input Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#secion-input'));
});

test('Seat Price Input Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#secion-input'));
});

test('Create Seats Button Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#create-seats'));
});

test('Create Seats Button adds seats to the proper section', function(){
  expect(2);
  createSeats('vip','50',500);
  createSeats('ga','500',50);
  deepEqual($('#vip > div').length, 50, '50 VIP seats should exist');
  deepEqual($('#ga > div').length, 500, '500 General Addmission seats should exist');
});

test('Create Seats Button adds data-price element to the proper section', function(){
  expect(1);
  //createSeats(section,seats,price);
});

test('Create Seats Button removes prior selections', function(){
  expect(1);
  //createSeats(section,seats,price);
});

test('If no sections remain to be selected, create seats section is not visible', function(){
  expect(1);

});