$(document).foundation()
// TODO: 
//       use lat and long to get cuisine types in city or pre defined radius
//       use cusine type and lat/long to generate list of places
//       display places dynamicaly in cards with small amount of info
//       if card is clicked launch modal with more detailed info
//       
//       
//       ???????????
document.getElementById('goingOutImg').addEventListener('click', ()=> {
    // getting user lat and long 
      navigator.geolocation.getCurrentPosition(
        // Success callback
            function(position) {
                let userLat = position.coords.latitude;
                let userLong = position.coords.longitude;
                buildApiUrl(userLat, userLong);
                console.log(userLat, userLong);
            },
            // Optional error callback
            function(error){
                console.log(error);
                if(error.code === 1){
                    deniedmodal();
                }else{
                    wentWrongModal();
                }
            }
        )
    });
    function deniedmodal(){
        document.getElementById('modalH').innerText = 'Uh oh';
        document.getElementById('modalLead').innerText = 'We need your loaction to show you nearby restaurants. Please close this window and try again.';
        $(Modal1).foundation('open');               
    }
    function wentWrongModal(){
        document.getElementById('modalH').innerText = 'Uh oh';
        document.getElementById('modalLead').innerText = 'Something went wrong. Please close this window and try again.';
        $(Modal1).foundation('open');
    }
    function buildApiUrl(userLat, userLong){
        //building zomato api call
        let miles = 1;
        let radius = miles * 1609.34;
        console.log(radius);
        let userCuisine = '25';
        let queryUrl = "https://developers.zomato.com/api/v2.1/search?lat=" + userLat + '&lon=' + userLong + '&cuisines=' + userCuisine + '&radius=' + radius + '&sort=rating&order=desc';
        $.ajax({
            url: queryUrl,  
            method: "GET",
            headers: {"user-key": "a0916e41597909e8faa9dff1a09e8971"},
            dataType: "json",
        }).then(function(response){
            console.log(response);
        })
    }