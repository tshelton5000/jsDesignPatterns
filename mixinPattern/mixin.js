//my understanding of a mixin is that it's distinct from class inheritance.  mixins take
//a base class, add functionality, and return a new 'mixed' class.  class inheritance 
//doesn't include this 'higher order' design.  class inheritance mixes functionality to base
//classes in a parent-child relationship.  therefore, mixins can add their functionality to classes
//after the base class has been defined, while inheritance depends upon a more rigid, tree-like
//architecture to define the additional functionality.  

var myMixins = {
 
  moveUp: function(){
    console.log( "move up" );
  },
 
  moveDown: function(){
    console.log( "move down" );
  },
 
  stop: function(){
    console.log( "stop! in the name of love!" );
  }
 
};

// A skeleton carAnimator constructor
function CarAnimator(){
  this.moveLeft = function(){
    console.log( "move left" );
  };
}
 
// A skeleton personAnimator constructor
function PersonAnimator(){
  this.moveRandomly = function(){ /*..*/ };
}
 
// Extend both constructors with our Mixin
_.extend( CarAnimator.prototype, myMixins );
_.extend( PersonAnimator.prototype, myMixins );
 
// Create a new instance of carAnimator
var myAnimator = new CarAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();
 
// Outputs:
// move left
// move down
// stop! in the name of love!

// Define a simple Car constructor
var Car = function ( settings ) {
 
  this.model = settings.model || "no model provided";
  this.color = settings.color || "no colour provided";

};

// Mixin
var Mixin = function () {};

Mixin.prototype = {

  driveForward: function () {
      console.log( "drive forward" );
  },

  driveBackward: function () {
      console.log( "drive backward" );
  },

  driveSideways: function () {
      console.log( "drive sideways" );
  }

};


// Extend an existing object with a method from another
function augment( receivingClass, givingClass ) {

  // only provide certain methods
  if ( arguments[2] ) {
      for ( var i = 2, len = arguments.length; i < len; i++ ) {
          receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
      }
  }
  // provide all methods
  else {
      for ( var methodName in givingClass.prototype ) {

          // check to make sure the receiving class doesn't
          // have a method of the same name as the one currently
          // being processed
          if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
              receivingClass.prototype[methodName] = givingClass.prototype[methodName];
          }

          // Alternatively (check prototype chain as well):
          // if ( !receivingClass.prototype[methodName] ) {
          // receivingClass.prototype[methodName] = givingClass.prototype[methodName];
          // }
      }
  }
}


// Augment the Car constructor to include "driveForward" and "driveBackward"
augment( Car, Mixin, "driveForward", "driveBackward" );

// Create a new Car
var myCar = new Car({
  model: "Ford Escort",
  color: "blue"
});

// Test to make sure we now have access to the methods
myCar.driveForward();
myCar.driveBackward();

// Outputs:
// drive forward
// drive backward

// We can also augment Car to include all functions from our mixin
// by not explicitly listing a selection of them
augment( Car, Mixin );

var mySportsCar = new Car({
  model: "Porsche",
  color: "red"
});

mySportsCar.driveSideways();

// Outputs:
// drive sideways