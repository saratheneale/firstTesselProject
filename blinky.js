// Import the interface to Tessel hardware
var tessel = require('tessel');

// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
var led1 = tessel.led[0].output(1); //green and blue 1 and 0
var led2 = tessel.led[1].output(0);

//0 1 1 0 green and blue alt blink.
// 0 0 1 0 green and blue sync blink
//1 1 1 0 blue blinks super fast.
// .led refers to the led physical light on the board
// output can only have 0 or 1. (digital pins are binary)

setInterval(function () {
    //console.log("I'm blinking! (Press CTRL + C to stop)");
    // Toggle the led states
    led1.toggle();
    led2.toggle();
}, 100);
