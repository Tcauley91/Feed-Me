// Hide home content on click function

$("#stayInImg").on("click", function (hide) {
  $("#stayInImg").hide();
  $("#goingOutImg").hide();
  $("#h3").hide();
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
  let apiKey = "1bc689dd8d404710b20636ab06a5be1c";
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

      //   pinpoint response wanted

      response.results.forEach(results => {

        console.log(results.title);
        console.log(results.id);
        console.log(results.readyInMinutes);


        // assign new div and add content in callout

        let newDiv = $("<div>").addClass("callout");
        let title = $("<h5>").text("Title: " + results.title);
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

            document.getElementById('nutInfo').innerHTML = response;
            $("#nutInfo").append($("#searchBTN").addClass("button"));
            $(Modal1).foundation("open");

            $("#searchBTN").on("click", function (event) {
              event.preventDefault();

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

                  $("#nutInfo2").append(list).append(steps);
                  $(Modal1).foundation("open");
                });
              });
            });
          });
        });
      });
    });
});

