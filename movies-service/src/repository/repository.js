const database = require('../config/database');
const { ObjectId } = require('mongodb');

async function getAllMovies() {
    const db = await database.connect();
    return db.collection('movies').find().toArray();
}

async function getMovieById(id) {
    const db = await database.connect();
    return db.collection('movies').findOne({ _id: new ObjectId(id)});
}

async function getMoviePremieres() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const db = await database.connect();
    return db.collection('movies').find({ premiereDate: {$gte: lastMonth} }).toArray();
}

async function disconnect() {
    return database.disconnect();
}

module.exports = { getAllMovies, getMovieById, getMoviePremieres, disconnect }

