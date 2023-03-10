require('dotenv-safe').config();
const repository = require('./repository');
let testCityId = null;
let testCinemaId = null;
let testMovieId = null;

beforeAll(async () => {
    const cities = await repository.getAllCities();
    testCityId = cities[1]._id;
    testCinemaId = cities[1].cinemas[0]._id;
    testMovieId = cities[1].cinemas[0].rooms[0].showtime[0].idMovie;
})

afterAll(async () => {
    await repository.disconnect();
})

test('Repository getAllCities', async () => {
    const cities = await repository.getAllCities();
    expect(Array.isArray(cities)).toBeTruthy();
    expect(cities.length).toBeGreaterThan(0);
})

test('Repository getCinemasByCityId', async () => {
    const cinemas = await repository.getCinemasByCityId(testCityId);
    expect(Array.isArray(cinemas)).toBeTruthy();
    expect(cinemas.length).toBeGreaterThan(0);
})

test('Repository Disconnect', async () => {
    const isDisconnected = await repository.disconnect();
    expect(isDisconnected).toBeTruthy();
})

test('Repository getMoviesByCinemaId', async () => {
    const result = await repository.getMoviesByCinemaId(testCinemaId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})

test('Repository getMoviesByCityId', async () => {
    const result = await repository.getMoviesByCityId(testCityId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})

test('Repository getMovieSessionsByCityId', async () => {
    const result = await repository.getMovieSessionsByCityId(testMovieId, testCityId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})

test('Repository getMovieSessionsByCinemaId', async () => {
    const result = await repository.getMovieSessionsByCinemaId(testMovieId, testCinemaId);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
})