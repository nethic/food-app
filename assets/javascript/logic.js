
// remove ingredients from list, add recipes to favourites list
// user accounts/save data with Firebase, second API, clean up, README, presentation

var fruits = ['apple', 'kiwi', 'pear', 'orange', 'strawberry', 'grape', 'banana', 'pineapple', 'blueberry', 'raspberry', 'lemon', 'peach', 'mango', 'cherry', 'melon', 'lime', 'avocado', 'apricot', 'blackberry', 'grapefruit', 'coconut'];
var vegetables = ['broccoli', 'tomato', 'lettuce', 'potato', 'cabbage', 'spinach', 'cucumber', 'lettuce', 'onion', 'eggplant', 'cauliflower', 'bell pepper', 'celery', 'peas', 'garlic', 'carrot', 'zucchini', 'corn', 'asparagus'];
var grains = ['bread', 'noodles', 'rice', 'oats'];
var dairy = ['butter', 'cheese', 'yogurt', 'ice cream', 'milk'];
var meatAndAlts = ['beans', 'eggs', 'hummus', 'lentils', 'nuts', 'peanut butter', 'seeds', 'tofu', 'chicken', 'pork', 'beef', 'fish', 'ham', 'turkey'];
var other = ['salt', 'pepper', 'sugar', 'flour', 'oil', 'vinegar'];
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
        var divID = $(this).attr('id');
        $('.list').empty();
        populateCategories(divID);
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
        $('.list').addClass('d-none');
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
        var recipeDiv = $('<div>').addClass('recipe bg bg-success p-3 text-white mb-3 d-flex flex-column');
        var recipeTitle = $('<h5>').text(response.hits[i].recipe.label).addClass('mx-auto mb-2');
        var recipeLink = $('<a>').attr('href', response.hits[i].recipe.url).addClass('mx-auto');
        var recipeImg = $('<img>').attr('src', response.hits[i].recipe.image).addClass('d-block mx-auto mb-2');
        recipeLink.append(recipeImg);
        var recipeIngr = $('<h7>').text(response.hits[i].recipe.ingredientLines).addClass('mx-auto mb-2');
        recipeDiv.append(recipeTitle, recipeLink, recipeIngr);
        $('#recipe-list').append(recipeDiv);
    }
};

function populateCategories(divID) {
    setTimeout(function() {
        if (divID === 'fruits') {
            console.log(divID);
            for (var i = 0; i < fruits.length; i++) {
                var ingrBtn = $('<button>').text(fruits[i]).addClass('btn m-1 ingr');
                $('#fruits-list').append(ingrBtn);
            }
            $('#fruits-list').removeClass('d-none');
        }
        else if (divID === 'vegetables') {
            for (var i = 0; i < vegetables.length; i++) {
                var ingrBtn = $('<button>').text(vegetables[i]).addClass('btn m-1 ingr');
                $('#vegetables-list').append(ingrBtn);
            }
            $('#vegetables-list').removeClass('d-none');
        }
        else if (divID === 'grains') {
            for (var i = 0; i < grains.length; i++) {
                var ingrBtn = $('<button>').text(grains[i]).addClass('btn m-1 ingr');
                $('#grains-list').append(ingrBtn);
            }
            $('#grains-list').removeClass('d-none');
        }
        else if (divID === 'dairy') {
            for (var i = 0; i < dairy.length; i++) {
                var ingrBtn = $('<button>').text(dairy[i]).addClass('btn m-1 ingr');
                $('#dairy-list').append(ingrBtn);
            }
            $('#dairy-list').removeClass('d-none');
        }
        else if (divID === 'meat') {
            for (var i = 0; i < meatAndAlts.length; i++) {
                var ingrBtn = $('<button>').text(meatAndAlts[i]).addClass('btn m-1 ingr');
                $('#meat-alts-list').append(ingrBtn);
            }
            $('#meat-alts-list').removeClass('d-none');
        }
        else if (divID === 'other') {
            for (var i = 0; i < other.length; i++) {
                var ingrBtn = $('<button>').text(other[i]).addClass('btn m-1 ingr');
                $('#other-list').append(ingrBtn);
            }
            $('#other-list').removeClass('d-none');
        }
    }, 900);
};

$('.container-fluid').on('click', '.ingr', function() {
    var temp = $(this).text();
    var item = $('<h6 class="mx-auto">').text(temp.toLowerCase());
    $('#ingr-list').append(item);
    userIngrList.push(item.text());
    console.log(userIngrList);
    $('#ingr-list').append()
});

$('body').on('click', '.home-link', function() {
    event.preventDefault();
    $('#food-tiles').removeClass('d-none');
    $('#recipe-tiles').addClass('d-none');
});

$('body').on('click', '.custom-link', function() {
    event.preventDefault();
    $('#food-tiles').addClass('d-none');
    $('#custom-nutrition').removeClass('d-none');
    $('#custom-ingr').empty();
    for (var i = 0; i < userIngrList.length; i++) {
        var customDiv = $('<div>').addClass('d-flex flex-row ml-5 pl-5 my-2');
        var customInput = $('<input>').addClass('form-control mr-2 w-50');
        var customIngr = $('<h5>').text(userIngrList[i]);
        customDiv.append(customInput, customIngr);
        $('#custom-ingr').append(customDiv);
    }
});