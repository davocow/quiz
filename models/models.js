var path = require('path');
// Cargamos el Modelo ORM
var Sequelize = require('sequelize');

//postgres://pwwvjehzovksfw:dkWN0pf6tSs69gbmJ937SYfRwn@ec2-54-204-20-209.compute-1.amazonaws.com:5432/deiuu62h2co9jn
//DATABASE_URL = postgres://user:passwd@host:port/database
//DATABASE_STORAGE = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[0] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Usar la BBDD Sqlite o PostgreSQL
var bbdd = new Sequelize(DB_name, user, pwd, {
	dialect: dialect,
	protocol: protocol,
	port: port,
	host: host,
	storage: storage, //Solo Sqlite
	omitNull: true    //Solo Postgre
});

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