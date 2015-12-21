var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var dbinst = req.app.get('db');
  var newPost;
  dbinst.each('SELECT rowid, * FROM blog ORDER BY rowid DESC LIMIT 1', function(err,row) {
    newPost = {id: row.rowid, title: row.title, pBody: row.pBody};
  }, function() {
    res.render('luke', { post: newPost });
  });
});

router.get('/goals', function(req,res,next) {
  res.render('goals');
});


router.get('/dist', function(req,res,next) {
  res.render('dist');
});

router.get('/blog', function (req, res, next) {
  var dbinst = req.app.get('db');
  console.log(dbinst);
  var posts = [];
  dbinst.each('SELECT rowid, * FROM blog ORDER BY rowid DESC', function(err,row) {
    posts.push({id: row.rowid, title: row.title, pBody: row.pBody});
  },function() {
    var pLength = posts.length;
      nextP = 1;
      prevP = pLength - 1;
    res.render('blog', {posts: posts, next: nextP, prev: prevP, length: pLength});
  });
});

router.route('/blog/admin')
  .get(function(req,res) {
    res.render('admin');
  })
  .post(function(req,res) {
    var dbinst = req.app.get('db');
    console.log(dbinst);
    var pBody = req.body.pBody;
    var title = req.body.title;
    dbinst.serialize(function() {
      dbinst.run('insert into blog values ((?),(?))',title,pBody);
    });
    res.render('admin');
  });

router.get('/blog/:id', function(req,res,next) {
  var current = req.params.id;
  current = parseInt(current,10);
  var nextP = current + 1;
  var prevP = current - 1;
  var dbinst = req.app.get('db');
  console.log(dbinst);
  var posts = [];
  dbinst.each('SELECT rowid, * FROM blog ORDER BY rowid DESC', function(err,row) {
    posts.push({id: row.rowid, title: row.title, pBody: row.pBody});
  },function() {
    var pLength = posts.length;
    if(current == pLength - 1) {
      nextP = 0;
    } else if(current == 0) {
      prevP = pLength - 1;
    }
    res.render('blog', {posts: posts, current: current, next: nextP, prev: prevP, length: pLength});
  });

});



module.exports = router;
