const GLITCH = 'https://uneven-organic-meteoroid.glitch.me/movies';

const POSTER = `http://www.omdbapi.com/?apikey=${OMDP_API}`;


const getMovies = () => fetch(GLITCH)
    .then(res => res.json())
    .then(data => {
        $("#cards").html("")
        console.log(data)
        data.forEach(async function (movie) {

            var title = movie.title;
            const movieData = await getMovieInfo(title);
            $('#cards').append(renderMovies(movie, movieData));
        })
    })
    .catch(console.error);

function renderMovies(movie,data2){
   return  `<article>

    <div class="main-container"> 
    
       <div class="the-card" id="cardID${movie.id}"> 
            <div class="the-front card">
                <img src="${data2.Poster}" alt="Movie poster"/>
                <p>${movie.title}</p>
                <p>Your Rating: ${movie.rating}</p>
                <p>Watched: ${movie.watched}</p>
                <p class="moreInfo" data-id="${movie.id}">Click For more Info</p>
                <div class="buttonOrder">
                <button class="edit btn btn-info" data-id="${movie.id}" >Edit</button>
                <button class="delete btn btn-danger" data-id="${movie.id}" >Delete</button>
                </div>
                <ul class="hidden" id="form${movie.id}">
                    <li>
                        <label for="newTitle${movie.id}">Title</label>
                        <input name="title" type="text" placeholder="Title" value="${movie.title}" id="newTitle${movie.id}"/>
                    </li>
                    <li>
            <!--            <input class="addTitle" name="rating" type="text" placeholder="Rating" id="newRating${movie.id}"/>-->
                          <label for="newRating${movie.id}">Rating</label>
                          <select name="rating" id="newRating${movie.id}">
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
                         <label for="newWatched${movie.id}">Watched</label>
                        <select id="newWatched${movie.id}">
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                    </li>
                    <li>
                        <button type="submit" data-id="${movie.id}" class="submitMovies btn btn-primary">Submit</button>
                    </li>
                </ul>
                </div>
              
            <div class="the-back">
                <p><span>Actors:</span> ${data2.Actors}</p>
                <p><span>Genre:</span> ${data2.Genre}</p>
                <p><span>Rated:</span> ${data2.Rated}</p>
                <p><span>Production:</span> ${data2.Production}</p>
                <p><span>Writer:</span> ${data2.Writer}</p>
                <p><span>Released Date:</span> ${data2.Released}</p>
                <p><span>imdbRating:</span> ${data2.imdbRating}</p>
                <p><span>Plot:</span> ${data2.Plot}</p>
                <p class="lessInfo" data-id="${movie.id}" >Show Less Info</p>
                </div>   
       </div>        
   </div>
</article>`
}

const body = $('body');

body.on("click", ".moreInfo", function (){
    var id = $(this).attr("data-id");
    console.log($(`#cardID${id}`).hasClass("the-cardFlip"));
    $(`#cardID${id}`).toggleClass("the-cardFlip");
    console.log($(`#cardID${id}`).hasClass("the-cardFlip"));
    console.log(id);
});

body.on("click", ".lessInfo", function (){
    var id = $(this).attr("data-id");
    console.log($(`#cardID${id}`).hasClass("the-cardFlip"));
    $(`#cardID${id}`).toggleClass("the-cardFlip");
    console.log($(`#cardID${id}`).hasClass("the-cardFlip"));
    console.log(id);
});

body.on("click", ".delete", function (){
    var id = $(this).attr("data-id");
    console.log(id);
    deleteMovie(id);

});

body.on("click", ".edit", function (){
    var id = $(this).attr("data-id")
    console.log(id);
    // console.log($(`#form${id}`).hasClass("hidden"));
    $(`#form${id}`).toggleClass("hidden")
    // console.log($(`#form${id}`).hasClass("hidden"));

});

body.on("click", ".submitMovies", function (){
    // var newMovieT = $(this)[0].parentElement.parentElement.children[0].children[0].value
    // var newMovieR = $(this)[0].parentElement.parentElement.children[1].children[0].value
    var id = $(this).attr("data-id")
    var newMovieTitle = $(`#newTitle${id}`);
    var newMovieRating = $(`#newRating${id}`);
    var newWatched = $(`#newWatched${id}`);
    var newMovie = {
        id,
        title: newMovieTitle[0].value,
        rating: newMovieRating[0].value,
        watched: newWatched[0].value,
    }
    console.log(newMovie);
    editMovie(newMovie);
});

function getMovieInfo(title){
   return  fetch(`${POSTER}&t=${title}`)
        .then(res => res.json())
        .then(data2 => {
            console.log(data2)
            return data2
        })
        .catch(console.error);
    }

    getMovies();

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




