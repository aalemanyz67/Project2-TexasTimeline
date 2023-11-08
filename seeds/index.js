const sequelize = require('../config/connection');
const inquirer = require('inquirer');
const loading = require('loading-cli');
const { User, Event, Comment, Source } = require('../models');
const { async } = require('rxjs');

function welcomeUser() {
  console.log('+------------------------------------+');
  console.log('|                                    |');
  console.log('|     Welcome to the Event Seeder    |');
  console.log('|                                    |');
  console.log('+------------------------------------+\n\n');
}

async function promptForForce() {
  // If database is empty, return
  let load = loading("Checking for database").start();
  const tables = await sequelize.query("show tables");
  const numRows = tables[0].length;
  load.stop();
  if (numRows === 0) {
    console.log("Database is empty, forcing sync...");
    return true;
  }

  const shouldForceQuestion = [{
      type: 'confirm',
      name: 'force',
      message: 'Erase entire database? All events, comments, and users will be deleted.'
  }];
  const confirmForceQuestion = [{
      type: 'confirm',
      name: 'force',
      message: 'Are you sure? This cannot be undone.'
  }];

  const { force } = await inquirer.prompt(shouldForceQuestion);

  if(force) {
    const { force } = await inquirer.prompt(confirmForceQuestion);
    return force;
  }
}

async function syncDatabase(force) {
  try {
    const load = loading("Syncing to database").start();
    await sequelize.sync({ force: force });
    load.stop();
    console.log("Database synced successfully");
  } catch(err) {
    console.error("Error syncing database");
    console.log(err);
    process.exit(1);
  }
}

async function createAdmin() {
  const questions = [{
      type: 'password',
      name: 'password',
      message: 'Enter password for admin user:'
   }];

  try {
    // If user `Admin` already exists, return
    let load = loading("Checking for admin user").start();
    const admin = await User.findOne({ where: { username: 'Admin' } });
    load.stop();
    if (admin) {
      console.log("Admin user already exists, skipping...");
      return;
    }

    const { password } = await inquirer.prompt(questions);

    load = loading("Creating admin user").start();
    await User.create({
      username: 'Admin',
      password: password,
      is_admin: true
    });
    load.stop();
    console.log("Admin user created successfully");
  } catch(err) {
    console.error("Error creating admin user.");
    console.log(err);
    process.exit(1);
  }
}

async function seedFromJson() {
  const { sources, events } = require('./seeds.json');

  try {
    // If events already exist, return
    let load = loading("Checking for events").start();
    const eventCount = await Event.count();
    load.stop();
    if (eventCount > 0) {
      console.log("Events already exist, skipping...");
      return;
    }

    // Get admin user where username is 'Admin' and it's ID
    load = loading("Getting admin user").start();
    const admin = await User.findOne({ where: { username: 'Admin' } });
    const adminId = admin.get('id');
    load.stop();

    // For each event, set the author_id to the admin user's ID
    load = loading("Setting author_id for events").start();
    events.forEach(event => event.author_id = adminId);
    load.stop();

    // Seed sources
    load = loading("Seeding sources from JSON").start();
    await Source.bulkCreate(sources);
    load.stop();

    // Seed events
    load = loading("Seeding events from JSON").start();
    await Event.bulkCreate(events);
    load.stop();
    console.log("Events seeded successfully from JSON");
  } catch(err) {

    // Database error
    console.error("Error seeding events from JSON");
    console.log(err);
    process.exit(1);
  }
}

async function seedDatabase() {
  welcomeUser();
  const force = await promptForForce();
  await syncDatabase(force);
  await createAdmin();
  await seedFromJson();

  process.exit(0);
}

seedDatabase();