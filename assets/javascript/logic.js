
// select ingredients from categories, remove ingredients from list, add recipes to favourites list
// return to ingredient selection menu, user accounts/save data with Firebase, second API, clean up, README, deploy, presentation

var userIngrList = [];
var ingrTabNormal = true;
var tileNormal = true;

$('.tile').on('click', function() {
    if (tileNormal === true) {
        $(this).animate({
            'width': '100%',
            'height': '400px'
        }, 1000);
        $('.tile').removeClass('d-flex').addClass('d-none');
        $(this).removeClass('d-none').addClass('d-flex');
        tileNormal = false;
    }
    else if (tileNormal === false) {
        $(this).animate({
            'width': '200px',
            'height': '200px'
        });
        setTimeout(function() {
            $('.tile').removeClass('d-none').addClass('d-flex');
        }, 500);
        tileNormal = true;
    }
});

$('#user-ingr').on('click', function() {
    if (ingrTabNormal === true) {
        $(this).animate({
            'height': '400px'
        }, 1000);
        setTimeout(function() {
            $('#ingr-list').removeClass('d-none').addClass('d-flex flex-column justify-content-center');
        }, 500);
        ingrTabNormal = false;
    }
    else if (ingrTabNormal === false) {
        $(this).animate({
            'height': '56px'
        });
        $('#ingr-list').addClass('d-none').removeClass('d-flex');
        ingrTabNormal = true;
    }
});

$('#search-area').on('click', '#search-button', function() {
    event.preventDefault();
    var temp = $('#search-bar').val();
    var item = $('<h6 class="mx-auto">').text(temp.toLowerCase());
    $('#ingr-list').append(item);
    userIngrList.push(item.text());
    console.log(userIngrList);
  });
  
  // Recipe Search API
  
  var recipeAppID = 'f5710785';
  var recipeAPIkey = '8392091036762a8454001f22166942cf';
  
  $('.container-fluid').on('click', '#recipe-button', function() {
    event.preventDefault();
    $('#recipe-list').empty();
    var recipeSearch = '';
    for (var i = 0; i < userIngrList.length; i++) {
      var temp = userIngrList[i] + ' '
      recipeSearch += temp;
    }
    recipeSearch = encodeURIComponent(recipeSearch.trim());
    console.log(recipeSearch);
    var recipeQuery = 'https://api.edamam.com/search?app_id=' + recipeAppID + '&app_key=' + recipeAPIkey + '&q=' + recipeSearch;
    $.ajax({
      url: recipeQuery,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      console.log(recipeQuery);
      populateRecipes(response);
    });
  });

function populateRecipes(response) {
    $('#food-tiles').addClass('d-none');
    $('#recipe-tiles').removeClass('d-none');
    for (var i = 0; i < response.hits.length; i++) {
        var recipeDiv = $('<div>').addClass('recipe bg bg-warning p-3 text-white mb-3 d-flex flex-column');
        var recipeTitle = $('<h5>').text(response.hits[i].recipe.label).addClass('mx-auto mb-2');
        var recipeLink = $('<a>').attr('href', response.hits[i].recipe.url).addClass('mx-auto');
        var recipeImg = $('<img>').attr('src', response.hits[i].recipe.image).addClass('d-block mx-auto mb-2');
        recipeLink.append(recipeImg);
        var recipeIngr = $('<h7>').text(response.hits[i].recipe.ingredientLines).addClass('mx-auto mb-2');
        recipeDiv.append(recipeTitle, recipeLink, recipeIngr);
        $('#recipe-list').append(recipeDiv);
    }
};