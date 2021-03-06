var express = require('express');
var router = express.Router();

// get Page model
var Page = require('../models/page');

/*
 * GET /
*/
router.get('/', function (req, res, next) {

  Page.findOne({ slug: 'home' }, function (err, page) {
    // console.log(page);
    if (err)
      console.log(err);

    res.render('index', {

      title: page.title,
      content: page.content
    });
  });
});


/*
* GET a page
*/
router.get('/:slug', function (req, res, next) {

  var slug = req.params.slug;

  Page.findOne({ slug: slug }, function (err, page) {
    if (err)
      console.log(err);

    if (!page) {
      res.redirect('/');
    } else {
      res.render(slug + '.ejs', {
        title: page.title,
        content: page.content,
        slug: page.slug
      });
    }
  });
});


module.exports = router;
