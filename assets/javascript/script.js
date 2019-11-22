// TODO: get user lat and long.
//       use lat and long to get cuisine types in city or pre defined radius
//       use cusine type and lat/long to generate list of places
//       display places dynamicaly in cards with small amount of info
//       if card is clicked launch modal with more detailed info
//       add modal if user declines location services saying 'we need your location to hekp you decide'
//       
//       ???????????

// getting user lat and long 
  navigator.geolocation.getCurrentPosition(
    // Success callback
    function(position) {
        let userLat = position.coords.latitude;
        let userLong = position.coords.longitude;
        buildApiUrl(userLat, userLong);
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
function buildApiUrl(userLat, userLong){
    // building zomato api call
    // let miles = 10;
    // let radius = miles * 1609.34;
    // console.log(radius);
    let userCuisine = '25, 100';
    let queryUrl = "https://developers.zomato.com/api/v2.1/search?lat=" + userLat + '&lon=' + userLong + '&cuisines=' + userCuisine + '&sort=rating&order=desc';
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: {"user-key": "a0916e41597909e8faa9dff1a09e8971"},
        dataType: "json",
    }).then(function(response){
        console.log(response);
    })
}
