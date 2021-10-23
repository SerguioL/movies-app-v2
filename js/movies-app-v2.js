const GLITCH = 'https://uneven-organic-meteoroid.glitch.me/movies';

const MOVIEINFO = `http://www.omdbapi.com/?apikey=${OMDP_API}`;

//targets the body of the html
const body = $('body');

const getMovies = () => fetch(GLITCH)
    .then(res => res.json())
    .then(data => {
        $("#Loading").css("visibility", "visible");
        $("#cards").html("")
                Promise.all(data.map( function (movie){// waits for all the movies to get fetch so there in order based on which movie were added
            return getMovieInfo(movie.title);
        })).then(function (movies){
            movies.forEach(function (movie,index){
                $('#cards').append(renderMovies(data[index],movie));// loops through glitch data
                $("#Loading").css("visibility", "hidden");
            })
        });
    })
    .catch(console.error);


//When the .moreInfo class is clicked
//the $(this).attr("data-id"); is used to check which card is being clicked
//then the I used $(`#cardID${id}`).toggleClass("the-cardFlip"); which allows me to flip the card
body.on("click", ".moreInfo", function (){
    let id = $(this).attr("data-id");
    $(`#cardID${id}`).toggleClass("the-cardFlip");
});

//This does the same as the previous event handler
body.on("click", ".lessInfo", function (){
    let id = $(this).attr("data-id");
    $(`#cardID${id}`).toggleClass("the-cardFlip");
});

body.on("click", ".delete", function (){
    let id = $(this).attr("data-id");
    deleteMovie(id);

});

body.on("click", ".edit", function (){
    let id = $(this).attr("data-id")
    $(`#form${id}`).toggleClass("hidden")
});


body.on("click", ".submitMovies", function (){
    let id = $(this).attr("data-id")
    //gets this information from the form of the cards
    let newMovieTitle = $(`#newTitle${id}`);
    let newMovieRating = $(`#newRating${id}`);
    let newWatched = $(`#newWatched${id}`);
    let newMovie = {
        id,
        title: newMovieTitle[0].value,
        rating: newMovieRating[0].value,
        watched: newWatched[0].value,
    }
    editMovie(newMovie);
});

//add button when you click on it will take the value of addTitle and addRating and put them into a function
//called addMovie which will render all the movies with the new movie added to existing
$('#addButton').click(function (e) {
    e.preventDefault();
    let addNewTitle = $('#addTitle').val();
    let addNewRating = $('#addRating').val();
    let addNewWatched = $('#addWatched').val();
    let mObj = {title: addNewTitle, rating: addNewRating, watched: addNewWatched};
    addMovie(mObj);
});

//This function returns to a fetch that gets the movie information by using the title from
// the other fetch with the getMovies
function getMovieInfo(title){
   return  fetch(`${MOVIEINFO}&t=${title}`)
        .then(res => res.json())
        .then(data2 => {
            return data2
        })
        .catch(console.error);
    }

//This function takes the glitch data and the movie information
// and returns a cards with both glitch data and movie information
function renderMovies(data,movie){
    return  `<article>

    <div class="main-container"> 
<!-- data-id="data.id" let me target the cards individual
  which lets me gives me differdt functionality like edit, flip and other things  -->
       <div class="the-card" id="cardID${data.id}"> 
            <div class="the-front card">
                <img src="${movie.Poster}" alt="Movie poster"/>
                <p>${data.title}</p>
                <p>Your Rating: ${data.rating}</p>
                <p>Watched: ${data.watched}</p>
                <p class="moreInfo" data-id="${data.id}">Click For more Info</p>
                <div class="buttonOrder">
                <button class="edit btn btn-info" data-id="${data.id}" >Edit</button>
                <button class="delete btn btn-danger" data-id="${data.id}" >Delete</button>
                </div>
                <ul class="hidden" id="form${data.id}">
                    <li>
                        <label for="newTitle${data.id}">Title</label>
                        <input name="title" type="text" placeholder="Title" value="${data.title}" id="newTitle${data.id}"/>
                    </li>
                    <li>
                          <label for="newRating${data.id}">Rating</label>
                          <select name="rating" id="newRating${data.id}">
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             <option value="6">6</option>
                             <option value="7">7</option>
                             <option value="8">8</option>
                             <option value="9">9</option>
                             <option value="10">10</option>
                         </select>
                    </li>
                    <li>
                         <label for="newWatched${data.id}">Watched</label>
                        <select id="newWatched${data.id}">
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </li>
                    <li>
                        <button type="submit" data-id="${data.id}" class="submitMovies btn btn-primary">Submit</button>
                    </li>
                </ul>
                </div>
              
            <div class="the-back">
                <p><span>Actors:</span> ${movie.Actors}</p>
                <p><span>Genre:</span> ${movie.Genre}</p>
                <p><span>Rated:</span> ${movie.Rated}</p>
                <p><span>Production:</span> ${movie.Production}</p>
                <p><span>Writer:</span> ${movie.Writer}</p>
                <p><span>Released Date:</span> ${movie.Released}</p>
                <p><span>imdbRating:</span> ${movie.imdbRating}</p>
                <p><span>Plot:</span> ${movie.Plot}</p>
                <p class="lessInfo" data-id="${data.id}" >Show Less Info</p>
                </div>   
       </div>        
   </div>
</article>`
}

getMovies();