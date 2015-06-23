var path = require('path');
// Cargamos el Modelo ORM
var Sequelize = require('sequelize');

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
var Category = bbdd.import(path.join(__dirname, 'category'));

Quiz.belongsTo(Category);
Category.hasMany(Quiz);

// Exportamos la definición de la tabla QUIZ y CATEGORY
exports.Quiz = Quiz;
exports.Category = Category;
// Crea e inicializa la tabla de preguntas en DB
bbdd.sync().then(function(){
	Category.count().then(function(count){
		if(count === 0)
		{
			Category.create({nombre: 'Humanidades'}).then(function(){
				console.log('Categoría \'Humanidades\' creada.')
			});
			Category.create({nombre: 'Ocio'}).then(function(){
				console.log('Categoría \'Ocio\' creada.')
			});
			Category.create({nombre: 'Tecnología'}).then(function(){
				console.log('Categoría \'Tecnología\' creada.')
			});
			Category.create({nombre: 'Ciencias'}).then(function(){
				console.log('Categoría \'Ciencias\' creada.')
			});
			Category.create({nombre: 'Otros'}).then(function(){
				console.log('Categoría \'Otros\' creada.')
			});
		}
	});
	// Ejecutamos el callback cuando se ha sincronizado correctamente (QUIZ)
	Quiz.count().then(function(count){
		// La tabla se inicializa si está vacía
		if(count === 0)
		{
			//Creamos la primera PREGUNTA
			Quiz.create({
				pregunta: '¿Cuál es la capital de Italia?',
				respuesta: 'Roma',
				CategoryId: 1
			}).then(function(){
				console.log('Primera pregunta por defecto creada');
			});
			
			//Creamos la segunda pregunta
			Quiz.create({
				pregunta: '¿Cuál es la capital de España?',
				respuesta: 'Madrid',
				CategoryId: 1
			}).then(function(){
				console.log('Segunda pregunta por defecto creada')
				console.log('Base de datos inicializada');
			});
		}
	});
});