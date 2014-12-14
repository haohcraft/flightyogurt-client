/**
 * @jsx React.DOM
 */
// From https://github.com/haohcraft/react-sparkline
var React = require('react');
var d3 = require('d3');
var _ = require('underscore');
var DURATION = 1500;

var Sparkline = React.createClass({

	getDefaultProps: function() {
    return {
      className: "Sparkline",
      height: 16,
      strokeColor: '#8E44AD',
      strokeWidth: '0.5px',
      interpolate: 'basis',
      circleDiameter: 1.5,
      circleColor: '#8E44AD',
      data: [],
      dateFieldName: 'date',
      valueFieldName: 'value'
    };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return !_.isEqual(this.props, nextProps);
  },

  componentDidMount: function(prevProps, prevState) {
    return this.renderSparkline();
  },

  componentDidUpdate: function(prevProps, prevState) {
    return this.renderSparkline();
  },
  render: function() {
    return <div className={this.props.className}/>;
  },

  tween: function( b, callback ) {
      return function( a ) {
        var i = d3.interpolateArray( a, b );

        return function( t ) {
          return callback( i ( t ) );
        };
      };
  },
  renderSparkline: function() {
    
    var data
    , lastX
    , lastY
    , line
    , circle
    , svg
    , x
    , y
    , circleContainer
    , details
    , latestPrice
    , xAxis
    , areaWidth;

    data = this.props.data.slice();
    
    if (data.length === 0) {
      svg = d3.select(this.getDOMNode())
            .append('text')
            .attr('class', 'fy-sparkling-note')
            .text("No fares changes yet, click *More* for the current fares.");

    	return;
    } 
    
    if (data && data[0] !== null) {
      d3.select('.fy-sparkling-note').text("");
      data.forEach(function(d) {
         d.changeDate =  d3.time.format.iso.parse(d.changeDate);
      });

     data = _.sortBy(data, function(d) {
        return  d.changeDate.getTime();
      });

     areaWidth = parseInt(d3.select(this.getDOMNode()).style('width'), 10);
      // console.log("Sparkline this.getDOMNode().innerWidth ", areaWidth);
      // debugger;
      // set the horizontal 
      x = d3.scale.linear().domain(d3.extent(data, function(d) {
        return d.changeDate;
      })).range([40,  areaWidth - 40]);

      y = d3.scale.linear().domain(d3.extent(data, function(d) {
        return d.price;
      })).range([this.props.height - 20, 20]);

      // Draw line
      line = d3.svg.line().interpolate(this.props.interpolate).x(function(d, i) {
        return x(d.changeDate);
      }).y(function(d) {
        return y(d.price);
      });

      lastX = x(data[data.length - 1].changeDate);
      lastY = y(data[data.length - 1].price);
      latestPrice = data[data.length - 1].price;

    } 

    svg = d3.select(this.getDOMNode()).append('svg').attr('width', areaWidth).attr('height', this.props.height).append('g');

    svg.append('path')
      .datum(data)
      .attr('class', 'sparkline')
      .style('fill', 'none')
      .style('stroke', this.props.strokeColor)
      .style('stroke-width', this.props.strokeWidth)
      .attr('d', line)
      .call(function() {

        circleContainer = svg.append( 'g' );
        var minPrice = _.min(_.pluck(data, "price"));
          // console.log("minPrice", minPrice);
        data.forEach( function( datum, index ) {
          circleContainer.datum(datum)
            .append('circle')
            .attr('class', 'circle')
            .attr('r', 3)
            .attr('cx', function(d) {
              return x(d.changeDate);
            })
            .attr('cy', function(d) {
              return y(d.price);
            });
          

          circleContainer.append('g')
            .datum(datum)
            .append('text')
            .attr('class', 'price')
            .style('font-size', '14px')
             .attr(
              'transform',
              function(data) {
                var result = 'translate(';
                
                result += x( data.changeDate );
                result += ', ';
                result += y( data.price ) - 5;
                result += ')';
                
                return result;
              }
            )
            .text(function(d) {
              var _minPrice = "";
              if (d.price === minPrice) {
                _minPrice = "$" + d.price;
              }
              return _minPrice;
            });
        });
      });

    svg.append('circle').attr('class', 'sparkcircle')
        .attr('cx', lastX)
        .attr('cy', lastY)
        .attr('fill', this.props.circleColor)
        .attr('stroke', 'none')
        .attr('r', this.props.circleDiameter);

    return svg.append('text').attr('class', 'latestPrice').text(latestPrice);
  }

});

module.exports = Sparkline;