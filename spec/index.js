const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const saveTestData = require('./getTestData');
mongoose.Promise = Promise



describe('API', () => {
    let baseData;
    beforeEach(() => {
        return mongoose.connection.dropDatabase()
            .then(saveTestData)
            .then(data => {
                baseData = data;
            })
            .catch(console.error);
    })
});