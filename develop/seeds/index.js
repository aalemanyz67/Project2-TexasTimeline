const sequelize = require('../config/connection');
const inquirer = require('inquirer');
const loading = require('./loading');
const { User, Event, Comment } = require('../models');

function welcomeUser() {
  console.log('+--------------------------------+');
  console.log('|                                |');
  console.log('|   Welcome to the Event Seeder  |');
  console.log('|                                |');
  console.log('+--------------------------------+\n\n');
}

async function syncDatabase() {

}

async function seedDatabase() {
  welcomeUser();
}

seedDatabase();