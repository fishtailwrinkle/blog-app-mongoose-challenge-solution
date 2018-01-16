'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout this module
const expect = chai.expect;
const {BlogPost} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

// used to put randomish documents in db
function seedBlogData() {
	console.info('Seeding blog data');
	const seedData = [];

	for (let i=1; i<=10; i++) {
		seedData.push(generateBlogData());
	}

	return BlogPost.insertMany(seedData);
}

function generateBlogData() {
	return {
		author: {
			firstName: faker.name.firstName(), 
			lastName: faker.name.lastName()
		},
		title: faker.lorem.words(),
		content: faker.lorem.paragraph(),
		created: faker.date.past()
	};
}

function tearDownDb() {
	console.warn('Deleting database!');
	return mongoose.connection.dropDatabase();
}

describe('Blogs API resource', function() {

	before(function() {
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function() {
		return seedBlogData();
	}); 

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
		return closeServer();
	});

	// GET
	describe('GET endpoint', function() {
		it('should return all existing blog posts', function() {
			let res;
			return chai.request(app)
				.get('/posts')
				.then(function(_res) {
					res = _res;
					expect(res).to.have.status(200);
				})


		});



	});












});
