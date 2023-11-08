const User = require('./User');
const Event = require('./Event');
const Comment = require('./Comment');
const Source = require('./source');

User.hasMany(Event, {
  foreignKey: 'author_id',
  as: 'event'
});

Event.belongsTo(Source, {
  foreignKey: 'source_id',
  as: 'source' 
});

Event.belongsTo(User, {
  foreignKey: 'author_id',
  as: 'user'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comment'
});

Event.hasMany(Comment, {
  foreignKey: 'event_id',
  as: 'comment'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Source.hasMany(Event, {
  foreignKey: 'source_id',
  as: 'event'
});

module.exports = { User, Event, Comment, Source };