var models = require('../models/models.js');

// Autoload!
exports.load = function(req, res, next, commentId)
{
	models.Comment.findById(commentId).then(function(comment){
		if(comment)
		{
			req.comment = comment;
			next();
		}
		else{
			next(new Error('No existe el identificador del comentario: ' + commentId));
		}
	}).catch(function(error){
		next(error);
	});	
};

// GET /quizes/:quizId/comments/new
exports.new = function(req, res)
{
	res.render('comments/commentForm', {quizId: req.params.quizId, action: '/quizes/' + req.params.quizId + '/comments', header: 'Escriba su comentario:',errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res, next)
{
	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.quizId
	});
	
	comment.validate().then(function(err){
		if(err)
		{
			res.render('comments/commentForm', {comment: comment, quizId: req.params.quizId, errors: err.errors});
		}
		else{
			comment.save().then(function(){
				res.redirect('/quizes/'+req.params.quizId);
			});
		}
	}).catch(function(error){
		next(error);
	});
};

// PUT /quizes/:quizId/comments/:commentId/publish
exports.publish = function(req, res, next)
{
	req.comment.publicado = true;
	
	req.comment.save({fields: ['publicado']}).then(function(){
		res.redirect('/quizes/' + req.params.quizId);
	}).catch(function(error){
		next(error);
	});
};