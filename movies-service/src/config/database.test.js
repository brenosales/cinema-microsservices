require('dotenv-safe').config();
const database = require('./database');

test('MongoDB Connection', async () => {
    const isConnected = await database.connect();
    expect(isConnected).toBeTruthy();
})

test('MongoDB Disconnection', async () => {
    const isDisconnected = await database.disconnect();
    expect(isDisconnected).toBeTruthy();
})