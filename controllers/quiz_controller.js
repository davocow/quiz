// GET /quizes/question
exports.question = function(req, res)
{
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

// GET /quizes/answer
exports.answer = function(req, res)
{
	var solucion = '';
	if(req.query.respuesta === 'Roma')
	{
		solucion = 'Correcto :)';
	}
	else
	{
		solucion = 'Incorrecto :(';
	}
	res.render('quizes/answer', {respuesta: solucion});
};