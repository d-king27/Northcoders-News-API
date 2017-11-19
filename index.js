const app = require('./server.js');
let PORT = require('./config').PORT[process.env.NODE_ENV];
if(!PORT){PORT = process.env.PORT}
if(!PORT){PORT = 9000}

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});