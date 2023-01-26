(async () => {
    require('dotenv-safe').config();
    const movies = require('./api/movies');
    const server = require('./api/server');
    const repository = require('./repository/repository');

    try {
        await server.start(movies, repository);
        console.log('Server up and running at ' + ProcessingInstruction.env.PORT);
    } catch (error) {
        console.log(error);
    }
})();