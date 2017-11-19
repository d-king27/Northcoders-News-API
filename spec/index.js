const { expect } = require('chai');
//const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const saveTestData = require('./getTestData.js');
mongoose.Promise = Promise
process.env.NODE_ENV = 'test';
let a = 'hey'
console.log(a)

describe('test',()=>{
    it('works',()=>{
        expect(a).to.equal('hey')
    })
})

// describe('API', () => {
//     let baseData;
//     beforeEach(() => {
//         return mongoose.connection.dropDatabase()
//             .then(saveTestData)
//             .then(data => {
//                 baseData = data;
//                 console.log('hey')
//             })
//             .catch(console.error);
//     })
//     it('/', () => {
//         return request(app)
//             .get('/api')
//             .expect(200)
//             .then(q => {
//                     expect(q.text).to.be.a('string');
//             })
//         });
// })
