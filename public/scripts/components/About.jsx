/**
 * @jsx React.DOM
 */

var React = require('react');
var md = require("node-markdown").Markdown;

require('styles/about.less');
var AboutPage = React.createClass({

	displayName: "AboutPage",

	getInitialState: function() {
		return {
			markdownFile: {} 
		};
	},
	componentDidMount: function() {
	},

	render: function() {
		var p1 = md("**FlightYogurt** is a [YO](http://www.justyo.co/) app to watch your flight price 24/7 before your booking for free. Once the $ drops below your setting you will get YO ’d!");
		var p2 = md("In the past September two weeks before my trip from Boston to San Francisco, I was searching a cheap flight for that. Luckily enough, I found a flight which was around **$80** cheaper than the one I found the day before. Woohoo, I got a BOS-SFO roundtrip for just 288 bucks! So I was wondering if there is some tool can help people automatically check the fares without tedious typing and refreshing.");
		var p3 = md("[My final RT ticket from BOS to SFO](https://pbs.twimg.com/media/B2noOfOIEAA4AW2.jpg) ");
		var p4 = md("Also I had been told by a friend who works at a local travel agency in Boston that the travel agencies have a special channel to access cheaper tickets since they have a direct contract with the airlines. And they can hold the tickets without paying until the last few days. So once could hand off their holding cheap tickets, we could find a cheaper tickets on the OTAs, like priceline and expedia. This is a case especially for international tickets.");
		var p5 = md("So here we go. For your upcoming holiday tickets, you can try to use **FlightYogurt** to watch them.");
		var p6 = md("Travelers and cheap flight hunter. ");
		var p7 = md("[@FlightYogurt](https://twitter.com/FlightYogurt)");

		return (
			<div className="fy-about container">
				<h5>Intro</h5>
				 <div
				  className="content"
				  dangerouslySetInnerHTML={{
				    __html: p1
				  }}
				/>
				<h5>Story</h5>
				 <div
				  className="content"
				  dangerouslySetInnerHTML={{
				    __html: p2
				  }}
				/>
				 <div
				  className="content"
				  dangerouslySetInnerHTML={{
				    __html: p3
				  }}
				/>
				 <div
				  className="content"
				  dangerouslySetInnerHTML={{
				    __html: p4
				  }}
				/>

				 <div
				  className="content"
				  dangerouslySetInnerHTML={{
				    __html: p5
				  }}
				/>

				<h5>Who would like this</h5>
				 <div
				  className="content"
				  dangerouslySetInnerHTML={{
				    __html: p6
				  }}
				/>

				<h5>Team</h5>
				 <div
				  className="content"
				  dangerouslySetInnerHTML={{
				    __html: p7
				  }}
				/>

			</div>
		);
	}

});

module.exports = AboutPage;