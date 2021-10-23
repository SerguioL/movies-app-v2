const getMovie = id => fetch(`${GLITCH}/${id}`)
    .then(res => res.json())
    .catch(console.error);
console.log(getMovie)

const editMovie = film => fetch(`${GLITCH}/${film.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',//This tell fetch your going to pass JSON
    },
    body: JSON.stringify(film)//you need this so that you can properly pass the object as a JSON file
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

