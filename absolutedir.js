
var tessel = require('tessel');
var accel = require('accel-mma84').use(tessel.port['A']);

//servo setup
var servolib = require('servo-pca9685');
var servo = servolib.use(tessel.port['B']);
var servo1 = 1; // We have a servo plugged in at position 1
//servo pos
var position = 0;

//Set absolute direction
var dir = 0;
var prevX = 0;

//We only want to read accelorameter every second
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

// Initialize the accelerometer.
accel.on('ready', function (event) {
    // Stream accelerometer data
  accel.on('data', throttle(function (xyz) {

    //The Good Stuff


    if(prevX != xyz[0].toFixed(2)){

      console.log('x:', xyz[0].toFixed(2),
      'y:', xyz[1].toFixed(2),
      'z:', xyz[2].toFixed(2));

      //Move it move it

      //if x change is more than 36, increment by the change modulo 36 * .1
      var diff = parseInt(prevX)-parseInt(xyz[0].toFixed(2))
      if(diff < 0){
        diff = diff*-1
      }
      if( diff > .35){

        var num = diff%36 * .1
        if(num < 0){
          num = num*(-1)
        }

        position += num
        if (position > 1) {
          position = 0; // Reset servo position
      }

      }
      servo.move(servo1, position);

      prevX = xyz[0].toFixed(2)

    }



  }, 1000)); //end accel.on data

}); // end on ready

accel.on('error', function(err){
  console.log('Error:', err);
});
