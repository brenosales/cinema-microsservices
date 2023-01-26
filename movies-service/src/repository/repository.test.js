require('dotenv-safe').config();
const repository = require('./repository');
let id = null;

beforeAll(async () => {
    const movies = await repository.getAllMovies();
    id = movies[0]._id;
})

test('Repository GetAllMovies', async () => {
    const movies = await repository.getAllMovies();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeGreaterThan(0);
})

test('Repository GetMoviesById', async () => {
    const movie = await repository.getMovieById(id);
    expect(movie).toBeTruthy();
    expect(movie._id).toEqual(id);
})

test('Repository GetMoviePremieres', async () => {
    const movies = await repository.getMoviePremieres();
    expect(Array.isArray(movies)).toBeTruthy();
    expect(movies.length).toBeGreaterThan(0);
})

test('Repository Disconnect', async () => {
    const isDisconnected = await repository.disconnect();
    expect(isDisconnected).toBeTruthy();
})

