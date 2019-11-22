// TODO: get user lat and long.
//       use lat and long to get cuisine types in city or pre defined radius
//       use cusine type and lat/long to generate list of places
//       display places dynamicaly in cards with small amount of info
//       if card is clicked launch modal with more detailed info
//       ???????????

// getting user lat and long 
  navigator.geolocation.getCurrentPosition(
    // Success callback
    function(position) {
      console.log(position);
      // building zomato api call to 
    let userLat = position.coords.latitude;
    let userLong = position.coords.longitude;
    let userCuisine = 'american'
    let queryUrl = "https://developers.zomato.com/api/v2.1/search?lat=" + userLat + '& lon=' + userLong + 'cuisines=' + userCuisine;
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {"user-key": "a0916e41597909e8faa9dff1a09e8971"},
        dataType: "json",
    }).then(function(response){
        console.log(response);
    })
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
