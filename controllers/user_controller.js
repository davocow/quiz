var models = require('../models/models');
var crypto = require('crypto');		

exports.autenticar = function(login, password, callback)
{
	models.User.find({where: ["login = ?", login]}).then(function(user){
		if(user)
		{
			var hash = crypto.createHash('md5').update(password).digest("hex");
			if(user.password === hash)
			{
				callback(null, users);
			}
			else
			{
				callback(new Error('Contraseña incorrecta'));
			}
				
		}
		else{
			callback(new Error('El usuario no existe :('));
		}
	});
};