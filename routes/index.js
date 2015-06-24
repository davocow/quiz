var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var authorController = require('../controllers/author_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

router.param('quizId', quizController.load);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// GET questions page
router.get('/quizes', quizController.index);
// GET question page by Id
router.get('/quizes/:quizId(\\d+)', quizController.show);
// GET answer page
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
//GET new quiz page
router.get('/quizes/new', sessionController.loginRequired, quizController.new)
// GET edit quiz page
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
// POST create quiz page
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
// PUT edit quiz
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
// DELETE remove quiz
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

// GET new comment for question
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
// POST create comment for question
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

// GET login page
router.get('/login', sessionController.new);
// POST check login and create session
router.post('/login', sessionController.create);
// DELETE delete session
router.delete('/logout', sessionController.destroy);

// GET credits page
router.get('/author', authorController.author);

module.exports = router;
