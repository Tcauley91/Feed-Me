$(document).foundation()
// TODO: 
//       
//       use cusine type and lat/long to generate list of places
//       display places dynamicaly in cards with small amount of info
//       if card is clicked launch modal with more detailed info
//       
//      
//       ???????????
document.getElementById('homeBtn').addEventListener('click', () => {
    document.location.reload(true)
});
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
            console.log(userLat, userLong);
            let queryUrl = `https://developers.zomato.com/api/v2.1/geocode?lat=${userLat}&lon=${userLong}`
            $.ajax({
                url: queryUrl,
                method: "GET",
                headers: { "user-key": "a0916e41597909e8faa9dff1a09e8971" },
                dataType: "json",
            }).then(function (response) {
                console.log(response);
                cityID = response.location.city_id;
                console.log(cityID);
                cuisineCat(cityID);
                document.getElementById('sortSelect').add(new Option('Distance', 'real_distance'));
                document.getElementById('sortSelect').add(new Option('Populartiy', 'rating'));
                document.getElementById('goingOutImg').classList.add('hide')
                document.getElementById('stayInImg').classList.add('hide')
                document.querySelector('h3').classList.add('hide');
                document.getElementById('contentHeader').innerText = 'What are you in the mood for?';
                document.getElementById('catOptions').classList.remove('hide');
            })
        },
        // Optional error callback
        function (error) {
            console.log(error);
            if (error.code === 1) {
                document.getElementById('modalPic').classList.add('hide');
                document.getElementById('modalH').innerText = 'Uh oh';
                document.getElementById('modalLead').innerText = 'We need your loaction to show you nearby restaurants. Please close this window and try again.';
                $(Modal1).foundation('open');
            } else {
                document.getElementById('modalPic').classList.add('hide');
                document.getElementById('modalH').innerText = 'Uh oh';
                document.getElementById('modalLead').innerText = 'Something went wrong. Please close this window and try again.';
                $(Modal1).foundation('open');
            }
        }
    )
});
$(document).ready(function () {
    $(document).ajaxStart(function () {
        document.getElementById('goingOutImg').classList.add('hide')
        document.getElementById('stayInImg').classList.add('hide')
        document.querySelector('h3').classList.add('hide');
        document.getElementById('contentHeader').classList.add('hide');
        $(".loader").show();
    }).ajaxStop(function () {
        document.getElementById('contentHeader').classList.remove('hide');
        $(".loader").hide();
    });
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
        console.log(response);
        document.getElementById('contentHeader').innerText = 'Here are some suggestions.';
        let newD;
        // create cards to display places
        response.restaurants.forEach(function (i) {
            newD = $('<div>').addClass('callout');
            let newH = $('<h3>').html('<strong>' + i.restaurant.name + '</strong>');
            let newP;
            let newR;
            if (parseInt(i.restaurant.user_rating.aggregate_rating) == 0) {
                newR = 'No Rating'
            } else {
                newR = i.restaurant.user_rating.aggregate_rating;
            }
            if (parseInt(i.restaurant.price_range) === 1) {
                newP = '$'
            } else if (parseInt(i.restaurant.price_range) === 2) {
                newP = '$$'
            } else if (parseInt(i.restaurant.price_range) === 3) {
                newP = '$$$'
            } else if (parseInt(i.restaurant.price_range) === 4) {
                newP = '$$$$'
            } else if (parseInt(i.restaurant.price_range) === 5) {
                newP = '$$$$$'
            } else {
                newP = 'No price data'
            }
            let newI = $('<p>').html('Rated: ' + newR + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + newP.fontcolor('#095910'));
            newD.append(newH, newI);
            $('#imgContainer').append(newD);
            newD.on('click', function () {
                joshShutTheFuncUp(i);
            })
        })
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
        for (let i = 0; i < response.cuisines.length; i++) {
            document.getElementById('catSelect').add(new Option(response.cuisines[i].cuisine.cuisine_name, response.cuisines[i].cuisine.cuisine_id));
        }
    })
}
function joshShutTheFuncUp(i) {
    document.getElementById('modalH').classList.add('text-center');
    document.getElementById('modalH').innerHTML = i.restaurant.name.bold();
    document.getElementById('modalLead').innerText = '';
    document.getElementById('nutInfo').innerHTML = '<strong>Hours: </strong>' + i.restaurant.timings;
    document.getElementById('modalPic').classList.remove('hide');
    document.getElementById('modalPic').classList.add('float-left');
    if (i.restaurant.thumb === "") {
        $('#modalPic').attr('src', 'assets/images/no-image-available.jpg');
    } else {
        $('#modalPic').attr('src', i.restaurant.thumb);
    }
    $(Modal1).foundation('open');
}
