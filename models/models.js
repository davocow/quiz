var path = require('path');
// Cargamos el Modelo ORM
var Sequelize = require('sequelize');

// Usar la BBDD Sqlite
var bbdd = new Sequelize(null, null, null, {dialect: "sqlite", storage:"quiz.sqlite"});

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = bbdd.import(path.join(__dirname, 'quiz'));

// Exportamos la definición de la tabla QUIZ
exports.Quiz = Quiz;
// Crea e inicializa la tabla de preguntas en DB
bbdd.sync().then(function(){
	// Ejecutamos el callback cuando se ha sincronizado correctamente 
	Quiz.count().then(function(count){
		// La tabla se inicializa si está vacía
		if(count === 0)
		{
			Quiz.create({
				pregunta: '¿Cuál es la capital de Italia?',
				respuesta: 'Roma'
			}).then(function(){
				console.log('Base de datos inicializada');
			})
		}
	});
});