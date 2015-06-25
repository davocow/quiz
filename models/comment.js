// Definición del modelo de COMMENT
module.exports = function(sequelize, DataTypes)
{
	return sequelize.define('Comment', {texto: {type: DataTypes.STRING,
												  validate: {notEmpty: {msg: '(*)--> Falta texto del comentario.'}}},
										publicado: {type: DataTypes.BOOLEAN, defaultValue: false} 
									   },
										{classMethods:{
											countUnpublishedComments: function(){
												return this.count({where: ["publicado = ?", false]});
											},
											countPublishedComments: function(){
												return this.count({where: ["publicado = ?", true]});
											}
										}});
};