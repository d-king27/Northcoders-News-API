# Northcoders-News-API
### Overview
This is the RESTful API for the Northcoders news project which is a site similar to reddit in which users can share and comment on content. This API is linked with MongoDB hosted on MLab which provides the data to the frontend which can be found here https://github.com/d-king27/Northcoders-News-FrontEnd 



### Prerequisites


This project is live and can be accessed via the URL https://nc-news-api-dk.herokuapp.com/

or

The project can be run locally via Node.js and npm
(minmum version v8.3.0)
installation instructions can be found here

```
https://nodejs.org/en/download/package-manager/
https://www.npmjs.com/get-npm
```

using the terminal:

clone the repo to your local machine
```
git clone https://github.com/d-king27/Northcoders-News-API.git
```

run npm install

run npm start

```
npm install
npm start
```
server should now be listening on port localhost:3001 on your local machine


### Database

database used: mongod version: 3.4.9 (MMAPv1)

to seed the database for testing purposes run the seed.test.js in command line

```
node ./data/seed.test.js
```
to seed the database for use run the seed.js in command line

```
node ./data/seed.js
```
This will populate the database with a base set of data for each(NB the tests use supertest which seeds the database automatically)


## Routes

-GET /api/topics
Get all the topics

-GET /api/topics/:topic/articles
Return all the articles for a certain topic

-GET /api/articles
Returns all the articles

-GET /api/articles/:id
Returns an object of the specific article found by the mongo id

-GET /api/articles/:article_id/comments
Get all the comments for a individual article

-POST /api/articles/:article_id/comments
Add a new comment to an article. This route requires a JSON body with a comment key and value pair
e.g: {"comment": "This is my new comment"}

-PUT /api/articles/:article_id
Increment or Decrement the votes of an article by one. This route requires a votes query of 'UP' or 'DOWN'
e.g: https://nc-news-api-dk.herokuapp.com/api/articles/:article_id?votes=UP

-PUT /api/comments/:comment_id
Increment or Decrement the votes of a comment by one. This route requires a vote query of 'UP' or 'DOWN'
e.g: https://nc-news-api-dk.herokuapp.com/api/comments/:comment_id?votes=DOWN

-DELETE /api/comments/:comment_id
Deletes a comment if the comment was created by the Northcoder user

-GET /api/users/:username
Returns a JSON object with the profile data for the specified user.

## Running the tests

As mentioned above the tests with automatically seed the database

The project has tests for every route using the supertest libary which can be run using npm test

```
npm test
```

### Example Test

A standard set of results unit test is shown below

```
 PUT /api/comments/:comment_id
      ✓ increments votes by one on specified comment (45ms)
      ✓ decrements votes by one on specified comment (49ms)
      ✓ returns 404 if comment_id parameter is invalid

```




## Acknowledgments

Northcoders Organisation and all affiliated tutors
