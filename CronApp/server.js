const express = require('express') // import express module in our application
const app = express();

const appRouter = require('./v1/route/index') 

app.use('/v1', appRouter); 

app.listen(5000, function () {  
  console.log('Listening on port 5000')
}) 