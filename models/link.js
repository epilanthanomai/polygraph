'use strict';

module.exports = (sequelize, DataTypes) => {
  var Link = sequelize.define('Link', {
    // All fields are foreign keys, added in associate() below.
  }, {
    classMethods: {
      associate(models) {
        Link.belongsTo(models.Person, {
          as: 'personA',
          onDelete: 'cascade',
          hooks: true
        });
        Link.belongsTo(models.Person, {
          as: 'personB',
          onDelete: 'cascade',
          hooks: true
        });
      }
    },
    indexes: [
      {
        name: 'Links_PersonAtoB',
        fields: ['personAId', 'personBId'],
        unique: true
      },
      {
        name: 'Links_PersonBtoA',
        fields: ['personBId', 'personAId'],
        unique: true
      }
    ],
    validate: {
      noSelfLink() {
        if (this.personAId == this.personBId) {
          throw new Error('A person cannot link to themselves.');
        }
      }
    },
    hooks: {
      beforeUpdate: fixPersonOrder,
      beforeCreate: fixPersonOrder
    }
  });

  function fixPersonOrder(link) {
    if (link.personAId > link.personBId) {
      var a = link.personAId,
          b = link.personBId;
      link.personBId = a;
      link.personAId = b;
    }
  }

  return Link;
};
