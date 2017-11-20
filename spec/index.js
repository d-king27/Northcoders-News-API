const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const saveTestData = require('./getTestData.js');
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
    describe('GET /api/topics', () => {
        it('returns an array of objects', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(topics => {
                        expect(Array.isArray(topics.body)).to.equal(true);
                        expect(topics.body.length).to.equal(3);
                })
            });
    });
   
    describe('GET /api/topics/:topic_id/articles', () => {
        it('returns an array of article objects for the specified topic', () => {
            return request(app)
                .get(`/api/topics/${baseData.topics[0]._id}/articles`)
                .expect(200)
                .then(articles => {
                    expect(Array.isArray(articles.body)).to.equal(true);
                    expect(articles.body.length).to.equal(1);
                });
        });
        it('returns 404 if topic_id parameter is invalid', () => {
            return request(app)
                .get(`/api/topics/hello/articles`)
                .expect(404);
        });
    });







    describe('/',()=>{
        it('final check then disconnect', () => {
            return request(app)
                .get('/api')
                .expect(200)
                .then(q => {
                        console.log(q.text)
                        expect(q.text).to.be.a('string');
                        mongoose.disconnect()
                })
            });

    })
   
})
