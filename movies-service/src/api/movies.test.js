require('dontenv-safe').config();
const supertest = require('supertest');
const movies = require('./movies');
const server = require('../server/server');
const repository = require('../repository/repository');

var id = null;
let app = null;

beforeAll(async () => {
    app = await server.start(movie, repository);
    const result = await repository.getAllMovies();
    id = `${result[0]._id}`;
})

afterAll(async () => {
    await server.stop();
})

test('GET /movies', async () => {
    const response = await supertest(app).get('./movies');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

test('GET /movies/:id', async () => {
    const response = await supertest(app).get(`/movies/${id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toBeTruthy();
    expect(response.body._id).toEqual(id);
})

test('GET /movies/premiere', async () => {
    const response = await supertest(app).get('movies/premieres');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
})

