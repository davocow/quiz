var models = require('../models/models');
var Q = require('q');

var statistics = {
	quizes: 0,
	comments: 0,
	unpublishedComments: 0,
	publishedComments: 0,
	commentsbyQuestionAverage:0.0
};

function CleanSearch(search)
{
		search = search.trim();
		search = search.replace(/\s+/,'%');
		search = '%' + search + '%';
		return search;
}

// Autoload!
exports.load = function(req, res, next, quizId)
{
	models.Quiz.findById(quizId, {include: [models.Category, models.Comment]}).then(function(quiz){
		if(quiz)
		{
			req.quiz = quiz;
			next();
		}
		else{
			next(new Error('No existe el identificador de pregunta: ' + quizId));
		}
	}).catch(function(error){
		next(error);
	});	
};

// GET /quizes
exports.index = function(req, res, next)
{
	if(req.query.search)
	{	
		models.Quiz.findAll({where: ["pregunta like ?", CleanSearch(req.query.search)], include:[models.Category]}).then(function(quizes){
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error){
			next(error);
		});
	}
	else
	{
		models.Quiz.findAll({include:[models.Category]}).then(function(quizes){
			res.render('quizes/index', {quizes: quizes, errors: []});	
		}).catch(function(error){
			next(error);
		});
	}
};

// GET /quizes/:quizId(\\d+)
exports.show = function(req, res)
{
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

// GET /quizes/:quizId(\\d+)/answer
exports.answer = function(req, res)
{
		var solucion = '';
		if(req.query.respuesta === req.quiz.respuesta)
		{
			solucion = 'Correcto :)';
		}
		else
		{
			solucion = 'Incorrecto :(';
		}
		res.render('quizes/answer', {respuesta: solucion, quiz: req.quiz, errors: []});	
};

// GET /quizes/new
exports.new = function(req, res, next)
{
	var quiz = models.Quiz.build({pregunta: 'Pregunta', respuesta: 'Respuesta'});
	
	models.Category.findAll().then(function(categories){
			res.render('quizes/questionForm', {quiz: quiz, categories: categories, action: '/quizes/create', header: 'Nueva Pregunta', errors: []});	
		}).catch(function(error){
			next(error);
		});
};

// POST /quizes/create
exports.create = function(req, res, next)
{
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(function(err){
		if(err)
		{
			models.Category.findAll().then(function(categories){
				res.render('quizes/questionForm', {quiz: quiz, categories: categories, action: '/quizes/create', header: 'Nueva Pregunta', errors: err.errors});
			}).catch(function(error){
				next(error);
			});
		}
		else{
			quiz.save({fields:["pregunta", "respuesta", "CategoryId"]}).then(function(){
				res.redirect('/quizes');
			});
		}
	});
};

// GET /quizes/quizId/edit
exports.edit = function(req, res, next)
{
	var quiz = req.quiz;
	models.Category.findAll().then(function(categories){
			res.render('quizes/questionForm', {quiz: quiz, categories: categories, action: '/quizes/' + quiz.id + '?_method=put', header: 'Edite la pregunta', errors: []});	
		}).catch(function(error){
			next(error);
		});
		
	
};

// PUT /quizes/quizId
exports.update = function(req, res)
{
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.CategoryId = req.body.quiz.CategoryId;
	
	req.quiz.validate().then(function(err){
		if(err)
		{
			res.render('quizes/questionForm', {quiz: req.quiz, action: '/quizes/' + req.quiz.id + '?_method=put', header: 'Edite la pregunta', errors: err.errors});
		}
		else
		{
			req.quiz
				.save({fields: ['pregunta', 'respuesta', 'CategoryId']})
				.then(function(){
					res.redirect('/quizes');
				});
		}
	});
};

// DELETE /quizes/quizId
exports.destroy = function(req, res, next)
{
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){
		next(error);
	});
};

exports.calculateStatistcs = function(req, res, next)
{
	var countQuizes = models.Quiz.count().then(function(numQuestions){
		statistics.quizes = numQuestions;
	});
	var countComments = models.Comment.count().then(function(numComments){
		statistics.comments = numComments;
	});
	
	var countUnpublishedComments = models.Comment.countUnpublishedComments().then(function(numUnpublishedComments){
		statistics.unpublishedComments = numUnpublishedComments;
	});
	
	var countPublishedComments = models.Comment.countPublishedComments().then(function(numPublishedComments){
		statistics.publishedComments = numPublishedComments;
	});
	
	Q.all([countQuizes, countComments, countUnpublishedComments, countPublishedComments]).then(function(){
		console.log(statistics.numComments);
		if(statistics.comments > 0 && statistics.quizes > 0)
		{
			statistics.commentsbyQuestionAverage = statistics.comments / statistics.quizes;
		}
		next();
	}).catch(function(error){
		next(error);
	});	
};

exports.statistics = function(req, res, next)
{
	res.render('quizes/statistics', {statistics: statistics, errors: []});
};