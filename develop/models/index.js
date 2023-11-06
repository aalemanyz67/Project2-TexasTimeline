const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');
const Source = require('./Source');

User.hasMany(Event, {
  foreignKey: 'author_id'
});

Event.belongsTo(User, {
  foreignKey: 'author_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Event.hasMany(Comment, {
  foreignKey: 'event_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.hasOne(Source, {
  foreignKey: 'source_id',
  onDelete: 'CASCADE'
});

Source.hasMany(Event, {
  foreignKey: 'source_id'
});

module.exports = { User, Event, Comment, Source };