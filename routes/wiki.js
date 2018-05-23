var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
var db = models.db;


router.post('/', function (req, res, next) {
    console.log(req.body);

    User.findOrCreate({
        where: {
            name: req.body.author,
            email: req.body.author_email
        }
    })
        .then((values) => {
            console.log('values', values)
            console.log('entra al spread');
            var user = values[0];
            var page = Page.build({
                title: req.body.title,
                content: req.body.content,
                status: req.body.status,
            });
            return page.save()
                .then(function (data) {
                    return data.setAuthor(user)
                })
                .catch(next)
        })
        .then(function (data) {
            res.redirect(data.urlTitle);
        })
        .catch(next)
});


router.get('/add', function (req, res, next) {
    res.render('addPage');
});

router.get('/:pageTitle', function (req, res, next) {

    //res.send(`Estoy entrando correctamente a ${req.params.pageTitle}`);

    Page.findOne({
        where: {
            urlTitle: req.params.pageTitle
        }
    })
        .then(
            function (pagina) {
                pagina.getAuthor()
                    .then(function (autor) {
                        res.render('wikipage', {
                            pageTitle: pagina.title,
                            pageContent: pagina.content,
                            author: autor.name
                        });
                    })
            }
        )
        .catch(next)
});


module.exports = router;

