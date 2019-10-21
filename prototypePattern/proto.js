// var myCar = {
 
//   name: "Ford Escort",
 
//   drive: function () {
//     console.log( "Weeee. I'm driving!" );
//   },
 
//   panic: function () {
//     console.log( "Wait. How do you stop this thing?" );
//   }
 
// };
 
// // Use Object.create to instantiate a new car
// var yourCar = Object.create( myCar );
 
// // Now we can see that one is a prototype of the other
// console.log( yourCar.name );

// var vehicle = {
//   getModel: function () {
//     console.log( "The model of this vehicle is.." + this.model );
//   }
// };
 
// var car = Object.create(vehicle, {
 
//   "id": {
//     value: 1,
//     // writable:false, configurable:false by default
//     enumerable: true
//   },
 
//   "model": {
//     value: "Ford",
//     enumerable: true
//   }
 
// });

// console.log(car);

// for (let prop in car){
//   if (car.hasOwnProperty(prop)){
//     console.log(prop);
//   }
// }

var vehiclePrototype = {
 
  init: function ( carModel ) {
    this.model = carModel;
  },
 
  getModel: function () {
    console.log( "The model of this vehicle is.." + this.model);
  }
};
 
 
function vehicle( model ) {
 
  // function F() {};
  // F.prototype = vehiclePrototype;
  
  // var f = new F();
 
  var f = begot(vehiclePrototype);

  f.init( model );
  return f;
 
}
 
// var car = vehicle( "Ford Escort" );
// car.getModel();

var beget = (function () {
 
  function F() {}

  return function ( proto ) {
      F.prototype = proto;
      return new F();
  };
})();

function begot(proto){
  function F(){}
  F.prototype = proto;
  return new F();
}

let newCar = vehicle('Ford Focus');
let oldCar = vehicle('Chevy Saturn');
console.log(newCar.__proto__ === oldCar.__proto__);