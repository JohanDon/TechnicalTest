const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express()

//settings
app.set("port", process.env.PORT || 3000);


//middleware
app.use((req, res, next) => {
    console.log(`${req.url} -${req.method}`);
    next();
});
app.use((bodyParser.json()));
app.use(bodyParser.urlencoded({extended: false}))


//routes
app.use(routes);


// start server
app.listen(app.get("port"), () => { console.log("server on port", app.get("port")) });