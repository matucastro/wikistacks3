var express = require('express');
var router = express.Router();
var userRouter = require('./user')
var wikiRouter = require('./wiki')
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

router.get('/', function (req, res, next) {
    Page.findAll({ attributes: ['title', 'urlTitle'] })
        .then(function (pages) {



            res.render('index', { pages });
        })

    //res.render('index');
});

module.exports = router;





