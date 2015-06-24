// Definición del modelo de USER
module.exports = function(sequelize, DataTypes)
{
	return sequelize.define('login', {login: {type: DataTypes.STRING,
												  validate: {notEmpty: {msg: '(*)--> Falta login de usuario.'}}},
									  password: {type: DataTypes.TEXT,
									  			  validate: {notEmpty: {msg: '(*)--> Falta password de usuario.'}}}
									  });
};