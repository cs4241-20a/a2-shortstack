const imdb = require("imdb-node-api");

module.exports = function (name, seen) {
    let state = {
        name: name,
        seen: seen,
        url: "",
    };

    getURL(state.name);

    function getState() {
        return state;
    }
    function getURL(name) {
        imdb.searchMovies(
            name,
            function (movies) {
                state.url = "https://www.imdb.com/title/" + movies[0].id;
                console.log(state.url);
            },
            function (error) {
                console.error(error);
            }
        );
    }

    return {
        getState,
    };
};
