$(document).foundation()

// Hide home content on click function

$("#stayInImg").on("click", function(hide){
$("#test-eq").hide() + $("#food-type").show();
});



// gather search query based on user input

    $("#feedMe").on("click",function(){

    let cuisine = $(".cuisineInput").val();
    let allergy = $(".allergyInput").val();
    let diet = $(".dietInput").val();

    // // API Key
     let apiKey = "1bc689dd8d404710b20636ab06a5be1c";
    // // queryURL with search parameters and APPID
     let queryURL = "https://api.spoonacular.com/recipes/search?&query=" + cuisine + allergy + diet + "&apiKey=" + apiKey; 
    
    // ajax function for retreiving information
      $.ajax({
        url: queryURL,
        method: "GET",
        ContentType: "application/json"
      })
      .then(function(response){



      console.log(response);


    });
    });