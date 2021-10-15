const GLITCH = 'https://uneven-organic-meteoroid.glitch.me/movies';

const POSTER = `http://www.omdbapi.com/?apikey=${OMDP_API}`;


const getMovies = () => fetch(GLITCH)
    .then(res => res.json())
    .then(data => {
        $("#cards").html("")
        // console.log(data)
        // data.forEach(async function (movie) {
        //
        //     var title = movie.title;
        //     const movieData = await getMovieInfo(title);
        //     console.log(movieData);
        //     $('#cards').append(renderMovies(movie, movieData));
        // })
                Promise.all(data.map( function (movie){
            return getMovieInfo(movie.title);
        })).then(function (movies){
            // console.log(movies);
            // console.log(data);
            //merge movies and data array together
            //loop over last merge array to render over each movie
            movies.forEach(function (movie,index){
                console.log(data);
                console.log(movie);
                $('#cards').append(renderMovies(data[index],movie));
            })
        });
    })
    .catch(console.error);

function renderMovies(data,movie){
   return  `<article>

    <div class="main-container"> 
    
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
            <!--            <input class="addTitle" name="rating" type="text" placeholder="Rating" id="newRating${data.id}"/>-->
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
    console.log(newMovieTitle[0]);
    var newMovieRating = $(`#newRating${id}`);
    console.log(newMovieRating[0]);
    var newWatched = $(`#newWatched${id}`);
    console.log(newWatched[0]);
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
            // console.log(data2)
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






