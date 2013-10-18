'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('Select Section Dropdown Exists and is Visible', function(){
  expect(1);
  deepEqual($('#secion-input').is(":visible"), true, '#section-input should be visible');
});

test('Seat Input Exists and is Visible', function(){
  expect(1);
  deepEqual($('#seats-input').is(":visible"), true, '#seats-input should be visible');
});

test('Seat Price Input Exists and is Visible', function(){
  expect(1);
  deepEqual($('#price-input').is(":visible"), true, '#price-input should be visible');
});

test('Create Seats Button Exists and is Visible', function(){
  expect(1);
  deepEqual($('#create-seats').is(":visible"), true, '#create-seats should be visible');
});

test('Create Seats Button adds seats to the proper section', function(){
  expect(1);

});

test('Create Seats Button adds data-price element to the proper section', function(){
  expect(1);

});

test('Create Seats Button removes prior selections', function(){
  expect(1);

});

test('If no sections remain to be selected, create seats section is not visible', function(){
  expect(1);

});