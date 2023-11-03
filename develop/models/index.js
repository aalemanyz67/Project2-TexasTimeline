const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');

User.hasMany(Event, {
  foreignKey: 'author_id'
});

Event.belongsTo(User, {
  foreignKey: 'author_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Event, Comment };