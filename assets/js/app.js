$(document).foundation();
// TODO: 
//       
//       use cusine type and lat/long to generate list of places
//       display places dynamicaly in cards with small amount of info
//       if card is clicked launch modal with more detailed info
//       
//       
//       ???????????
let userLat;
let userLong;
let cityID;
// onclick for going out to eat option
document.getElementById('goingOutImg').addEventListener('click', () => {
    // getting user lat and long 
    navigator.geolocation.getCurrentPosition(
        // Success callback
        function (position) {
            userLat = position.coords.latitude;
            userLong = position.coords.longitude;
            document.getElementById('goingOutImg').classList.add('hide')
            document.getElementById('stayInImg').classList.add('hide')
            document.querySelector('h3').classList.add('hide');
            document.getElementById('contentHeader').innerText = 'What are you in the mood for?';
            
            let queryUrl = `https://developers.zomato.com/api/v2.1/geocode?lat=${userLat}&lon=${userLong}`
            $.ajax({
                url: queryUrl,
                method: "GET",
                headers: { "user-key": "a0916e41597909e8faa9dff1a09e8971" },
                dataType: "json",
            }).then(function (response) {
                cityID = response.location.city_id;
                cuisineCat(cityID);
                document.getElementById('catOptions').classList.remove('hide');
                document.getElementById('sortSelect').add(new Option('Distance', 'real_distance'));
                document.getElementById('sortSelect').add(new Option('Populartiy', 'rating'));
            })
        },
        // Optional error callback
        function (error) {
            if (error.code === 1) {
                document.getElementById('modalH').innerText = 'Uh oh';
                document.getElementById('modalLead').innerText = 'We need your loaction to show you nearby restaurants. Please close this window and try again.';
                $(Modal1).foundation('open');
            } else {
                document.getElementById('modalH').innerText = 'Uh oh';
                document.getElementById('modalLead').innerText = 'Something went wrong. Please close this window and try again.';
                $(Modal1).foundation('open');
            }
        }
    )
});
// on click for search button 
document.getElementById('searchBTN').addEventListener('click', () => {
    let order;
    let userCuisine = document.getElementById('catSelect').value;
    let userSort = document.getElementById('sortSelect').value;
    if (userSort === 'rating') {
        order = 'desc';
    } else {
        order = 'asc';
    }
    if (!!userCuisine && !!userSort) {
        renderPlaces(userLat, userLong, userCuisine, userSort, order);
    }
})
// api call get information about restaurants to be displayed later
function renderPlaces(userLat, userLong, userCuisine, userSort, order) {
    let queryUrl = `https://developers.zomato.com/api/v2.1/search?lat=${userLat}&lon=${userLong}&cuisines=${userCuisine}&sort=${userSort}&order=${order}`;
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: { "user-key": "a0916e41597909e8faa9dff1a09e8971" },
        dataType: "json",
    }).then(function (response) {
        // create cards to dusplay places
        console.log(response)
        response.restaurants.forEach(function(i) {
            if(parseInt(i.restaurant.price_range) < 1){
                newP = 'No price data';
            }else if(parseInt(i.restaurant.price_range) === 1){
                newP = '$';
            }else if(parseInt(i.restaurant.price_range) === 2){
                newP = '$$';
            }else if(parseInt(i.restaurant.price_range) === 3){
                newP = '$$$';
            }else if(parseInt(i.restaurant.price_range) === 4){
                newP = '$$$$';
            }else{
                newP = '$$$$$';
            }
            console.log('name ' + i.restaurant.name);
            let newD = $('<div>').addClass('callout');
            let newH = $("<h5>").text(i.restaurant.name);
            let newR = $('<p>').text('Rated ' + i.restaurant.user_rating.aggregate_rating + '  Price ' + newP);
            newD.append(newH, newR);
            $("#imgContainer").append(newD);
        });
    })
    document.getElementById('catOptions').classList.add('hide');
}
// api call gets all food categories in the area
// creates options for the dropdown
function cuisineCat(cityID) {
    let queryUrl = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${cityID}`;
    $.ajax({
        url: queryUrl,
        method: "GET",
        headers: { "user-key": "a0916e41597909e8faa9dff1a09e8971" },
        dataType: "json",
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.cuisines.length; i++) {
            document.getElementById('catSelect').add(new Option(response.cuisines[i].cuisine.cuisine_name, response.cuisines[i].cuisine.cuisine_id));
        }
    })
}