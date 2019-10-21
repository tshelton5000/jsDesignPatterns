//command pattern promotes loose coupling of objects
//in this case, a command object allows its methods to be called, but if the underlying
//API behind those methods changes, reconfiguration to that API can happen at this 
//central command object, rather than at all of the referencing objects

let carManager = (function(){
 
  var privateApi = {
 
    // request information
    requestInfo: function( model, id ){
      return "The information for " + model + " with ID " + id + " is foobar";
    },
 
    // purchase the car
    buyVehicle: function( model, id ){
      return "You have successfully purchased Item " + id + ", a " + model;
    },
 
    // arrange a viewing
    arrangeViewing: function( model, id ){
      return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
    }
 
  };

  return {
    execute: function ( name ) {
      return privateApi[name] && privateApi[name].apply( this, [].slice.call(arguments, 1) );
    }
  };
})();

console.log(carManager.execute( "arrangeViewing", "Ferrari", "14523" ));
console.log(carManager.execute( "requestInfo", "Ford Mondeo", "54323" ));
console.log(carManager.execute( "requestInfo", "Ford Escort", "34232" ));
console.log(carManager.execute( "buyVehicle", "Ford Escort", "34232" ));

