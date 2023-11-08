const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Event extends Model {};

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: { // Title of an event
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: { // Date of an event
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: { // End date of an event
      type: DataTypes.DATE,
      allowNull: true
    },
    source_id: { // Source of an event
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'source',
        key: 'id'
      }
    },
    content: { // Content of an event
      type: DataTypes.TEXT,
      allowNull: true
    },
    thumbnail: { // Thumbnail of an event
      type: DataTypes.TEXT,
      allowNull: true
    },
    author_id: { // Who authored the event
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'event'
  }
);

module.exports = Event;