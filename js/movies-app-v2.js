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

<div>
    <img width="100px" height="100px" src="${data2.Poster}"/>
    <p>${movie.title}</p>
    <p>Rating: ${movie.rating}</p>
    <p>Watched: ${movie.watched}</p>
    <button class="edit" data-id="${movie.id}" >Edit</button>
    <button class="delete" data-id="${movie.id}" >Delete</button>
    <ul class="hidden" id="form${movie.id}">
    <li>
    </li>
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
            <button type="submit" data-id="${movie.id}" class="submitMovies">Submit</button>
        </li>
    </ul>
<div/>    

</article>`

}

const body = $('body');
body.on("click", ".delete", function (){
    var id = $(this).attr("data-id");
    console.log(id);
    // $("article").remove();
    deleteMovie(id);

});

body.on("click", ".edit", function (){
    var id = $(this).attr("data-id")
    console.log(id);
    console.log($(`#form${id}`).hasClass("hidden"));
    $(`#form${id}`).toggleClass("hidden")
    console.log($(`#form${id}`).hasClass("hidden"));

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
    // $("article").remove();
    editMovie(newMovie);
    // $(`#form${id}`).toggleClass("hidden")
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

