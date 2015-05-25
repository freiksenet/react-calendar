var React = require('react/addons');
var expect = require('chai').expect;

var _ = require('lodash');
var moment = require('moment');

var Day = require('../src/Day');

describe('Day component by default', function () {

  var testMoment = moment();
  var day;

  beforeEach(function(){
    day = React.addons.TestUtils.renderIntoDocument(<Day date={testMoment}/>);
  });

  afterEach(function(){
    day = null;
  });

  it('should have prop with date matching input prop', function () {
    expect(day.props.date).to.equal(testMoment);
  });

  it('renders with same date number from props', function () {
    var dayFormat = day.getPropOrCtx('dayFormat')
    dayNode = day.getDOMNode();
    expect(dayNode.innerText).to.equal(testMoment.format(dayFormat));
  });

  it('renders with expected className', function () {
    dayNode = day.getDOMNode();

    expect(dayNode.className).to.include(day.className());
  });

  it('renders a body as a child', function () {
    dayNode = day.getDOMNode();

    var childBodyNode = _.findWhere(dayNode.childNodes, function(child){
      return child.className.indexOf('body') > -1;
    });

    expect(childBodyNode).to.not.be.undefined;
    expect(childBodyNode.tagName).to.equal('SPAN');
    expect(childBodyNode.innerText).to.equal(testMoment.date().toString());
  });

  it('does not render a header', function () {
    dayNode = day.getDOMNode();

    var childBodyNode = _.findWhere(dayNode.childNodes, function(child){
      return child.className.indexOf('header') > -1;
    });

    expect(childBodyNode).to.be.undefined;
  });

  it('does not render an agenda', function () {
    dayNode = day.getDOMNode();

    var childBodyNode = _.findWhere(dayNode.childNodes, function(child){
      return child.className.indexOf('agenda') > -1;
    });

    expect(childBodyNode).to.be.undefined;
  });

});

describe('Day component with agenda, header, classes, and modifiers', function () {

  var testMoment = moment();
  var day;

  beforeEach(function(){
    day = React.addons.TestUtils.renderIntoDocument(<Day
      date={testMoment}
      dayHeader={true}
      dayAgenda={true}
      classes={{foo: true}}
      modifiers={{bar: true}}>
        <p>Have a great day</p>
      </Day>);
  });

  afterEach(function(){
    day = null;
  });


  it('does render an agenda', function () {
    dayNode = day.getDOMNode();

    var childBodyNode = _.findWhere(dayNode.childNodes, function(child){
      return child.className.indexOf('agenda') > -1;
    });

    expect(childBodyNode).to.not.be.undefined;
  });


  it('does render a header', function () {

    var dayHeaderFormat = day.getPropOrCtx('dayHeaderFormat')
    dayNode = day.getDOMNode();

    var childBodyNode = _.findWhere(dayNode.childNodes, function(child){
      return child.className.indexOf('header') > -1;
    });

    expect(childBodyNode).to.not.be.undefined;
    expect(childBodyNode.innerText).to.equal(testMoment.format(dayHeaderFormat));
  });

});
