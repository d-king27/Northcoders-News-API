const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const saveTestData = require('./getTestData.js');
mongoose.Promise = Promise
const _ = require('underscore')

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
   
    describe('GET /api/topics/:topic/articles', () => {
        it('returns an array of article objects for the specified topic', () => {
            return request(app)
                .get(`/api/topics/football/articles`)
                .expect(200)
                .then(articles => {
                    expect(Array.isArray(articles.body)).to.equal(true);
                    expect(articles.body.length).to.equal(1);
                });
        });
        // it('returns 404 if topic_id parameter is invalid', () => {
        //     return request(app)
        //         .get(`/api/topics/hello/articles`)
        //         .expect(404);
        // });
    });

    describe('GET /api/articles', () => {
        it('returns an array of objects', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(articles => {
                        expect(articles.body).to.be.an('array');
                       expect(articles.body.length).to.equal(2);
                })
            });
    });

    describe('GET /api/articles/:article_id/comments', () => {
        it('returns an array of comments for the specified article', () => {
            return request(app)
                .get(`/api/articles/${baseData.articles[0]._id}/comments`)
                .expect(200)
                .then(comments => {
                    expect(Array.isArray(comments.body)).to.equal(true);
                    expect(comments.body.length).to.equal(2);
                })
        });
        it('returns 404 if topic_id parameter is invalid', () => {
            return request(app)
                .get(`/api/articles/ohNoHelp/comments`)
                .expect(404);
        });
    });

    describe('POST /api/articles/:article_id/comments', () => {
        it('returns an array of comments for a specific article with a new comment added', () => {
            return request(app)
                .post(`/api/articles/${baseData.articles[0]._id}/comments`)
                .send({
                    "comment": "test 1"
                })
                .expect(201)
                .then(comments => {
                    expect(Array.isArray(comments.body)).to.equal(true);
                    expect(comments.body.length).to.equal(3);
                    expect(_.pluck(comments.body,'body').includes('test 1')).to.equal(true);
                });
        });
    });

    describe('PUT /api/articles/:article_id', () => {
        it('increments votes by one on specified article', () => {
            return request(app)
                .put(`/api/articles/${baseData.articles[0]._id}?votes=UP`)
                .expect(201)
                .then(article => {
                    expect(article.body).to.be.an('object');
                    expect(article.body.votes).to.equal(1);
                });
        });
        it('returns 404 if topic_id parameter is invalid', () => {
            return request(app)
                .put(`/api/articles/ohNoHelp/`)
                .expect(404);
        });
    });
    describe('PUT /api/comments/:comment_id', () => {
        it('increments votes by one on specified comment', () => {
            return request(app)
                .put(`/api/comments/${baseData.comments[0]._id}?votes=UP`)
                .expect(201)
                .then(comment => {
                    expect(comment.body).to.be.an('object');
                    expect(comment.body.votes).to.equal(1);
                });
        });
        it('decrements votes by one on specified comment', () => {
            return request(app)
                .put(`/api/comments/${baseData.comments[1]._id}?votes=DOWN`)
                .expect(201)
                .then(comment => {
                    expect(comment.body).to.be.an('object');
                    expect(comment.body.votes).to.equal(-1);
                });
        });
        it('returns 404 if comment_id parameter is invalid', () => {
            return request(app)
                .put(`/api/comments/ohNoHelp/`)
                .expect(404);
        });
    });

    describe('DELETE /api/comments/:comment_id', () => {
        it('deletes the specified comment', () => {
            return request(app)
                .delete(`/api/comments/${baseData.comments[1]._id}`)
                .expect(200)
                .then(comments => {
                    expect(comments.body).to.be.an('array');
                    expect(comments.body.length).to.equal(1);
                })
                
        });
        it('returns 404 if comment_id parameter is invalid', () => {
            return request(app)
                .delete(`/api/comments/banana/`)
                .expect(404);
        });
    });

    describe('GET /api/users/:username', () => {
        it('returns a JSON object with the profile data for the specific user', () => {
          return request(app)
              .get(`/api/users/${baseData.user.username}`)
              .expect(200)
              .then(user => {
                  expect(user.body).to.be.an('object');
                  expect(user.body.username).to.equal('tester');
              })
              
      });
      it('returns 404 if username parameter is invalid', () => {
          return request(app)
              .get(`/api/users/banana/`)
              .expect(404);
      });
  });




    describe('/',()=>{
        it('final check then disconnect', () => {
            return request(app)
                .get('/api')
                .expect(200)
                .then(q => {
                        expect(q.text).to.be.a('string');
                        mongoose.disconnect()
                })
            });

    })
   
})
