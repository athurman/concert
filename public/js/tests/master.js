'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

function createSeats(section,seats,price){
	$('#section-input').val(section);
  $('#seats-input').val(seats);
  $('#price-input').val(price);
  $('#create-seats').trigger('click');
}

function existAndVisible(element){
	deepEqual(element.length, true, element.selector + ' should exist');
  deepEqual(element.is(':visible'), true, element.selector + ' should be visible');
}

test('Select Section Dropdown Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#section-input'));
});

test('Seat Input Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#section-input'));
});

test('Seat Price Input Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#section-input'));
});

test('Create Seats Button Exists and is Visible', function(){
  expect(2);
  existAndVisible($('#create-seats'));
});

test('Create Seats Button adds seats to the proper section', function(){
  expect(2);
  createSeats('vip','50',500);
  createSeats('ga','500',50);
  deepEqual($('#vip > div').length, 50,
  	'50 VIP seats should exist');
  deepEqual($('#ga > div').length, 500,
  	'500 General Addmission seats should exist');
});

test('Create Seats Button adds data-price element to the proper section', function(){
  expect(2);
  createSeats('vip','50',500);
  createSeats('ga','500',50);
  deepEqual($('#vip').data('price'), 500,
  	'VIP section should hava a data-price element of 500');
  deepEqual($('#ga').data('price'), 50,
  	'General Addmission section should have a data-price element of 50');
});

test('Create Seats Button removes prior selections', function(){
  expect(1);
  createSeats('vip','50',500);
  deepEqual($('#section-input').val('vip'), false,
  	'VIP selection should be removed once seats have been added');
  createSeats('vip','50',500);
  deepEqual($('#section-input').val('ga'), false,
  	'General Admission selection should be removed once seats have been added');
});

test('If both section have been created, then create seats section is not visible', function(){
  expect(1);
  createSeats('vip','50',500);
  createSeats('ga','500',50);
  deepEqual($('#add-seats').is(':visible'), false, ' #add-seats should not be visible');
});