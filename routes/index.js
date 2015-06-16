var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// GET question page
router.get('/quizes/question', quizController.question);
// GET answer page
router.get('/quizes/answer', quizController.answer);

module.exports = router;
