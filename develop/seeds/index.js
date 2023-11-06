const sequelize = require('../config/connection');
const inquirer = require('inquirer');
const loading = require('loading-cli');
const { User, Event, Comment } = require('../models');

function welcomeUser() {
  console.log('+------------------------------------+');
  console.log('|                                    |');
  console.log('|     Welcome to the Event Seeder    |');
  console.log('|                                    |');
  console.log('+------------------------------------+\n\n');
}

async function syncDatabase() {
  try {
    const load = loading("Syncing to database").start();
    await sequelize.sync({ force: true });
    load.stop();
  } catch(err) {
    console.error("Error syncing database");
    console.log(err);
    process.exit(1);
  }
}

async function seedDatabase() {
  welcomeUser();
  await syncDatabase();
}

seedDatabase();