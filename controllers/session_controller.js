exports.new = function(req, res)
{
	var errors = req.session.errors || {};
	req.session.errors = {};
	
	res.render('sessions/loginForm', {header: 'Accede...', action: '/login', errors: errors});
};

exports.create = function(req, res)
{
	var login = req.body.login;
	var password = req.body.password;
	var userController = require('./user_controller');
	
	userController.autenticar(login, password, function(error, user){
		if(error)
		{
			req.session.errors = [{"message": error.toString()}];
			res.redirect('/login');
			return;
		}
		req.session.user = {id: user.id, username:user.login};
		res.redirect(req.session.redir.toString());
	});
};

exports.destroy = function(req, res)
{
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};