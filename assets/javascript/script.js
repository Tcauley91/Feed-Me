// building zomato api call
// let queryUrl = 
if (navigator.geolocation) {
    // geolocation is available
    console.log('working');
  } 
  else {
    // geolocation is not supported
    console.log('not working');
  }
  navigator.geolocation.getCurrentPosition(

    // Success callback
    function(position) {
      console.log(position);
        /*
        position is an object containing various information about
        the acquired device location:

        position = {
            coords: {
                latitude - Geographical latitude in decimal degrees.
                longitude - Geographical longitude in decimal degrees. 
                altitude - Height in meters relative to sea level.
                accuracy - Possible error margin for the coordinates in meters. 
                altitudeAccuracy - Possible error margin for the altitude in meters. 
                heading - The direction of the device in degrees relative to north. 
                speed - The velocity of the device in meters per second.
            }
            timestamp - The time at which the location was retrieved.
        }
        */

    },

    // Optional error callback
    function(error){

        /* 
        In the error object is stored the reason for the failed attempt:

        error = {
            code - Error code representing the type of error 
                    1 - PERMISSION_DENIED
                    2 - POSITION_UNAVAILABLE
                    3 - TIMEOUT

            message - Details about the error in human-readable format.
        }
        */

    }
);