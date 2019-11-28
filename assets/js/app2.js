// Hide home content on click function

$("#stayInImg").on("click", function(hide){
$("#stayInImg").hide();
$("#goingOutImg").hide();
$("#h3").hide();
$("#showDiv").removeClass('hide');
});



// gather search query based on user input

    $("#feedMe").on("click",function(){
    $("#showDiv").hide();
    let cuisine = $(".cuisineInput").val();
    let allergy = $(".allergyInput").val();
    let diet = $(".dietInput").val();

    // // API Key
     let apiKey = "1bc689dd8d404710b20636ab06a5be1c";
    // // queryURL with search parameters and APPID
     let queryURL = "https://api.spoonacular.com/recipes/search?&query=" + cuisine + "&allergy=" + allergy + "&diet=" + diet + "&apiKey=" + apiKey; 
    
    // ajax function for retreiving information
      $.ajax({
        url: queryURL,
        method: "GET",
        ContentType: "application/json"
      })
      .then(function(response){
      console.log(response);

    //   pinpoint response wanted

      response.results.forEach(results => {

        console.log(results.title);
        console.log(results.id);
        console.log(results.readyInMinutes);


        // attempt to dump array into HTML
        
        // let newDiv = $("<div>").addClass("callout");

        let newDiv = $("<div>").addClass("callout")
        let title = $("<h5>").text("Title: " + results.title);
        let timeServings = $("<p>").text("Cook time: " + results.readyInMinutes + " Servings: " + results.servings);

        newDiv.append(title, timeServings);
        
        $("#imgContainer").append(newDiv)

        // ("Title: " + title).append(" Cook time: " + readyInMinutes + " Minutes");


        

    });

   


    });

    // Grab recipe, prep time & decscripton and display them in $("showDiv") as summary. Via title, cook time, sertvings OR have thumbnail image displayed. Grab selected recipe by "ID" and insert id into - https://api.spoonacular.com/recipes/{id}/information?includeNutrition=true/false- if I want to display nutrition info - new Query URL will have to have new ajax call. to call the new link above. Then display whole recipe after specific card(recipe) is called. example call:
    // results: Array(10)
    // 0: {id: 532727, title: "Cajun Black Beans and Rice", readyInMinutes: 30, servings: 4, image: "Cajun-Black-Beans-and-Rice-532727.jpg", …}
    // 1: {id: 243851, title: "Cajun Courtbouillon", readyInMinutes: 50, servings: 6, image: "Cajun-Courtbouillon-243851.jpg", …}
    // 2:
    // id: 549848
    // image: "30-minute-healthy-cajun-chicken-and-rice-549848.jpg"
    // imageUrls: ["30-minute-healthy-cajun-chicken-and-rice-549848.jpg"]
    // readyInMinutes: 30
    // servings: 4
    // title: "30 Minute Healthy Cajun Chicken and Rice"



    });