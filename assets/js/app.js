$(document).foundation()
// TODO: get user lat and long.
//       use lat and long to get cuisine types in city or pre defined radius
//       use cusine type and lat/long to generate list of places
//       display places dynamicaly in cards with small amount of info
//       if card is clicked launch modal with more detailed info
//       add modal if user declines location services saying 'we need your location to hekp you decide'
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
        let deniedM = document.getElementById('Modal1');
        //deniedM.style.display = "block";
    //     // let closeBtn = document.querySelector('.close-button');
    //     // closeBtn.onclick = function(){
    //     //     deniedM.style.display = "none"
    //     // } 
    //     // window.onclick = function(event) {
    //     //     console.log(event.target);
    //     //     if (event.target !== deniedM) {
    //     //       deniedM.style.display = "none";
    //     //     }
    //     // }     
          
        
    
    //     // let modalContainer = document.createElement('div');
        
    }
    // function wentWrongModal(){
    //     let modalContainer = document.createElement('div');
    //     modalContainer.classList.add('modal');
    //     let modalContent = document.createElement('div');
    //     modalContent.innerText = 'Oh uh, something went wrong. Please try again.';
    //     modalContainer.append(modalContent);
    //     document.body.append(modalContainer);
    
    //     window.onclick = function(event) {
    //         if (event.target !== modalContainer) {
    //           modalContainer.style.display = "none";
    //         }
    //     }
    // }
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