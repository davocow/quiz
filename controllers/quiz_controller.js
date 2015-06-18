var models = require('../models/models.js');

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
	models.Quiz.findById(quizId).then(function(quiz){
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
exports.index = function(req, res)
{
	if(req.query.search)
	{
		
		models.Quiz.findAll({where: ["pregunta like ?", CleanSearch(req.query.search)]}).then(function(quizes){
			res.render('quizes/index', {quizes: quizes});
		}).catch(function(error){
			next(error);
		});
	}
	else
	{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', {quizes: quizes});	
		}).catch(function(error){
			next(error);
		});
	}
};

// GET /quizes/:quizId(\\d+)
exports.show = function(req, res)
{
	res.render('quizes/show', {quiz: req.quiz});
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
		res.render('quizes/answer', {respuesta: solucion, quiz: req.quiz});	
};