'use strict';

module.exports = (sequelize, DataTypes) => {
  var Person = sequelize.define('Person', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      allowBlank: false
    },
    display: {
      type: DataTypes.STRING,
      allowNull: false,
      allowBlank: false
    }
  });

  return Person;
};
