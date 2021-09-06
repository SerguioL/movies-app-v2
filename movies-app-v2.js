const GLITCH = 'https://uneven-organic-meteoroid.glitch.me/movies';

const getMovies = () => fetch(GLITCH)
    .then(res => res.json())
    .then(data => {
        $("#cards").html("")
        console.log(data)
        data.forEach(function (movie) {
            $('#cards').append(`<article>
<p>${movie.title}</p>
<p>${movie.rating}</p>
<button class="edit" >Edit</button>
<button class="delete" data-id="${movie.id}" >Delete</button>
<ul class="hidden">
    <li>
        <input class="addRating" name="rating" type="text" placeholder="Title"/>
    </li>
    <li>
        <input class="addTitle" name="title" type="text" placeholder="Rating"/>
    </li>
    <li>
        <button type="submit" data-id="${movie.id}" class="submitM">Submit</button>
    </li>
</ul>
</article>`);
        });
        $('.delete').click(function () {
            var id = $(this).attr("data-id");
            console.log(id);
            // $("article").remove();
            deleteMovie(id);

        });

        $('.edit').click(function () {
            $("ul").toggleClass("hidden")
            //
            // var id = $(this).attr("data-id");
            // console.log(id);

            // $("article").remove();
            // editMovie(id);

        });

        $(".submitM").click(function (){
            var newMovieT = $(this)[0].parentElement.parentElement.children[0].children[0].value
            var newMovieR = $(this)[0].parentElement.parentElement.children[1].children[0].value
            var newMovie = {
                title: newMovieT,
                rating: newMovieR,
                id: $(this).attr("data-id")
            }
            console.log(newMovie);
            // $("article").remove();
            editMovie(newMovie);

        });




    })
    .catch(console.error);
getMovies();

const getMovie = id => fetch(`${GLITCH}/${id}`)
    .then(res => res.json())
    .catch(console.error);
console.log(getMovie)

const editMovie = film => fetch(`${GLITCH}/${film.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(film)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
        getMovies();
    })
    .catch(console.error);

const deleteMovie = id => fetch(`${GLITCH}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(() => {
        console.log(`Success: deleted movie with id of ${id}`);
        getMovies();
    })
    .catch(console.error);

const addMovie = (film) => fetch(`${GLITCH}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(film)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: created ${JSON.stringify(data)}`);
        getMovies();
        return data.id; // to access the primary key of the newly created entity
    })
    .catch(console.error);

$('#addButton').click(function (e) {
    e.preventDefault();
    let x = $('#addTitle').val();
    let y = $('#addRating').val();
    let mObj = {title: x, rating: y};
    addMovie(mObj);


});
