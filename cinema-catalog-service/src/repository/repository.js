const database = require("../config/database");
const { ObjectId } = require("mongodb");

async function getAllCities() {
    const db = await database.connect();
    return db.collection("cinemaCatalog").find({}).projection({ city: 1, province: 1, country: 1 }).toArray();
}

async function getCinemasByCityId(cityId) {
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    return db.collection('cinemaCatalog')
        .findOne({ _id: objCityId }, { projection: { cinemas: 1 } });
}

async function disconnect() {
    return database.disconnect();
}

async function getMoviesByCinemaId(cinemaId) {
    const objCinemaId = new ObjectId(cinemaId);
    const db = await database.connect();
    return db.collection("cinemaCatalog").aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.rooms" },
        { $unwind: "$cinemas.rooms.showtime" },
        { $group: { _id: { movie: "$cinemas.rooms.showtime.movie", idMovie: "$cinemas.rooms.showtime.idMovie" } } }
    ]).toArray();
}

async function getMoviesByCityId(cityId) {
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.rooms" },
        { $unwind: "$cinemas.rooms.showtime" },
        { $group: { _id: { movie: "$cinemas.rooms.showtime.movie", idMovie: "$cinemas.rooms.showtime.idMovie" } } }
    ]).toArray();
    return sessions.map(item => item._id);
}

async function getMovieSessionsByCityId(movieId, cityId) {
    const objMovieId = new ObjectId(movieId);
    const objCityId = new ObjectId(cityId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "_id": objCityId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.rooms" },
        { $unwind: "$cinemas.rooms.showtime" },
        { $match: { "cinemas.rooms.showtime.idMovie": objMovieId } },
        { $group: { _id: { movie: "$cinemas.rooms.showtime.movie", idMovie: "$cinemas.rooms.showtime.idMovie", idCinema: "$cinemas._id", room: "$cinemas.rooms.name", showtime: "$cinemas.rooms.showtime" } } }
    ]).toArray();
    return sessions.map(item => item._id);
}

async function getMovieSessionsByCinemaId(movieId, cinemaId) {
    const objCinemaId = new ObjectId(cinemaId);
    const objMovieId = new ObjectId(movieId);
    const db = await database.connect();
    const sessions = await db.collection("cinemaCatalog").aggregate([
        { $match: { "cinemas._id": objCinemaId } },
        { $unwind: "$cinemas" },
        { $unwind: "$cinemas.rooms" },
        { $unwind: "$cinemas.rooms.showtime" },
        { $match: { "cinemas.rooms.showtime.idMovie": objMovieId } },
        { $group: { _id: { movie: "$cinemas.rooms.showtime.movie", idMovie: "$cinemas.rooms.showtime.idMovie", room: "$cinemas.rooms.name", showtime: "$cinemas.rooms.showtime" } } }
    ]).toArray();
    return sessions.map(item => item._id);
}

module.exports = { getAllCities, getCinemasByCityId, disconnect, getMoviesByCinemaId, getMoviesByCityId, getMovieSessionsByCityId, getMovieSessionsByCinemaId }
