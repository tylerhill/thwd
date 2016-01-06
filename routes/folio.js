var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var dbinst = req.app.get('db');
  var works = [];

  dbinst.each('SELECT rowid, * FROM folio ORDER BY rowid DESC', function(err,row) {
    works.push({id: row.rowid, title: row.title, url: row.url});
    console.log(works);
  }, function() {
    res.render('folio', { works: works });
  });



});

module.exports = router;
