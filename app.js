var express = require("express");
var app = express();
var pg = require("pg");
var nunjucks = require("nunjucks")
var routes = require('./routes');
var path = require('path');
var bodyParser = require('body-parser');
// Donde tu servidor y la app de express están siendo definidas
var models = require('./models');
var morgan = require("morgan");


app.use(express.static(path.join(__dirname, '/public')));


// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // para HTML form submits
app.use(bodyParser.json()); // seria para AJAX requests


app.use(morgan('tiny'))
// templating boilerplate setup
app.engine('html', nunjucks.render); // como renderear templates html
app.set('view engine', 'html'); // que extensiones de archivo tienen los templates
nunjucks.configure('views', { noCache: true }); // donde encontrar las views

app.get("/", function(req, res){
	res.send("index.html")
});

/*// ... otras cosas
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);*/

// Asegurate de estar exportando tu db del archivo de tus modelos
models.db.sync({force:true})
.then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3000, function () {
        console.log('Server is listening on port 3000! ／(=✪ x ✪=)＼   ／(=✪ x ✪=)＼     ／(=✪ x ✪=)＼    w');
    });
})
.catch(console.error);

