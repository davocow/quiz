// Definición del modelo de CATEGORY
module.exports = function(sequelize, DataTypes)
{
	return sequelize.define('Category', {nombre: {type: DataTypes.STRING,
												  validate: {notEmpty: {msg: '(*)--> Falta Nombre Categoria.'}}}});
};