  // Hide home content on click function
  $("#stayInImg").on("click", function (hide) {
  $("#stayInImg").hide();
  $("#goingOutImg").hide();
  $("h3").hide();
  $("#contentHeader").text("What are you in the mood for?");
  $("#showDiv").removeClass('hide');
});
// gather search query based on user input

$("#feedMe").on("click", function () {
  $("#showDiv").hide();
  let cuisine = $(".cuisineInput").val();
  let allergy = $(".allergyInput").val();
  let diet = $(".dietInput").val();

  //need If/else statement for when response/results are returning 0 - modal or something similar that will prompt user to go back to previous screen and re input search parameters. OR back button that returns to home page.
  // // API Key

  let apiKey = "6c135f5bf8784ee3aaf4abfcb4f56940";

  // // queryURL with search parameters and APPID

  let queryURL = "https://api.spoonacular.com/recipes/search?&query=" + cuisine + "&allergy=" + allergy + "&diet=" + diet + "&apiKey=" + apiKey;
  
  // ajax function for retreiving information

  $.ajax({
    url: queryURL,
    method: "GET",
    ContentType: "application/json"
  })
    .then(function (response) {
      console.log(response);
      console.log(response.totalResults);

      // function for when response results  is 0 - pop up modal.

      if(response.totalResults === 0){
        $("#modalH").text("Oops!");
        $("#modalLead").text("We coundln't find any recipes for that selection. Please click Home and search again.");
        $("#modalPic").hide();
        $(Modal1).foundation("open");
      
      }else{

      //   pinpoint response wanted

      response.results.forEach(results => {
        console.log(results.title);
        console.log(results.id);
        console.log(results.readyInMinutes);

       

        // assign new div and add content in callout
        $("#contentHeader").text("Here are some suggestions.")
        let newDiv = $("<div>").addClass("callout");
        let title = $("<strong><h5><strong>").text("Title: " + results.title);
        let timeServings = $("<p>").text("Cook time: " + results.readyInMinutes + " Servings: " + results.servings);
        newDiv.append(title, timeServings);
        $("#imgContainer").append(newDiv);
        

        newDiv.on("click", function (event) {
          event.preventDefault();

          console.log(results.id);

          let id = results.id;
          let queryURL2 = "https://api.spoonacular.com/recipes/" + id + "/ingredientWidget?&apiKey=" + apiKey + "&defaultCss=true";
          $.ajax({
            url: queryURL2,
            method: "GET",
            Accept: "text/html",
            ContentType: "application/json"
          }).then(function (response) {

            console.log(response);

            $("#modalPic").hide();
           

            document.getElementById('nutInfo').innerHTML = response;
            $('.spoonacular-ingredients-menu').hide();
            $(Modal1).foundation("open");

            let queryURL3 = "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?&apiKey=" + apiKey + "&stepBreakdown=true";
            $.ajax({
              url: queryURL3,
              method: "GET",
              ContentType: "application/json",
            }).then(function (response) {

              console.log(response);
              console.log(response[0].steps);
              console.log(response[0].steps.step);

              let list = $("ul");
              response[0].steps.forEach(step => {
                let steps = $("<li>").text(step.step);

                // console.log(response[0].steps.step);

                console.log(step);
                
                $("#nutInfo").append(list).append(steps);
              
              });
            });
          });
        });
    })};
    });
  });
