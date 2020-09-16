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
                if (movies[0]) {
                    state.url = "https://www.imdb.com/title/" + movies[0].id;
                    console.log(state.url);
                } else {
                    state.url = "https://www.imdb.com/";
                    console.log("no url");
                }
            },
            function (error) {
                console.error(error);
            }
        );
    }

    function updateSeen(seen) {
        state.seen = seen;
    }

    return {
        getState,
        updateSeen,
    };
};
