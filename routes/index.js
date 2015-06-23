var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');

router.param('quizId', quizController.load);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// GET questions page
router.get('/quizes', quizController.index);
// GET question page by Id
router.get('/quizes/:quizId(\\d+)', quizController.show);
// GET answer page
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//GET new quiz page
router.get('/quizes/new', quizController.new)
// POST create quiz page
router.post('/quizes/create', quizController.create);
// GET credits page
router.get('/author', authorController.author);

module.exports = router;
