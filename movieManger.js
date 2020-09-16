const Movie = require("./movie");

module.exports = function () {
    const movies = new Map();

    function handleData(data) {
        if (!movies.has(data.movie)) {
            console.log("New movie:", data.movie);
            movies.set(data.movie, Movie(data.movie, data.seen));
        } else {
            console.log("Known movie:", data.movie);
            movies.get(data.movie).updateSeen(data.seen);
        }
    }

    function getAllMovies() {
        allMovies = [];
        for (let values of movies.values()) {
            allMovies.push(values.getState());
        }

        // console.log(allMovies);
        return allMovies;
    }

    return {
        handleData,
        getAllMovies,
    };
};
